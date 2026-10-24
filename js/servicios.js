/* ============================================
   S&D — JAVASCRIPT DE SERVICIOS
   Incluye: sidebar activo.
   Requiere: js/shared.js cargado antes.
============================================ */


/* ── SIDEBAR: RESALTAR SERVICIO ACTIVO AL SCROLLEAR ──
   Detecta qué sección está visible y marca el link
   correspondiente en el sidebar.
*/
const sections     = document.querySelectorAll('section[id]');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

function updateSidebarActive() {
  let currentId = '';

  sections.forEach(function (section) {
    if (window.scrollY >= section.offsetTop - 120) {
      currentId = section.id;
    }
  });

  sidebarLinks.forEach(function (link) {
    const isActive = link.getAttribute('href') === '#' + currentId;
    link.classList.toggle('active', isActive);
  });
}

// Actualizar al hacer scroll y al cargar la página
window.addEventListener('scroll', updateSidebarActive);
updateSidebarActive();
