"use client";

import { useEffect, useRef, type RefObject } from "react";

// Original 8-bit mascot for the analytics card: a pixel developer in the brand's indigo hoodie.
// One character per pixel; "." is transparent.
const PALETTE: Record<string, string> = {
  I: "#6366f1", // hoodie
  D: "#4338ca", // hoodie shadow
  S: "#f2c9a0", // skin
  E: "#111827", // eyes
  W: "#e0e7ff", // drawstring
  P: "#64748b", // pants
  A: "#fbbf24", // sneakers
};

const HEAD = [
  "....IIIII...",
  "...IIIIIII..",
  "..IIIIIIIII.",
  "..IIIDSSSSS.",
  "..IIIDSSESS.",
  "..IIIDSSSSS.",
];

const FRAMES = {
  run1: [
    ...HEAD,
    "...IIIDSSS..",
    "...IIIIII...",
    ".SIIIIIWII..",
    "..IIIIIWIIS.",
    "...IIDDDII..",
    "...IIIIIII..",
    "...PPPPPP...",
    "..PPP..PPP..",
    ".PPP....PPA.",
    ".AA.....AAA.",
  ],
  run2: [
    ...HEAD,
    "...IIIDSSS..",
    "...IIIIII...",
    "...IIIIWII..",
    "...ISIIWSI..",
    "...IIDDDII..",
    "...IIIIIII..",
    "...PPPPPP...",
    "....PPPP....",
    "....PPPA....",
    "....AAAA....",
  ],
  jump: [
    "....IIIII..S",
    "...IIIIIII.I",
    "..IIIIIIIIII",
    "..IIIDSSSSS.",
    "..IIIDSSESS.",
    "..IIIDSSSSS.",
    "S..IIIDSSS..",
    "II.IIIIII...",
    ".IIIIIIWII..",
    "...IIIIWII..",
    "...IIDDDII..",
    "...IIIIIII..",
    "..PPPPPPPP..",
    ".PPP...PPPA.",
    ".AA.....AAA.",
    "............",
  ],
  // Front-facing head and hands, shown resting on the card's top edge.
  peek: [
    "....IIII....",
    "..IIIIIIII..",
    ".IIIIIIIIII.",
    ".IIDSSSSDII.",
    ".IISESSESII.",
    ".IIDSSSSDII.",
    "SS.IIIIII.SS",
  ],
} as const;

type Pose = keyof typeof FRAMES;

function paint(canvas: HTMLCanvasElement | null, pose: Pose) {
  const context = canvas?.getContext("2d");
  if (!canvas || !context) return;
  const rows = FRAMES[pose];
  // Resizing also clears the previous pose.
  canvas.width = rows[0].length;
  canvas.height = rows.length;
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (row[x] === ".") continue;
      context.fillStyle = PALETTE[row[x]];
      context.fillRect(x, y, 1, 1);
    }
  });
}

/** Peeks over the card's top edge while the visitor is deciding. Place inside the card's positioned wrapper. */
export function ConsentPeek() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute bottom-full right-8 overflow-hidden">
      <canvas
        ref={(node) => paint(node, "peek")}
        className="consent-peek block h-[21px] w-9 sm:h-7 sm:w-12"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}

type Point = [x: number, y: number];
// One stretch of the route. `lift` is the arc height of a hop; 0 means running along the ground.
type Leg = { to: Point; ms: number; lift: number; flip?: boolean; land?: boolean };

const RUN_SPEED = 0.6; // px per ms
const SPARK_COLORS = ["#a5b4fc", "#fbbf24", "#6366f1"];

function sparkle(layer: HTMLElement, [x, y]: Point) {
  for (let i = 0; i < 6; i++) {
    const bit = document.createElement("span");
    // Fan the bits upward and outward from the landing spot.
    const angle = Math.PI * (1.15 + 0.14 * i);
    const reach = 18 + (i % 3) * 9;
    bit.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:4px;height:4px;background:${SPARK_COLORS[i % 3]}`;
    layer.appendChild(bit);
    const remove = () => bit.remove();
    bit.animate(
      [
        { transform: "translate(-50%, -50%)", opacity: 1 },
        { transform: `translate(${Math.cos(angle) * reach}px, ${Math.sin(angle) * reach}px)`, opacity: 0 },
      ],
      { duration: 420, easing: "ease-out" },
    ).finished.then(remove, remove);
  }
}

/**
 * The thank-you show after analytics is allowed: the mascot comes in from the left edge of the
 * screen, hops across the top of the card (`anchor`), then runs off the right edge.
 * Calls `onDone` once the card has faded out.
 */
export function ConsentCelebration({ anchor, onDone }: { anchor: RefObject<HTMLElement | null>; onDone: () => void }) {
  const stage = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const card = anchor.current, layer = stage.current, sprite = hero.current;
    if (!card || !layer || !sprite) return;

    // Points are where the mascot's feet are, in viewport pixels.
    const box = card.getBoundingClientRect();
    const width = sprite.offsetWidth, height = sprite.offsetHeight;
    const ground = box.bottom, deck = box.top + 2;
    const inset = Math.min(36, box.width / 6);
    const first = box.left + inset, last = box.right - inset;
    const hops = Math.max(3, Math.min(4, Math.round((last - first) / 130)));
    const exit = layer.clientWidth + width;

    const start: Point = [-width, ground];
    const legs: Leg[] = [];
    const foot = box.left - 48;
    if (foot > 90) legs.push({ to: [foot, ground], ms: Math.min(1200, (foot + width) / RUN_SPEED), lift: 0 });
    legs.push({ to: [first, deck], ms: 460, lift: 56, land: true });
    for (let i = 1; i <= hops; i++) {
      const flip = i === 2;
      legs.push({
        to: [first + ((last - first) * i) / hops, deck],
        ms: flip ? 580 : 360, lift: flip ? 72 : 34, flip, land: true,
      });
    }
    const down = box.right + 44;
    legs.push({ to: [down, ground], ms: 460, lift: 44 });
    if (down < exit) legs.push({ to: [exit, ground], ms: Math.min(1500, (exit - down) / RUN_SPEED), lift: 0 });
    const total = legs.reduce((sum, leg) => sum + leg.ms, 0);

    let frame = 0, began = 0, current = 0, shown: Pose | null = null, cancelled = false;
    const tick = (now: number) => {
      began ||= now;
      const elapsed = now - began;
      if (elapsed >= total) {
        sprite.style.opacity = "0";
        card.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, fill: "forwards" })
          .finished.then(() => { if (!cancelled) onDone(); }, () => {});
        return;
      }
      let index = 0, legStart = 0;
      while (elapsed >= legStart + legs[index].ms) legStart += legs[index++].ms;
      if (index !== current) {
        const finished = legs[index - 1];
        if (finished.land) {
          card.animate(
            [{ transform: "translateY(0)" }, { transform: "translateY(3px)" }, { transform: "translateY(0)" }],
            { duration: 170, easing: "ease-out" },
          );
          sparkle(layer, finished.to);
        }
        current = index;
      }
      const leg = legs[index], from = index ? legs[index - 1].to : start;
      const t = (elapsed - legStart) / leg.ms;
      const x = from[0] + (leg.to[0] - from[0]) * t;
      const y = from[1] + (leg.to[1] - from[1]) * t - 4 * leg.lift * t * (1 - t);
      const pose: Pose = leg.lift ? "jump" : Math.floor(elapsed / 110) % 2 ? "run2" : "run1";
      if (pose !== shown) { paint(sprite, pose); shown = pose; }
      sprite.style.opacity = String(Math.min(1, elapsed / 200, (total - elapsed) / 240));
      sprite.style.transform =
        `translate3d(${Math.round(x - width / 2)}px, ${Math.round(y - height)}px, 0) rotate(${leg.flip ? Math.round(t * 360) : 0}deg)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, [anchor, onDone]);

  return (
    <div ref={stage} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95] overflow-hidden">
      <canvas
        ref={hero}
        className="absolute left-0 top-0 h-12 w-9 opacity-0 will-change-transform sm:h-16 sm:w-12"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
