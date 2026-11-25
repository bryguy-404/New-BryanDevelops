# Bryan Develops

Next.js website for https://bryandevelops.com. Production is Vercel project
`new-bryan-develops` (`prj_aMO8LE7XePXoHuWR9Pk2oHdlqDjY`), deployed from the
`main` branch of `bryguy-404/New-BryanDevelops`.

## Development and verification

- `npm run dev -- --webpack` — local preview.
- `npm run build -- --webpack` — production build and TypeScript checks.
- `npm run lint` — repository lint.
- `npm run test:analytics` — analytics consent, host/route, and payload tests.
- `npm run test:contact` — Turnstile enforcement and email delivery boundary tests (no real email).
- `npm run check:seo -- http://127.0.0.1:4317` — HTTP checks against a running production build: redirects, service canonicals, sitemap, internal links, and server-rendered content.

Use Codex's built-in browser first for visual and interaction checks. Use a
separate Chrome tab only when an essential existing sign-in is needed.

## Contact form spam protection

The contact form uses Cloudflare Turnstile in Managed mode with a styled status
row. Cloudflare's checkbox appears only when interaction is required; it uses a
centered compact layout on narrow screens. The email endpoint
validates each token with Cloudflare before creating an SMTP transport, and
requires the `contact` action and an allowed hostname. Missing, expired, invalid,
or unverifiable tokens cannot send email. The widget refreshes after a failed
submission so visitors can retry without retyping their inquiry.

Vercel production configuration:

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: the widget's public site key (Config).
- `TURNSTILE_SECRET_KEY`: the private verification key (Secret; server only).
- `TURNSTILE_ALLOWED_HOSTNAMES`: optional comma-separated override; defaults to
  `bryandevelops.com,www.bryandevelops.com`.

The Cloudflare widget is **Bryan Develops Contact Form**, restricted to
`bryandevelops.com` and its subdomains, with pre-clearance off. Changing the
public site key requires a new build. Configure separate restricted widgets for
preview hosts if preview form submissions are needed. Missing keys fail closed.
Never commit the private key or use Cloudflare's dummy keys in a Vercel deployment.
Local UI tests can explicitly supply Cloudflare's documented test keys.

Reference: [Cloudflare Turnstile setup](https://developers.cloudflare.com/turnstile/get-started/).

## Website analytics (November 13, 2026)

Adapted from SimplAssist's consent-first implementation, with Bryan Develops'
own existing GA4 property, verified in Google Analytics:

- Google account: `bryandevelops574@gmail.com`.
- Analytics account: **Google Ads Account**, `343774761` (existing name).
- Property: **bryandevelops.com**, `475909677`.
- Web stream: **bryandevelops.com**, `10218154227`.
- Public measurement ID: `G-HYM1RKG6KM`; Google tag: `GT-5TC393TR`.
- Reports: https://analytics.google.com/analytics/web/#/a343774761p475909677/reports/intelligenthome

The public ID is pinned to `G-HYM1RKG6KM` in `src/lib/analytics/website.ts` and
passed from the shared root layout, so it is visible in page source. Environment
variables cannot override it. The shared analytics component loads one
`next/script` tag with `afterInteractive` after consent. This ID is not a credential.
SMTP configuration stays in the existing private environment variables.

The Google tag loads only after explicit permission on `bryandevelops.com` or
`www.bryandevelops.com`, and only on the enumerated public routes. Local
development shows the consent UI but never loads Google Analytics. Preview
deployments and unknown routes do not collect analytics. Consent is stored in
`bd-analytics-consent-v1` for up to 180 days. Preferences are available in every
footer and on `/privacy`. Revocation disables collection, clears GA cookies,
and reloads to unload Google's listeners. Cross-tab revocation, expiry, and
unavailable browser storage also stop collection.

Manual page views are deduplicated by pathname. Query strings, fragments,
dynamic page titles, arbitrary link text, and form/chat contents are excluded.
Click events include the public link destination without query strings,
fragments, or credentials; CTA text is restricted to reviewed static labels.
External referrers retain only their origin; internal page transitions use the
previous public path. Google signals and advertising personalization are off in
the tag settings sent by the site. No session recording is installed.

The consent card has an original pixel mascot (`src/components/ConsentMascot.tsx`,
drawn in code, no image asset). It peeks over the card while the visitor decides
and, after "Allow analytics", hops across the card and runs off the right edge
before the card closes (about 3.5s). Consent is saved before the animation
starts. "No thanks" and `prefers-reduced-motion` close the card immediately.
Do not swap in third-party characters or artwork.

| Event | What it measures |
| --- | --- |
| `page_view` | A consenting visitor views a public page. |
| `software_click` | A link to SimplAssist or SimplSEO is clicked (`product`). |
| `software_preview` | A different product preview tab is selected (`product`, `preview`), including keyboard navigation. |
| `file_download` | A Captura or PinMemories download link is clicked; it does not prove the download finished. |
| `contact_click` | Existing contact-page link click (`method`); retained for report continuity. |
| `phone_click` / `email_click` | Any telephone/email link click (`link_url`, `page_path`); not proof of a connected call or sent email. |
| `cta_click` | A main contact/quote CTA is clicked (`cta_text`, `link_url`, `page_path`). |
| `booking_click` | A scheduling link is clicked (`link_url`, `page_path`). No scheduling link currently exists; delegated tracking covers Calendly, Cal.com, Acuity, YouCanBookMe, and Setmore links added later. |
| `chat_open` | The existing SimplAssist chat launcher is opened; no messages are recorded in Analytics. |
| `contact_form_start` | First edit to the contact form while analytics is enabled. |
| `generate_lead` | The contact API returns a successful HTTP response and `{ success: true }` after the email provider accepts the inquiry (`form_name: contact`, `page_path`); not a sale or guaranteed inbox delivery. |

Lead-event update (November 25, 2026): one shared delegated click listener covers
telephone, email, CTA, and booking links, including links added after hydration.
No form values enter analytics. After deployment, view source on each public
route and search for `G-HYM1RKG6KM`. Allow analytics, then use GA4 Realtime or a
Tag Assistant debug session with DebugView to verify one `page_view` per navigation,
each link event with its parameters, and `generate_lead` only after a successful
contact submission. Validation, verification, network, and server failures must
not produce a lead. Keep Enhanced Measurement's history/form tracking off to
avoid duplicates alongside the explicit events.

Tag Assistant's `gtm_debug` URL signal explicitly enables `debug_mode` in GA4
configuration for that test page and its client-side navigations. The signal is
excluded from reported page URLs; ordinary visits omit the debug setting.

Google-side settings saved and rechecked during setup:

- Enhanced measurement off.
- Automatic history, scroll, outbound-click, form, video, and download detection off.
- User-provided data capabilities and automatic personal-data detection off.
- Existing tag has one Analytics destination and no connected site tags.
- This legacy Google tag retains page-load detection; `send_page_view: false` is
  queued globally and in its configuration before loading. Recheck duplication
  if Google migrates it to a unified Tag Manager container (SimplAssist needed
  destination-level overrides after that migration).

Original installation verification (November 13): production build, targeted lint, six analytics boundary tests,
desktop and 390px/320px browser layouts, saved allow/deny choices, preference
reopening, privacy navigation, and local tag exclusion passed. The existing
SimplAssist widget rejects local configuration requests, so a real chat-open
check requires the production hostname. No test contact email was sent.

Live lead-event verification (November 25): all nine public pages served the
correct measurement ID once in page source. Tag Assistant confirmed one loader,
manual page views on initial load and client navigation, and the requested CTA,
telephone, email, and successful-contact events with their parameters. GA4
Realtime received those events. An empty-form validation attempt produced no
lead; one clearly labeled test inquiry succeeded and produced one `generate_lead`.
The captured lead payload contained none of the entered test form values.
Enhanced measurement remained off with zero connected site tags. Live SEO
regressions passed and the production runtime error scan returned no errors.
The subsequent DebugView signal change passed the production build, targeted
lint, and all 18 analytics/contact tests before deployment.

Reports cover consenting visitors from installation onward, not past traffic
or every visitor. Live collection verification should check Google Realtime,
one page view per navigation, and denial/revocation before treating setup as
live-verified. No Analytics terms, new accounts, advertising links, or paid
services were added during setup.

References: [Google basic consent mode](https://developers.google.com/tag-platform/security/concepts/consent-mode),
[manual GA4 page views](https://developers.google.com/analytics/devguides/collection/ga4/views).

## SEO consolidation (approved November 22, 2026)

Fourteen city pages consolidate into the two existing service pages. See
[the release scope and URL map](LOCATION-PAGES-GUIDE.md).
The existing website-service page, homepage, About, Contact and Projects retain
their published copy and metadata. The service chooser and software page receive
the scoped improvements. Raw audit and Search Console evidence remains local.

For verification, build with the command above, then run
`npm run start -- --hostname 127.0.0.1 --port 4317` and `npm run check:seo`.
Use `scripts/check-preserved-pages.py` with a pre-release baseline to compare
protected-page copy and metadata locally and after release.
The shared scroll reveal leaves HTML visible by default and animates only when
an offscreen group enters view. Missing JavaScript or observation cannot leave
the main content hidden. Preserve that behavior when changing animation.
