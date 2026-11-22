import assert from 'node:assert/strict';

// Run against a production build (or explicitly against production after release).
// No form submissions, analytics events, or Search Console mutations.
const base = new URL(process.argv[2] || 'http://127.0.0.1:4317');
const canonicalOrigin = 'https://bryandevelops.com';
const retained = ['/services', '/services/web-development', '/services/software'];
const cities = ['south-bend', 'fort-wayne', 'warsaw', 'mishawaka', 'laporte', 'goshen', 'niles'];
const redirects = [
  ...['web-development', 'software'].flatMap(service => cities.map(city => [`/services/${service}/${city}`, `/services/${service}`])),
  ['/south-bend-web-developer', '/services/web-development'],
  ['/my-work', '/projects'],
  ['/website-design-development', '/services/web-development'],
  ['/best-website-builders', '/services/web-development'],
];
const retired = new Set(redirects.map(([source]) => source));
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1];
const cache = new Map();
async function read(path) {
  if (!cache.has(path)) cache.set(path, (async () => {
    const response = await fetch(new URL(path, base), { redirect: 'manual' });
    return { response, html: await response.text() };
  })());
  return cache.get(path);
}
function indexable(response, html, path) {
  assert.equal(response.status, 200, `${path}: HTTP 200`);
  assert(!/noindex|none/i.test(response.headers.get('x-robots-tag') || ''), `${path}: header robots`);
  for (const tag of html.match(/<meta\b[^>]*>/g) || []) {
    if (/^(robots|googlebot)$/i.test(attr(tag, 'name') || '')) {
      assert(!/noindex|none/i.test(attr(tag, 'content') || ''), `${path}: meta robots`);
    }
  }
}
const servicePages = await Promise.all(retained.map(async path => {
  const { response, html } = await read(path);
  indexable(response, html, path);
  const canonicals = (html.match(/<link\b[^>]*>/g) || []).filter(tag => attr(tag, 'rel') === 'canonical');
  const preserveIndexedMetadata = path === '/services/web-development';
  assert.equal(canonicals.length, preserveIndexedMetadata ? 0 : 1, `${path}: approved canonical policy`);
  if (!preserveIndexedMetadata) assert.equal(attr(canonicals[0], 'href'), canonicalOrigin + path, `${path}: self canonical`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path}: one H1`);
  assert(html.includes('South Bend') && html.includes('<main'), `${path}: location and main content in initial HTML`);
  assert(!html.includes('data-reveal="pending"'), `${path}: server HTML must start visible`);
  assert(!/class="[^"]*opacity-0 translate-y-6/.test(html), `${path}: no JS-dependent content wrapper`);
  const query = await read(path + '?audit_probe=1');
  const queryCanon = (query.html.match(/<link\b[^>]*>/g) || []).find(tag => attr(tag, 'rel') === 'canonical');
  assert.equal(attr(queryCanon || '', 'href'), preserveIndexedMetadata ? undefined : canonicalOrigin + path, `${path}: query canonical policy`);
  for (const json of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) JSON.parse(json[1]);
  return { path, html };
}));
for (const [source, destination] of redirects) {
  for (const suffix of ['', '/', '?audit_probe=1']) {
    let current = new URL(source + suffix, base), hops = 0;
    const seen = new Set();
    while (true) {
      assert(!seen.has(current.href), `${source}: redirect loop`);
      seen.add(current.href);
      const { response } = await read(current.pathname + current.search);
      if (response.status === 200) break;
      assert.equal(response.status, 308, `${current.pathname}: permanent redirect`);
      const location = response.headers.get('location');
      assert(location, `${source}: Location header`);
      current = new URL(location, current);
      assert.equal(current.origin, base.origin, `${source}: same-origin destination`);
      assert(++hops <= 2, `${source}: no unnecessary redirect chain`);
    }
    assert.equal(current.pathname, destination, `${source}: relevant final destination`);
    assert.equal(current.search, suffix.startsWith('?') ? suffix : '', `${source}: preserves query`);
    if (suffix !== '/') assert.equal(hops, 1, `${source}: direct redirect`);
  }
}
const { response: sitemapResponse, html: sitemap } = await read('/sitemap.xml');
assert.equal(sitemapResponse.status, 200);
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]));
assert.equal(sitemapUrls.length, 9, 'canonical sitemap inventory');
assert(!sitemap.includes('<lastmod>'), 'no fabricated modification dates');
for (const url of sitemapUrls) {
  assert.equal(url.origin, canonicalOrigin);
  assert(!retired.has(url.pathname), `sitemap must exclude ${url.pathname}`);
  const { response, html } = await read(url.pathname);
  indexable(response, html, url.pathname);
}
for (const path of [...retained, '/engineering']) assert(sitemapUrls.some(url => url.pathname === path), `${path}: included in sitemap`);
let linkCount = 0;
const linkedTargets = new Set();
for (const { path, html } of servicePages) {
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    if (!match[1].startsWith('/') && !match[1].startsWith('#')) continue;
    const target = new URL(match[1], new URL(path, base));
    assert(!retired.has(target.pathname), `${path}: link to consolidated URL ${target.pathname}`);
    linkedTargets.add(target.pathname);
    const { response, html: targetHtml } = await read(target.pathname);
    assert.equal(response.status, 200, `${path}: direct working link ${match[1]}`);
    if (target.hash) assert(targetHtml.includes(`id="${target.hash.slice(1)}"`), `${path}: existing anchor ${match[1]}`);
    linkCount++;
  }
}
for (const path of ['/services/web-development', '/services/software', '/engineering']) assert(linkedTargets.has(path), `${path}: reachable internal link`);
for (const path of ['/services/software/not-a-real-city', '/services/web-development/not-a-real-city', '/seo-growth-optimization', '/seo-audit-missing-url']) {
  assert.equal((await read(path)).response.status, 404, `${path}: honest 404, no broad catch-all`);
}
const { html: robots } = await read('/robots.txt');
assert(robots.includes('Allow: /') && !/Disallow:\s*\S/.test(robots), 'public crawl access');
assert(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`), 'robots sitemap discovery');
for (const path of ['/llms.txt', '/llms-full.txt']) {
  const { html } = await read(path);
  for (const url of retired) assert(!html.includes(canonicalOrigin + url), `${path}: no retired URLs`);
}
console.log(`PASS ${retained.length} retained service pages; ${redirects.length} redirects × 3 variants; ${sitemapUrls.length} sitemap URLs; ${linkCount} internal links/anchors; robots; 404s; initial HTML visibility.`);
