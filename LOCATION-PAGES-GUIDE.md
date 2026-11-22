# Location and service consolidation

Approved release scope: November 22, 2026. Site: https://bryandevelops.com.
Repository: `bryguy-404/New-BryanDevelops`. Production project: `new-bryan-develops`.

## Scope and preservation boundary

The 14 city pages consolidate into their corresponding existing service page.
The `/services` chooser and `/services/software` receive content, metadata and
navigation improvements. The published `/services/web-development` copy and
metadata are preserved, per Bryan’s explicit release instruction. Its title,
description, structured data and existing absence of a declared canonical stay
unchanged. The homepage, About, Contact and Projects copy and metadata also stay
unchanged. A shared scroll-reveal fix leaves HTML visible without JavaScript;
this is a presentation change affecting those pages as well.

The original broader proposal to rewrite the website-service page was withdrawn
before release. Do not restore that rewrite without a new scope decision.
Detailed search-performance evidence, screenshots and release comparisons stay
in the ignored local audit folder; they are not public source assets.

## URL map

Paths use the apex HTTPS domain. **Keep** preserves the existing page; **Improve**
retains its URL. **Consolidate** uses an exact permanent 308 to the destination.

| URL | Decision | Destination | Rationale |
|---|---|---|---|
| `/services` | **Improve** | `/services` | Retain the service chooser, clarify website vs. software intent, and replace the city directory with useful direct links. |
| `/services/web-development` | **Keep** | `/services/web-development` | Preserve the existing URL, published copy, title, description, canonical policy and structured data by explicit user instruction. Relevant city pages redirect to this existing service. |
| `/services/software` | **Improve** | `/services/software` | Retain the workflow/application service, add practical planning guidance, and improve crawl signals. |
| `/services/web-development/south-bend` | **Consolidate** | `/services/web-development` | Same service and visitor task as the parent; no distinct delivery arrangement or substantiated city-specific case established. |
| `/services/web-development/fort-wayne` | **Consolidate** | `/services/web-development` | Same service and visitor task as the parent; no distinct delivery arrangement or substantiated city-specific case established. |
| `/services/web-development/warsaw` | **Consolidate** | `/services/web-development` | Same service and visitor task as the parent; no distinct delivery arrangement or substantiated city-specific case established. |
| `/services/web-development/mishawaka` | **Consolidate** | `/services/web-development` | Same service and visitor task as the parent; no distinct delivery arrangement or substantiated city-specific case established. |
| `/services/web-development/laporte` | **Consolidate** | `/services/web-development` | Same service and visitor task as the parent; no distinct delivery arrangement or substantiated city-specific case established. |
| `/services/web-development/goshen` | **Consolidate** | `/services/web-development` | Same service and visitor task as the parent; no distinct delivery arrangement or substantiated city-specific case established. |
| `/services/web-development/niles` | **Consolidate** | `/services/web-development` | Same service and visitor task as the parent; no distinct delivery arrangement or substantiated city-specific case established. |
| `/services/software/south-bend` | **Consolidate** | `/services/software` | Same service and visitor task as the parent; no distinct delivery arrangement or substantiated city-specific case established. |
| `/services/software/fort-wayne` | **Consolidate** | `/services/software` | Same service and visitor task as the parent; no distinct delivery arrangement or substantiated city-specific case established. |
| `/services/software/warsaw` | **Consolidate** | `/services/software` | Same service and visitor task as the parent; no distinct delivery arrangement or substantiated city-specific case established. |
| `/services/software/mishawaka` | **Consolidate** | `/services/software` | Same service and visitor task as the parent; no distinct delivery arrangement or substantiated city-specific case established. |
| `/services/software/laporte` | **Consolidate** | `/services/software` | Same service and visitor task as the parent; no distinct delivery arrangement or substantiated city-specific case established. |
| `/services/software/goshen` | **Consolidate** | `/services/software` | Same service and visitor task as the parent; no distinct delivery arrangement or substantiated city-specific case established. |
| `/services/software/niles` | **Consolidate** | `/services/software` | Same service and visitor task as the parent; no distinct delivery arrangement or substantiated city-specific case established. |

Existing `/website-design-development` and `/best-website-builders` redirects
remain. `/south-bend-web-developer` redirects to `/services/web-development`;
`/my-work` redirects to `/projects`. The retired SEO-management URL remains 404
because no equivalent current service is established. Unknown city paths also
remain 404; there is no broad service catch-all.

## Technical behavior

- `/services` and `/services/software` declare absolute self-canonicals, including
  for query-bearing variants. The preserved website-service page has no declared
  canonical. Google may select a canonical independently.
- Internal links and the nine-page sitemap point to retained URLs. The sitemap
  includes `/engineering` and omits artificial build-time modification dates.
- Initial HTML includes readable service content. The shared reveal animates
  below-fold content only when it enters view, with focus/anchor/reduced-motion
  cancellation. Missing JavaScript or an observer cannot leave wrappers hidden.
- Existing GA4 configuration and consent behavior stay in place. Its route
  allowlist removes retired city URLs; no new Analytics tag is installed.
- A slash variant can normalize before reaching its permanent replacement;
  normal and query-bearing old URLs redirect directly, preserving the query.

## Verification

Build with `npm run build -- --webpack`, then start the production server with
`npm run start -- --hostname 127.0.0.1 --port 4317`.

- `npm run check:seo -- http://127.0.0.1:4317` checks 18 redirects with normal,
  slash and query variants, the three retained service pages, approved canonical
  policy, sitemap, internal links/anchors, robots, initial HTML and real 404s.
- `npm run test:analytics` verifies existing consent and event boundaries.
- Before release, capture the five protected pages with
  `python3 scripts/check-preserved-pages.py capture https://bryandevelops.com <local-baseline.json>`.
  Compare the local build and live release using the same script’s `compare`
  command, base URL and baseline file. It checks normalized copy, title, meta
  tags, canonicals and JSON-LD; build asset hashes and animation classes may vary.
- Review desktop and phone rendering and the actual service/contact navigation.
  Do not send a test contact message unless that action is authorized.

Technical verification does not prove indexing or ranking gains. After release,
observe Google’s recrawl, selected canonicals, coverage and relevant search/lead
behavior. Do not treat expected exclusion of redirected city URLs as failure.
The separate www TLS issue and GA reporting access require their own follow-up;
this release does not change hosting domains, DNS or Google account settings.

Future city pages need a distinct visitor task and verified supporting material.
Landmarks, city-name swaps, population, driving distance and word-count targets
are not sufficient reasons to create them.
