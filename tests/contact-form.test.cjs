const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');
const source = readFileSync(require('node:path').join(__dirname, '../theme.js'), 'utf8');

function submit(fields) {
  let onSubmit;
  const form = { addEventListener(name, handler) { if (name === 'submit') onSubmit = handler; } };
  const window = { location: { href: '' } };
  runInNewContext(source, {
    document: {
      querySelector() { return null; },
      querySelectorAll() { return []; },
      getElementById(id) { return id === 'form-contacto' ? form : null; }
    },
    FormData: class { get(key) { return fields[key] ?? null; } },
    window
  });
  onSubmit({ preventDefault() {} });
  return new URL(window.location.href);
}

test('includes email, phone and encoded message in the WhatsApp draft without sending it', () => {
  const url = submit({ nombre: ' Ana ', email: ' ana+demo@example.test ', telefono: ' +34 600 123 456 ', sector: ' Clínica ', mensaje: ' Marca & sistema: ¿cuándo? ' });
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/34608176024');
  assert.equal(url.searchParams.get('text'), 'Hola, vengo de la web de Enercoruña. Quiero un diagnóstico gratuito. Soy Ana. Email: ana+demo@example.test. Teléfono: +34 600 123 456. Sector: Clínica. Marca & sistema: ¿cuándo?');
});

test('omits optional contact fields when empty', () => {
  const text = submit({ nombre: 'Ana', email: ' ', telefono: '' }).searchParams.get('text');
  assert.equal(text, 'Hola, vengo de la web de Enercoruña. Quiero un diagnóstico gratuito. Soy Ana');
});

test('keeps an email or phone independently', () => {
  assert.match(submit({ email: 'hola@example.test' }).searchParams.get('text'), /Email: hola@example\.test$/);
  assert.match(submit({ telefono: '+34 600 123 456' }).searchParams.get('text'), /Teléfono: \+34 600 123 456$/);
});
