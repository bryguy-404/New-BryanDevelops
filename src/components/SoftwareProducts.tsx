"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarCheck2,
  Check,
  Expand,
  MessageSquare,
  Search,
} from "lucide-react";
import styles from "./SoftwareProducts.module.css";

const seoViews = ["Opportunities", "AI mentor", "Content"];
const assistViews = ["Inbox", "Calendar"];

function PreviewTabs({
  id,
  label,
  items,
  selected,
  onSelect,
}: {
  id: string;
  label: string;
  items: string[];
  selected: number;
  onSelect: (index: number) => void;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    let next = selected;
    if (event.key === "ArrowRight") next = (selected + 1) % items.length;
    else if (event.key === "ArrowLeft") next = (selected + items.length - 1) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;

    event.preventDefault();
    onSelect(next);
    refs.current[next]?.focus();
  }

  return (
    <div className={styles.tabs} role="tablist" aria-label={label}>
      {items.map((item, index) => (
        <button
          key={item}
          ref={(element) => { refs.current[index] = element; }}
          type="button"
          role="tab"
          id={`${id}-tab-${index}`}
          aria-controls={`${id}-panel`}
          aria-selected={selected === index}
          tabIndex={selected === index ? 0 : -1}
          onClick={() => onSelect(index)}
          onKeyDown={handleKeyDown}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function SeoPreview() {
  const [selected, setSelected] = useState(0);

  return (
    <figure className={styles.preview}>
      <div className={styles.seoStage}>
        <div className={styles.previewTopline}>
          <span className={styles.miniWordmark}><span className={styles.appMark}><Search aria-hidden="true" /></span>SimplSEO</span>
          <span className={styles.previewLabel}>From insight to action</span>
        </div>
        <PreviewTabs
          id="seo-preview"
          label="Explore the SimplSEO workflow"
          items={seoViews}
          selected={selected}
          onSelect={setSelected}
        />
        <div
          id="seo-preview-panel"
          role="tabpanel"
          aria-labelledby={`seo-preview-tab-${selected}`}
          tabIndex={0}
          className={styles.insightPanel}
        >
          {selected === 0 && (
            <div className={styles.insightContent}>
              <div className={styles.insightEyebrow}><Search aria-hidden="true" /> Page opportunity</div>
              <h4>Showing up is only<br />half the story.</h4>
              <p>Your page appears in search, but people aren’t clicking. Start with a title that tells them what you offer.</p>
              <div className={styles.titleRecommendation}>
                <span className={styles.fieldLabel}>A more useful page title</span>
                <span className={styles.oldTitle}>Home | Example Plumbing</span>
                <ArrowDown aria-hidden="true" />
                <strong>Emergency Plumbing in South Bend | Example Plumbing</strong>
              </div>
              <div className={styles.insightFootnote}><Check aria-hidden="true" /> A clear next step, with the reason behind it.</div>
            </div>
          )}
          {selected === 1 && (
            <div className={styles.insightContent}>
              <div className={styles.insightEyebrow}><MessageSquare aria-hidden="true" /> Your SEO mentor</div>
              <h4>Ask a question.<br />Get some direction.</h4>
              <p>SEO guidance that understands your website and explains the next step in plain English.</p>
              <div className={styles.mentorQuestion}>“What should I work on first?”</div>
              <div className={styles.mentorAnswer}>
                <span className={styles.fieldLabel}>An example conversation</span>
                <p>Start with a service page that already appears in search. Make the title specific, explain the service clearly, then track whether more people click.</p>
              </div>
              <div className={styles.insightFootnote}><Check aria-hidden="true" /> Built around your site, not generic advice.</div>
            </div>
          )}
          {selected === 2 && (
            <div className={styles.insightContent}>
              <div className={styles.insightEyebrow}><Search aria-hidden="true" /> Content opportunities</div>
              <h4>A search term.<br />A place to start.</h4>
              <p>Turn a relevant keyword into an outline. Bring your expertise; SimplSEO helps organize the page.</p>
              <div className={styles.outline}>
                <span className={styles.fieldLabel}>Example outline · Emergency plumbing</span>
                <ol>
                  <li><span>01</span> When to call an emergency plumber</li>
                  <li><span>02</span> What to do before help arrives</li>
                  <li><span>03</span> Services and areas you cover</li>
                </ol>
              </div>
              <div className={styles.insightFootnote}><Check aria-hidden="true" /> From keyword opportunity to useful content.</div>
            </div>
          )}
        </div>
        <div className={styles.seoFlow} aria-hidden="true">
          <span>Search data</span><ArrowRight /><span>Clear guidance</span><ArrowRight /><span>Your next move</span>
        </div>
      </div>
      <figcaption>Explore the workflow <span>Illustrative examples</span></figcaption>
    </figure>
  );
}

function AssistPreview() {
  const [selected, setSelected] = useState(0);
  const isInbox = selected === 0;
  // Optimized copies of SimplAssist's public marketing screens, which use demo data:
  // https://simplassist.com/marketing/pane-{messages,calendar}-light.png
  const imageSrc = isInbox ? "/software/simplassist-inbox.webp" : "/software/simplassist-calendar.webp";

  return (
    <figure className={`${styles.preview} ${styles.assistPreview}`}>
      <div className={styles.assistStage}>
        <div className={styles.previewTopline}>
          <span className={styles.miniWordmark}><span className={styles.appMark}><MessageSquare aria-hidden="true" /></span>SimplAssist</span>
          <span className={styles.previewLabel}>Keep the conversation going</span>
        </div>
        <PreviewTabs
          id="assist-preview"
          label="Explore SimplAssist product screens"
          items={assistViews}
          selected={selected}
          onSelect={setSelected}
        />
        <div
          id="assist-preview-panel"
          role="tabpanel"
          aria-labelledby={`assist-preview-tab-${selected}`}
          tabIndex={0}
          className={styles.assistPanel}
        >
          <div className={styles.screenHeading}>
            <div>{isInbox ? <MessageSquare aria-hidden="true" /> : <CalendarCheck2 aria-hidden="true" />}
              <span>{isInbox ? "Every conversation. One place." : "From conversation to calendar."}</span>
            </div>
            <a href={imageSrc} target="_blank" rel="noopener noreferrer" aria-label={`Enlarge the SimplAssist ${isInbox ? "inbox" : "calendar"} screenshot (opens in a new tab)`}>
              <Expand aria-hidden="true" />
            </a>
          </div>
          <a
            className={styles.screenImage}
            href={imageSrc}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View the full-size SimplAssist ${isInbox ? "inbox" : "calendar"} screenshot (opens in a new tab)`}
          >
            <Image
              src={imageSrc}
              alt={isInbox
                ? "SimplAssist's shared inbox showing a demo missed-call conversation that leads to a booked plumbing appointment."
                : "SimplAssist's calendar showing demo appointments with their services, times, and customer details."}
              width={1550}
              height={872}
              sizes="(min-width: 1280px) 610px, (min-width: 1000px) 50vw, (min-width: 700px) 80vw, 92vw"
            />
          </a>
        </div>
        <div className={styles.assistOutcome}>
          <span className={styles.outcomeIcon}>{isInbox ? <MessageSquare aria-hidden="true" /> : <CalendarCheck2 aria-hidden="true" />}</span>
          <div><strong>{isInbox ? "The call was missed. The customer wasn’t." : "The follow-up becomes a booking."}</strong>
            <p>{isInbox ? "Automatic text-back. AI conversation. A human when needed." : "Appointments sync with your connected Google Calendar."}</p>
          </div>
        </div>
      </div>
      <figcaption>Inside the product <span>Product screens with demo data</span></figcaption>
    </figure>
  );
}

export default function SoftwareProducts() {
  return (
    <section id="featured-software" aria-labelledby="software-products-heading" className={styles.showcase}>
      <div className={styles.container}>
        <header className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>Featured Software</p>
            <h2 id="software-products-heading">Built by Me.<br /><span>Working for You.</span></h2>
          </div>
          <p>Two independent products I designed and built to make the everyday work of running a business easier.</p>
        </header>

        <article id="simplseo" aria-labelledby="simplseo-product-heading" className={styles.product}>
          <div className={styles.productMeta}>
            <p><Search aria-hidden="true" /> Search visibility &amp; guidance</p>
            <span className={styles.live}><span /> Live product</span>
          </div>
          <div className={styles.productGrid}>
            <div className={styles.productCopy}>
              <h3 id="simplseo-product-heading">SimplSEO</h3>
              <p className={styles.productHook}>Less guessing.<br />A clearer next step.</p>
              <p className={styles.description}>Understand how people find your business on Google, what’s holding your pages back, and what to work on next. Search data, translated into something you can use.</p>
              <ul className={styles.features}>
                <li><Check aria-hidden="true" /> Find overlooked search opportunities</li>
                <li><Check aria-hidden="true" /> Get guidance from your AI SEO mentor</li>
                <li><Check aria-hidden="true" /> Turn keywords into content outlines</li>
              </ul>
              <a href="https://simplseo-io.vercel.app" target="_blank" rel="noopener noreferrer" className={styles.productLink}>
                Explore SimplSEO <ArrowUpRight aria-hidden="true" />
              </a>
              <p className={styles.productNote}>Made for small business owners</p>
            </div>
            <SeoPreview />
          </div>
        </article>

        <article id="simplassist" aria-labelledby="simplassist-product-heading" className={`${styles.product} ${styles.assistProduct}`}>
          <div className={styles.productMeta}>
            <p><MessageSquare aria-hidden="true" /> Customer communication</p>
            <span className={styles.live}><span /> Live product</span>
          </div>
          <div className={`${styles.productGrid} ${styles.reversed}`}>
            <div className={styles.productCopy}>
              <h3 id="simplassist-product-heading">SimplAssist</h3>
              <p className={styles.productHook}>Busy with a customer?<br />Meet your backup.</p>
              <p className={styles.description}>A missed call doesn’t have to become a missed customer. SimplAssist keeps texts and website conversations moving, organizes your leads, and helps get appointments on the calendar.</p>
              <ul className={styles.features}>
                <li><Check aria-hidden="true" /> Follow up on missed calls automatically</li>
                <li><Check aria-hidden="true" /> Keep SMS and web chat in one inbox</li>
                <li><Check aria-hidden="true" /> Book through Google Calendar</li>
              </ul>
              <a href="https://simplassist.com" target="_blank" rel="noopener noreferrer" className={styles.productLink}>
                Explore SimplAssist <ArrowUpRight aria-hidden="true" />
              </a>
              <p className={styles.productNote}>Made for the team that wears every hat</p>
            </div>
            <AssistPreview />
          </div>
        </article>
      </div>
    </section>
  );
}
