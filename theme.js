(function () {
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 20); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var menuBtn = document.querySelector("[data-menu-toggle]");
  var panel = document.querySelector("[data-nav-panel]");
  if (menuBtn && panel) {
    menuBtn.addEventListener("click", function () {
      var open = panel.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      var burger = menuBtn.querySelector("[data-icon=menu]");
      var close = menuBtn.querySelector("[data-icon=close]");
      if (burger && close) { burger.hidden = open; close.hidden = !open; }
    });
    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        panel.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        var burger = menuBtn.querySelector("[data-icon=menu]");
        var close = menuBtn.querySelector("[data-icon=close]");
        if (burger && close) { burger.hidden = false; close.hidden = true; }
      });
    });
  }

  var tabs = document.querySelectorAll("[data-sector-tab]");
  var panels = document.querySelectorAll("[data-sector-panel]");
  if (tabs.length) {
    function show(id) {
      tabs.forEach(function (t) {
        var on = t.getAttribute("data-sector-tab") === id;
        t.classList.toggle("is-on", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });
      panels.forEach(function (p) {
        p.hidden = p.getAttribute("data-sector-panel") !== id;
      });
    }
    tabs.forEach(function (t) {
      t.addEventListener("click", function () { show(t.getAttribute("data-sector-tab")); });
    });
    var hash = (location.hash || "").replace("#", "");
    if (hash === "taller" || hash === "talleres") show("taller");
    else if (hash === "reformas") show("reformas");
    else show("clinica");
  }

  var form = document.getElementById("form-contacto");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var nombre = (d.get("nombre") || "").toString().trim();
      var sector = (d.get("sector") || "").toString().trim();
      var mensaje = (d.get("mensaje") || "").toString().trim();
      var text = "Hola, vengo de la web de Enercoruña. Quiero un diagnóstico gratuito";
      if (nombre) text += ". Soy " + nombre;
      if (sector) text += ". Sector: " + sector;
      if (mensaje) text += ". " + mensaje;
      window.location.href = "https://wa.me/34608176024?text=" + encodeURIComponent(text);
    });
  }
})();
