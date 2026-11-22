const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function load(path, globals) {
  const exports = {};
  const source = ts.transpileModule(fs.readFileSync(path, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(source, { exports, ...globals });
  return exports;
}

function contact({ result = { success: true, hostname: 'bryandevelops.com', action: 'contact' }, env = {}, fetchError, httpStatus = 200, mailError } = {}) {
  const calls = [];
  const sent = [];
  const globals = {
    process: { env: { TURNSTILE_SECRET_KEY: 'private-test-fixture', ...env } },
    console: { error() {} },
    AbortSignal,
    fetch: async (url, options) => {
      calls.push({ url, options });
      if (fetchError) throw fetchError;
      return new Response(JSON.stringify(result), { status: httpStatus });
    },
  };
  const verification = load('src/lib/turnstile.ts', globals);
  let transports = 0;
  const route = load('src/app/api/contact/route.ts', {
    ...globals,
    require(name) {
      if (name === '@/lib/turnstile') return verification;
      if (name === 'next/server') return { NextResponse: { json: (body, init) => Response.json(body, init) } };
      if (name === 'nodemailer') return { createTransport() {
        transports++;
        return { async sendMail(mail) {
          if (mailError) throw mailError;
          sent.push(mail);
        } };
      } };
      throw Error(`Unexpected import: ${name}`);
    },
  });
  return {
    calls, sent,
    get transports() { return transports; },
    submit(body) { return route.POST(new Request('https://bryandevelops.com/api/contact', {
      method: 'POST', body: typeof body === 'string' ? body : JSON.stringify(body),
    })); },
  };
}

const inquiry = {
  name: 'Contact protection test', email: 'test@example.com', service: 'Other',
  message: 'Automated test; no real email is sent.', turnstileToken: 'test-token',
};

test('missing, malformed, and oversized tokens never reach Cloudflare or email', async () => {
  for (const turnstileToken of [undefined, null, '', '   ', {}, 123, 'x'.repeat(2049)]) {
    const app = contact();
    assert.equal((await app.submit({ ...inquiry, turnstileToken })).status, 400);
    assert.equal(app.calls.length, 0);
    assert.equal(app.transports, 0);
  }
});

test('invalid JSON and missing or non-string required fields cannot send mail', async () => {
  for (const body of ['{', 'null', '[]', {}, { ...inquiry, name: {} }, { ...inquiry, email: ' ' }]) {
    const app = contact();
    assert.equal((await app.submit(body)).status, 400);
    assert.equal(app.transports, 0);
  }
});

test('failed, expired, reused, wrong-host, and wrong-action verification cannot send mail', async () => {
  for (const result of [
    { success: false },
    { success: false, 'error-codes': ['timeout-or-duplicate'] },
    { success: true, hostname: 'attacker.example', action: 'contact' },
    { success: true, hostname: 'bryandevelops.com.attacker.example', action: 'contact' },
    { success: true, hostname: 'bryandevelops.com', action: 'login' },
    { success: 'true', hostname: 'bryandevelops.com', action: 'contact' },
    null,
  ]) {
    const app = contact({ result });
    assert.equal((await app.submit(inquiry)).status, 400);
    assert.equal(app.transports, 0);
  }
});

test('missing configuration, dummy keys on Vercel, and provider outages fail closed', async () => {
  for (const options of [
    { env: { TURNSTILE_SECRET_KEY: undefined } },
    { env: { VERCEL_ENV: 'production', TURNSTILE_SECRET_KEY: '1x0000000000000000000000000000000AA' } },
    { env: { VERCEL_ENV: 'preview', TURNSTILE_SECRET_KEY: '1x0000000000000000000000000000000AA' } },
    { fetchError: new Error('Network failure') },
    { fetchError: new DOMException('Timed out', 'TimeoutError') },
    { httpStatus: 500 },
  ]) {
    const app = contact(options);
    assert.equal((await app.submit(inquiry)).status, 503);
    assert.equal(app.transports, 0);
  }
});

test('verified contact requests send exactly one message after server validation', async () => {
  for (const hostname of ['bryandevelops.com', 'www.bryandevelops.com']) {
    const app = contact({ result: { success: true, hostname, action: 'contact' } });
    const response = await app.submit(inquiry);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { success: true });
    assert.equal(app.calls.length, 1);
    assert.equal(app.calls[0].url, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
    assert.deepEqual(JSON.parse(app.calls[0].options.body), { secret: 'private-test-fixture', response: 'test-token' });
    assert.equal(app.calls[0].options.cache, 'no-store');
    assert.equal(app.transports, 1);
    assert.equal(app.sent.length, 1);
    assert.equal(app.sent[0].replyTo, 'test@example.com');
    assert.doesNotMatch(app.sent[0].html, /test-token|private-test-fixture/);
  }
});

test('email delivery failures never report a successful inquiry', async () => {
  const app = contact({ mailError: new Error('SMTP unavailable') });
  const response = await app.submit(inquiry);
  assert.equal(response.status, 500);
  assert.equal(app.sent.length, 0);
  assert.deepEqual(await response.json(), { error: 'Failed to send message' });
});
