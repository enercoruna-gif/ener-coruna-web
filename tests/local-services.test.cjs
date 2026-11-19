const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');
const source = readFileSync(require('node:path').join(__dirname, '../theme.js'), 'utf8');

function setup(hash = '') {
  const ids = ['google-maps', 'resenas-google', 'carta-qr'];
  const tabs = ids.map(id => ({
    attrs: { 'data-local-tab': id }, events: {}, focused: false,
    getAttribute(key) { return this.attrs[key]; },
    setAttribute(key, value) { this.attrs[key] = value; },
    addEventListener(key, handler) { this.events[key] = handler; },
    click() { this.events.click(); },
    focus() { this.focused = true; }
  }));
  const panels = ids.map(id => ({ hidden: false, getAttribute() { return id; } }));
  const location = { hash };
  const events = {};
  runInNewContext(source, {
    document: {
      querySelector() { return null; },
      querySelectorAll(query) { return query === '[data-local-tab]' ? tabs : query === '[data-local-panel]' ? panels : []; },
      getElementById() { return null; }
    },
    location,
    window: { addEventListener(name, handler) { events[name] = handler; } }
  });
  return { tabs, panels, location, events };
}

test('shows Google Business first and exposes only the selected panel', () => {
  const { tabs, panels } = setup();
  assert.deepEqual(panels.map(p => p.hidden), [false, true, true]);
  assert.deepEqual(tabs.map(t => t.attrs['aria-selected']), ['true', 'false', 'false']);
  assert.deepEqual(tabs.map(t => t.tabIndex), [0, -1, -1]);
});

test('each service tab reveals its own panel', () => {
  const { tabs, panels } = setup();
  tabs.forEach((tab, selected) => {
    tab.click();
    assert.deepEqual(panels.map(p => p.hidden), panels.map((_, i) => i !== selected));
    assert.deepEqual(tabs.map(t => t.tabIndex), tabs.map((_, i) => i === selected ? 0 : -1));
  });
});

test('keyboard navigation wraps and focuses the selected tab', () => {
  const { tabs, panels } = setup();
  let prevented = false;
  tabs[0].events.keydown({ key: 'ArrowLeft', preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(tabs[2].focused, true);
  assert.equal(panels[2].hidden, false);
  tabs[2].events.keydown({ key: 'Home', preventDefault() {} });
  assert.equal(panels[0].hidden, false);
  tabs[0].events.keydown({ key: 'End', preventDefault() {} });
  assert.equal(panels[2].hidden, false);
});

test('service deep links select the correct panel on load and hash changes', () => {
  const { panels, location, events } = setup('#resenas-google');
  assert.equal(panels[1].hidden, false);
  location.hash = '#carta-qr';
  events.hashchange();
  assert.equal(panels[2].hidden, false);
});
