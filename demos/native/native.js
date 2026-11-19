(function () {
  var toggle = document.querySelector('[data-native-menu]');
  var menu = document.getElementById('native-menu');
  function closeMenu() {
    if (!menu || !toggle) return;
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.hidden;
      menu.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    menu.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && !menu.hidden) { closeMenu(); toggle.focus(); } });
    window.matchMedia('(min-width:761px)').addEventListener('change', function (event) { if (event.matches) closeMenu(); });
  }
  var dialog = document.getElementById('demo-contact');
  if (dialog && typeof dialog.showModal === 'function') {
    document.querySelectorAll('[data-demo-contact]').forEach(function (link) {
      link.addEventListener('click', function (event) { event.preventDefault(); dialog.showModal(); });
    });
    dialog.querySelector('[data-dialog-close]').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (event) { if (event.target === dialog) { var rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
  }
})();
