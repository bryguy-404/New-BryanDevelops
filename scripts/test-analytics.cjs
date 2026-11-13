const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

const source = ts.transpileModule(fs.readFileSync('src/lib/analytics/website.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function browser({ host = 'bryandevelops.com', path = '/', blocked = false } = {}) {
  const storage = new Map();
  const cookies = new Map([['_ga', 'existing'], ['_ga_HYM1RKG6KM', 'existing'], ['necessary', 'keep']]);
  const window = {
    location: { hostname: host, pathname: path, reload() { window.reloads++; } },
    reloads: 0,
    localStorage: {
      getItem(key) { if (blocked) throw Error('blocked'); return storage.get(key) || null; },
      setItem(key, value) { if (blocked) throw Error('blocked'); storage.set(key, value); },
      removeItem(key) { if (blocked) throw Error('blocked'); storage.delete(key); },
    },
    dispatchEvent() {},
  };
  const document = {
    referrer: 'https://search.example/private/document?email=private@example.com#secret',
    get cookie() { return [...cookies].map(([k, v]) => `${k}=${v}`).join('; '); },
    set cookie(value) { cookies.delete(value.split('=')[0]); },
  };
  const exports = {};
  vm.runInNewContext(source, { window, document, exports, process: { env: {} }, Event, URL, Date });
  const commands = () => (window.dataLayer || []).map(args => Array.from(args));
  const events = () => commands().filter(args => args[0] === 'event');
  return { api: exports, window, storage, cookies, commands, events };
}

test('no tag initialization or events before permission, after denial, or with blocked storage', () => {
  for (const blocked of [false, true]) {
    const b = browser({ blocked });
    assert.equal(b.api.startAnalytics(b.api.MEASUREMENT_ID), false);
    assert.equal(b.api.trackEvent('contact_form_success'), false);
    b.api.saveConsent('denied');
    assert.equal(b.api.startAnalytics(b.api.MEASUREMENT_ID), false);
    assert.equal(b.commands().length, 0);
    if (blocked) {
      b.api.saveConsent('granted');
      assert.equal(b.api.startAnalytics(b.api.MEASUREMENT_ID), false);
    }
  }
});

test('preview hosts, unknown paths, and invalid IDs cannot initialize analytics', () => {
  for (const options of [{host:'localhost'}, {host:'127.0.0.1'}, {host:'preview.vercel.app'}, {path:'/api/contact'}, {path:'/private/person@example.com'}]) {
    const b = browser(options);
    b.api.saveConsent('granted');
    assert.equal(b.api.startAnalytics(b.api.MEASUREMENT_ID), false);
  }
  const b = browser();
  b.api.saveConsent('granted');
  assert.equal(b.api.startAnalytics('GTM-NOTGA4'), false);
});

test('one manual page view per navigation with safe URLs and referrers', () => {
  const b = browser();
  b.api.saveConsent('granted');
  assert.equal(b.api.startAnalytics(b.api.MEASUREMENT_ID), true);
  b.api.trackPageView(); b.api.trackPageView();
  b.window.location.pathname = '/services/software';
  b.api.trackPageView(); b.api.trackPageView();
  b.window.location.pathname = '/'; b.api.trackPageView();
  assert.equal(b.events().length, 3);
  assert.equal(b.events()[0][2].page_referrer, 'https://search.example/');
  assert.equal(b.events()[1][2].page_referrer, 'https://bryandevelops.com/');
  assert.equal(b.events()[2][2].page_referrer, 'https://bryandevelops.com/services/software');
  assert.equal(b.commands().find(c => c[0] === 'config')[2].send_page_view, false);
  assert.doesNotMatch(JSON.stringify(b.commands()), /private@example|secret|private\/document/);
});

test('revocation stops events, clears only GA cookies, and unloads the tag', () => {
  const b = browser();
  b.api.saveConsent('granted'); b.api.startAnalytics(b.api.MEASUREMENT_ID);
  b.api.trackEvent('simplassist_click');
  b.api.saveConsent('denied');
  assert.equal(b.api.trackEvent('contact_form_success'), false);
  assert.equal(b.events().length, 1);
  assert.equal(b.window[`ga-disable-${b.api.MEASUREMENT_ID}`], true);
  assert.equal(b.window.reloads, 1);
  assert.deepEqual([...b.cookies.keys()], ['necessary']);
});

test('expired or tampered consent fails closed even in a previously active session', () => {
  const b = browser();
  b.api.saveConsent('granted'); b.api.startAnalytics(b.api.MEASUREMENT_ID);
  for (const value of ['invalid', JSON.stringify({choice:'granted', expires:Date.now()-1}), JSON.stringify({choice:'granted', expires:Date.now()+b.api.CONSENT_MAX_AGE_MS*2})]) {
    b.storage.set(b.api.CONSENT_KEY, value);
    assert.equal(b.api.readConsent(), null);
    assert.equal(b.api.trackEvent('contact_form_success'), false);
  }
  assert.equal(b.events().length, 0);
});

test('events have fixed labels and unknown inputs cannot leak into reports', () => {
  const b = browser({path:'/contact'});
  b.api.saveConsent('granted'); b.api.startAnalytics(b.api.MEASUREMENT_ID);
  assert.equal(b.api.trackEvent('private@example.com'), false);
  b.api.trackEvent('contact_form_success');
  assert.equal(b.events()[0][1], 'generate_lead');
  assert.equal(b.events()[0][2].method, 'contact_form');
  assert.equal(b.api.eventForLink('/Captura.dmg?email=private@example.com', 'https://bryandevelops.com'), 'captura_download');
  assert.equal(b.api.eventForLink('https://simplassist.com?email=private@example.com', 'https://bryandevelops.com'), 'simplassist_click');
  assert.equal(b.api.eventForLink('https://simplassist.com.attacker.example', 'https://bryandevelops.com'), null);
  assert.equal(b.api.eventForLink('mailto:private@example.com', 'https://bryandevelops.com'), null);
  assert.equal(b.api.safeReferrer('javascript:alert(1)'), '');
});
