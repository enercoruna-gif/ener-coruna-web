'use strict';

const modal = document.querySelector('#demo-modal');
const form = document.querySelector('#demo-form');
const feedback = document.querySelector('#form-feedback');
const title = document.querySelector('#modal-title');
const description = document.querySelector('#modal-description');
const defaultDescription = description.textContent;
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

document.querySelectorAll('[data-open]').forEach(button => {
  button.addEventListener('click', () => {
    title.textContent = button.dataset.open;
    description.textContent = defaultDescription;
    form.hidden = false;
    form.style.display = '';
    form.reset();
    feedback.textContent = '';
    modal.showModal();
  });
});
document.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => {
  if (event.target !== modal) return;
  const bounds = modal.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) modal.close();
});
form.addEventListener('submit', event => {
  event.preventDefault();
  feedback.textContent = '¡Todo listo! Así terminaría tu registro. No hemos guardado ni enviado tu correo.';
  form.reset();
});

menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  nav.classList.toggle('open', open);
});
function closeMenu() {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Abrir menú');
}
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    closeMenu();
    menu.focus();
  }
});

const stepCopy = [
  ['Detalles del usuario', 'Su trabajo, de un vistazo'],
  ['Roles y permisos', 'Diseño · Acceso de edición'],
  ['Actividad del equipo', 'Todos los avances, en tiempo real'],
  ['Control de accesos', 'Solo las personas adecuadas']
];
document.querySelectorAll('[data-step]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-step]').forEach(step => {
      const active = step === button;
      step.classList.toggle('active', active);
      step.setAttribute('aria-expanded', String(active));
    });
    const copy = stepCopy[Number(button.dataset.step)];
    document.querySelector('#step-card-title').textContent = copy[0];
    document.querySelector('#step-card-label').textContent = copy[1];
  });
});

const tabs = [...document.querySelectorAll('[data-tab]')];
const tabCopy = [
  ['Gestionar equipo', 'Cada persona, su rol. Todo el equipo, conectado.'],
  ['Actividad del equipo', 'Los últimos avances de tu equipo, sin perder el contexto.'],
  ['Proyectos y objetivos', 'Una visión compartida de las personas y los proyectos.'],
  ['Gestionar accesos', 'Controla quién forma parte de tu espacio de trabajo.']
];
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach(item => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    document.querySelector('#feature-panel').setAttribute('aria-labelledby', tab.id);
    document.querySelector('#dashboard-title').textContent = tabCopy[index][0];
    document.querySelector('#dashboard-caption').textContent = tabCopy[index][1];
  });
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    tabs[next].click();
    tabs[next].focus();
  });
});

document.querySelector('.billing-switch').addEventListener('click', event => {
  const button = event.currentTarget;
  const annual = button.getAttribute('aria-checked') !== 'true';
  button.setAttribute('aria-checked', String(annual));
  document.querySelector('#monthly-label').classList.toggle('selected', !annual);
  document.querySelector('#annual-label').classList.toggle('selected', annual);
  const currency = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 });
  document.querySelectorAll('[data-monthly]').forEach(price => {
    const amount = Number(annual ? price.dataset.annual : price.dataset.monthly);
    price.textContent = currency.format(amount);
    const caption = price.closest('.price').parentElement.querySelector('.billing-caption');
    caption.textContent = annual ? `${currency.format(amount * 12)} por usuario, facturados al año` : 'Facturación mensual';
  });
});

const info = {
  privacidad: ['Privacidad de la demo', 'Esta demo no utiliza cookies de seguimiento, no guarda tu correo y no envía formularios a ningún servidor. Las fotografías, fuentes y avatares se sirven desde el propio sitio.'],
  condiciones: ['Condiciones de la demo', 'Nexora es un concepto de diseño, no un servicio comercial. Los precios, nombres, paneles y opiniones son ejemplos ilustrativos. No hay registro, contratación ni pagos reales.'],
  demo: ['Una demo de Ener Coruña', 'Recreación visual en español inspirada en la referencia facilitada por el cliente. Marca ficticia, fotografías de archivo ilustrativas y datos de muestra. Creada para explorar diseño y experiencia de usuario.']
};
document.querySelectorAll('[data-info]').forEach(button => button.addEventListener('click', () => {
  const copy = info[button.dataset.info];
  title.textContent = copy[0];
  description.textContent = copy[1];
  form.hidden = true;
  form.style.display = 'none';
  feedback.textContent = '';
  modal.showModal();
}));
document.querySelector('#year').textContent = new Date().getFullYear();
