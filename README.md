# Bryan Develops

Next.js website for https://bryandevelops.com. Production is Vercel project
`new-bryan-develops` (`prj_aMO8LE7XePXoHuWR9Pk2oHdlqDjY`), deployed from the
`main` branch of `bryguy-404/New-BryanDevelops`.

## Development and verification

- `npm run dev -- --webpack` — local preview.
- `npm run build -- --webpack` — production build and TypeScript checks.
- `npm run lint` — repository lint.
- `npm run test:analytics` — analytics consent, host/route, and payload tests.

Use Codex's built-in browser first for visual and interaction checks. Use a
separate Chrome tab only when an essential existing sign-in is needed.

## Website analytics (November 13, 2026)

Adapted from SimplAssist's consent-first implementation, with Bryan Develops'
own existing GA4 property, verified in Google Analytics:

- Google account: `bryandevelops574@gmail.com`.
- Analytics account: **Google Ads Account**, `343774761` (existing name).
- Property: **bryandevelops.com**, `475909677`.
- Web stream: **bryandevelops.com**, `10218154227`.
- Public measurement ID: `G-HYM1RKG6KM`; Google tag: `GT-5TC393TR`.
- Reports: https://analytics.google.com/analytics/web/#/a343774761p475909677/reports/intelligenthome

The public ID is the default in `src/lib/analytics/website.ts`. Override at build
time with `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`; an empty value disables tracking and
the consent prompt. This ID is not a credential. SMTP configuration stays in
the existing private environment variables.

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
External referrers retain only their origin; internal page transitions use the
previous public path. Google signals and advertising personalization are off in
the tag settings sent by the site. No session recording is installed.

| Event | What it measures |
| --- | --- |
| `page_view` | A consenting visitor views a public page. |
| `software_click` | A link to SimplAssist or SimplSEO is clicked (`product`). |
| `software_preview` | A different product preview tab is selected (`product`, `preview`), including keyboard navigation. |
| `file_download` | A Captura or PinMemories download link is clicked; it does not prove the download finished. |
| `contact_click` | Contact-page, telephone, or email link click (`method`); not proof of a completed inquiry or connected call. |
| `chat_open` | The existing SimplAssist chat launcher is opened; no messages are recorded in Analytics. |
| `contact_form_start` | First edit to the contact form while analytics is enabled. |
| `generate_lead` | The contact API returns success after the email provider accepts the inquiry; not a sale or guaranteed inbox delivery. |

Google-side settings saved and rechecked during setup:

- Enhanced measurement off.
- Automatic history, scroll, outbound-click, form, video, and download detection off.
- User-provided data capabilities and automatic personal-data detection off.
- Existing tag has one Analytics destination and no connected site tags.
- This legacy Google tag retains page-load detection; `send_page_view: false` is
  queued globally and in its configuration before loading. Recheck duplication
  if Google migrates it to a unified Tag Manager container (SimplAssist needed
  destination-level overrides after that migration).

Verification: production build, targeted lint, six analytics boundary tests,
desktop and 390px/320px browser layouts, saved allow/deny choices, preference
reopening, privacy navigation, and local tag exclusion passed. The existing
SimplAssist widget rejects local configuration requests, so a real chat-open
check requires the production hostname. No test contact email was sent.

Reports cover consenting visitors from installation onward, not past traffic
or every visitor. Live collection verification should check Google Realtime,
one page view per navigation, and denial/revocation before treating setup as
live-verified. No Analytics terms, new accounts, advertising links, or paid
services were added during setup.

References: [Google basic consent mode](https://developers.google.com/tag-platform/security/concepts/consent-mode),
[manual GA4 page views](https://developers.google.com/analytics/devguides/collection/ga4/views).
