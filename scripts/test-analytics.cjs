const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

const source = ts.transpileModule(fs.readFileSync('src/lib/analytics/website.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

class Element {
  constructor({ text = '', href, parent = null, disabled = false, className = '' } = {}) {
    Object.assign(this, { textContent: text, href, parent, disabled, className });
  }
  closest() { return this instanceof HTMLAnchorElement || this instanceof HTMLButtonElement ? this : this.parent?.closest(); }
  getAttribute(name) { return name === 'href' ? this.href : null; }
  matches(selector) { return selector === '.sa-widget-btn' && this.className === 'sa-widget-btn'; }
}
class HTMLAnchorElement extends Element {}
class HTMLButtonElement extends Element {}

function browser({ host = 'bryandevelops.com', path = '/', blocked = false, env = {} } = {}) {
  const storage = new Map();
  const cookies = new Map([['_ga', 'existing'], ['_ga_HYM1RKG6KM', 'existing'], ['necessary', 'keep']]);
  const window = {
    location: { hostname: host, origin: `https://${host}`, pathname: path, reload() { window.reloads++; } },
    reloads: 0,
    localStorage: {
      getItem(key) { if (blocked) throw Error('blocked'); return storage.get(key) || null; },
      setItem(key, value) { if (blocked) throw Error('blocked'); storage.set(key, value); },
      removeItem(key) { if (blocked) throw Error('blocked'); storage.delete(key); },
    },
    dispatchEvent() {},
    addEventListener() {},
    removeEventListener() {},
  };
  const listeners = new Map();
  const document = {
    referrer: 'https://search.example/private/document?email=private@example.com#secret',
    get cookie() { return [...cookies].map(([k, v]) => `${k}=${v}`).join('; '); },
    set cookie(value) { cookies.delete(value.split('=')[0]); },
    querySelector() { return null; },
    addEventListener(type, listener) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(listener);
    },
    removeEventListener(type, listener) { listeners.get(type)?.delete(listener); },
  };
  const exports = {};
  vm.runInNewContext(source, { window, document, exports, process: { env }, Event, URL, Date, Element, HTMLAnchorElement, HTMLButtonElement });
  const commands = () => Array.from(window.dataLayer || [], args => Array.from(args));
  const events = () => commands().filter(args => args[0] === 'event');
  return { api: exports, window, document, storage, cookies, commands, events, listeners,
    click(target) { for (const listener of listeners.get('click') || []) listener({ target }); },
  };
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
  assert.equal(b.events()[0][2].form_name, 'contact');
  assert.equal(b.events()[0][2].page_path, '/contact');
  assert.equal(b.api.eventForLink('/Captura.dmg?email=private@example.com', 'https://bryandevelops.com'), 'captura_download');
  assert.equal(b.api.eventForLink('https://simplassist.com?email=private@example.com', 'https://bryandevelops.com'), 'simplassist_click');
  assert.equal(b.api.eventForLink('https://simplassist.com.attacker.example', 'https://bryandevelops.com'), null);
  assert.equal(b.api.eventForLink('mailto:hello@example.com', 'https://bryandevelops.com'), 'email_click');
  assert.equal(b.api.safeReferrer('javascript:alert(1)'), '');
});

test('only the requested measurement ID can initialize, once even after repeated starts', () => {
  const b = browser({ env: { NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: 'G-UNRELATED' } });
  assert.equal(b.api.MEASUREMENT_ID, 'G-HYM1RKG6KM');
  b.api.saveConsent('granted');
  assert.equal(b.api.startAnalytics('G-UNRELATED'), false);
  b.api.startAnalytics(b.api.MEASUREMENT_ID);
  b.api.startAnalytics(b.api.MEASUREMENT_ID);
  assert.equal(b.commands().filter(c => c[0] === 'config').length, 1);
  assert.equal(b.commands().filter(c => c[0] === 'js').length, 1);
});

test('telephone, email, CTA, and booking events contain safe destinations and the current path', () => {
  const b = browser({ path: '/services/software' });
  b.api.saveConsent('granted'); b.api.startAnalytics(b.api.MEASUREMENT_ID);
  const origin = b.window.location.origin;
  b.api.trackLink('TEL:+15550101010?name=private-person#secret', 'Call', origin);
  b.api.trackLink('mailto:hello@example.com?subject=private-message&body=private-person', 'Email', origin);
  b.api.trackLink('/contact?email=private@example.com#secret', '  Get a Free Quote  ', origin);
  b.api.trackLink('https://calendly.com/business/consultation?name=private-person&email=private@example.com', 'Book a call', origin);
  const events = b.events();
  assert.deepEqual(events.map(e => e[1]), ['phone_click', 'email_click', 'contact_click', 'cta_click', 'booking_click', 'cta_click']);
  assert.equal(events[0][2].link_url, 'tel:+15550101010');
  assert.equal(events[1][2].link_url, 'mailto:hello@example.com');
  assert.equal(events[3][2].cta_text, 'Get a Free Quote');
  assert.equal(events[3][2].link_url, 'https://bryandevelops.com/contact');
  assert.equal(events[4][2].link_url, 'https://calendly.com/business/consultation');
  for (const event of events) assert.equal(event[2].page_path, '/services/software');
  assert.doesNotMatch(JSON.stringify(events), /private-person|private-message|private@example|secret/);
  assert.equal(b.api.eventForLink('https://calendly.com.attacker.example/schedule', origin), null);
  assert.equal(b.api.safeLinkUrl('https://user:password@cal.com/business/call?email=private@example.com#secret', origin), 'https://cal.com/business/call');
  b.api.trackLink('/contact', 'Private Person private@example.com', origin);
  assert.equal(b.events().at(-1)[2].cta_text, 'Contact');
});

// Render the actual components with lightweight hook/JSX adapters. Requests and
// Google's queue stay in memory: no real contact email or analytics hit is sent.
function component(path, b, fetch = async () => Response.json({ success: true })) {
  const hooks = [];
  let cursor = 0, effects = [];
  const jsx = (type, props) => ({ type, props });
  const react = {
    useState(initial) {
      const index = cursor++;
      hooks[index] ||= { value: typeof initial === 'function' ? initial() : initial };
      return [hooks[index].value, value => { hooks[index].value = typeof value === 'function' ? value(hooks[index].value) : value; }];
    },
    useRef(initial) { const index = cursor++; return hooks[index] ||= { current: initial }; },
    useCallback(fn) { return fn; },
    useSyncExternalStore(_subscribe, snapshot) { return snapshot(); },
    useEffect(effect, deps) {
      const index = cursor++;
      const previous = hooks[index];
      if (!previous || deps.some((value, i) => !Object.is(value, previous.deps[i]))) {
        effects.push(() => {
          previous?.cleanup?.();
          hooks[index] = { deps, cleanup: effect() };
        });
      }
    },
  };
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(path, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText, {
    exports, window: b.window, document: b.document, fetch, process: { env: { NODE_ENV: 'production' } },
    require(name) {
      if (name === 'react') return react;
      if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx, Fragment: 'Fragment' };
      if (name === '@/lib/analytics/website') return b.api;
      if (name === 'next/navigation') return { usePathname: () => b.window.location.pathname };
      if (name === '@/components/ConsentMascot') return { ConsentPeek: 'ConsentPeek', ConsentCelebration: 'ConsentCelebration' };
      if (['next/link', 'next/script', './CursorDots', './FadeIn', './ContactTurnstile'].includes(name)) return name;
      throw Error(`Unexpected import: ${name}`);
    },
  });
  return {
    render() {
      cursor = 0; effects = [];
      const tree = exports.default({ measurementId: b.api.MEASUREMENT_ID });
      for (const effect of effects) effect();
      return tree;
    },
    unmount() { for (const hook of hooks) hook?.cleanup?.(); },
  };
}

function find(tree, predicate) {
  if (!tree || typeof tree !== 'object') return null;
  if (Array.isArray(tree)) return tree.map(child => find(child, predicate)).find(Boolean) || null;
  return predicate(tree) ? tree : find(tree.props?.children, predicate);
}

test('shared layout component loads one tag after consent and tracks client navigation without duplicate listeners', () => {
  const b = browser();
  const app = component('src/components/WebsiteAnalytics.tsx', b);
  assert.equal(find(app.render(), node => node.type === 'next/script'), null);
  assert.equal(b.commands().length, 0);
  b.api.saveConsent('granted');
  const script = find(app.render(), node => node.type === 'next/script');
  assert.equal(script.props.src, 'https://www.googletagmanager.com/gtag/js?id=G-HYM1RKG6KM');
  assert.equal(script.props.strategy, 'afterInteractive');
  assert.equal(script.props.async, true);
  app.render();
  assert.equal(b.commands().filter(c => c[0] === 'config').length, 1);
  assert.equal(b.events().length, 1);
  b.window.location.pathname = '/contact'; app.render(); app.render();
  assert.deepEqual(b.events().map(event => event[2].page_path), ['/', '/contact']);
  assert.equal(b.listeners.get('click').size, 1);
  // These elements are created after the listener; nested SVG/icon targets bubble up.
  for (const href of ['tel:+15550101010', 'mailto:hello@example.com', 'https://cal.com/business/call']) {
    b.click(new Element({ parent: new HTMLAnchorElement({ href }) }));
  }
  assert.deepEqual(b.events().slice(-3).map(event => event[1]), ['phone_click', 'email_click', 'booking_click']);
  b.click(new HTMLButtonElement({ text: 'Send Message' }));
  assert.equal(b.events().at(-1)[1], 'cta_click');
  const count = b.events().length;
  b.click(new HTMLButtonElement({ text: 'Allow analytics' }));
  b.click(new HTMLButtonElement({ text: 'Send Message', disabled: true }));
  assert.equal(b.events().length, count);
  b.api.saveConsent('denied'); app.render();
  assert.equal(b.listeners.get('click').size, 0);
  assert.equal(find(app.render(), node => node.type === 'next/script'), null);
  app.unmount();
});

function contactForm(fetch) {
  const b = browser({ path: '/contact' });
  b.api.saveConsent('granted'); b.api.startAnalytics(b.api.MEASUREMENT_ID);
  const app = component('src/components/ContactPageContent.tsx', b, fetch);
  const render = () => app.render();
  return {
    b, render,
    verify() { find(render(), node => node.type === './ContactTurnstile').props.onToken('test-token'); },
    submit() { return find(render(), node => node.type === 'form').props.onSubmit({ preventDefault() {} }); },
  };
}

test('contact validation, unsuccessful responses, malformed responses, and network errors never generate a lead', async () => {
  let calls = 0;
  const unverified = contactForm(async () => { calls++; return Response.json({ success: true }); });
  await unverified.submit();
  assert.equal(calls, 0);
  assert.equal(unverified.b.events().length, 0);
  for (const fetch of [
    async () => Response.json({ error: 'Validation error' }, { status: 400 }),
    async () => Response.json({ error: 'Delivery failed' }, { status: 500 }),
    async () => Response.json({ success: false }),
    async () => new Response('not JSON'),
    async () => { throw Error('Network unavailable'); },
  ]) {
    const app = contactForm(fetch);
    app.verify(); await app.submit();
    assert.equal(app.b.events().length, 0);
    assert.ok(find(app.render(), node => node.props?.role === 'alert'));
    assert.ok(find(app.render(), node => node.type === 'form'));
  }
});

test('successful contact submission generates one lead after the response, without any form values', async () => {
  let resolve, requests = 0;
  const app = contactForm(() => { requests++; return new Promise(done => { resolve = done; }); });
  for (const [id, value] of Object.entries({ name: 'Private Person', email: 'private@example.com', phone: '+15555551234', message: 'private-message' })) {
    find(app.render(), node => node.props?.id === id).props.onChange({ target: { value } });
  }
  app.verify();
  const pending = app.submit();
  await app.submit();
  assert.equal(requests, 1);
  assert.equal(app.b.events().length, 0);
  resolve(Response.json({ success: true })); await pending;
  assert.equal(app.b.events().length, 1);
  assert.equal(app.b.events()[0][1], 'generate_lead');
  assert.equal(app.b.events()[0][2].form_name, 'contact');
  assert.equal(app.b.events()[0][2].page_path, '/contact');
  assert.doesNotMatch(JSON.stringify(app.b.commands()), /Private Person|private@example|15555551234|private-message|test-token/);
  assert.equal(find(app.render(), node => node.type === 'form'), null);
});
