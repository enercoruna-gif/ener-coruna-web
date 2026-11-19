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

  var localTabs = document.querySelectorAll("[data-local-tab]");
  var localPanels = document.querySelectorAll("[data-local-panel]");
  if (localTabs.length) {
    function showLocal(id) {
      localTabs.forEach(function (tab) {
        var selected = tab.getAttribute("data-local-tab") === id;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });
      localPanels.forEach(function (item) { item.hidden = item.getAttribute("data-local-panel") !== id; });
    }
    localTabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () { showLocal(tab.getAttribute("data-local-tab")); });
      tab.addEventListener("keydown", function (event) {
        var next = index;
        if (event.key === "ArrowRight") next = (index + 1) % localTabs.length;
        else if (event.key === "ArrowLeft") next = (index + localTabs.length - 1) % localTabs.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = localTabs.length - 1;
        else return;
        event.preventDefault();
        localTabs[next].click();
        localTabs[next].focus();
      });
    });
    function localHash() {
      var id = (location.hash || "").slice(1);
      var known = Array.prototype.some.call(localTabs, function (tab) { return tab.getAttribute("data-local-tab") === id; });
      if (known) showLocal(id);
    }
    showLocal(localTabs[0].getAttribute("data-local-tab"));
    localHash();
    window.addEventListener("hashchange", localHash);
  }

  var form = document.getElementById("form-contacto");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var nombre = (d.get("nombre") || "").toString().trim();
      var email = (d.get("email") || "").toString().trim();
      var telefono = (d.get("telefono") || "").toString().trim();
      var sector = (d.get("sector") || "").toString().trim();
      var mensaje = (d.get("mensaje") || "").toString().trim();
      var text = "Hola, vengo de la web de Enercoruña. Quiero un diagnóstico gratuito";
      if (nombre) text += ". Soy " + nombre;
      if (email) text += ". Email: " + email;
      if (telefono) text += ". Teléfono: " + telefono;
      if (sector) text += ". Sector: " + sector;
      if (mensaje) text += ". " + mensaje;
      window.location.href = "https://wa.me/34608176024?text=" + encodeURIComponent(text);
    });
  }
})();
