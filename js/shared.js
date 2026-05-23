/* ============================================
   S&D — JAVASCRIPT COMPARTIDO
   Aplica a todas las páginas.
   Incluye: nav scroll, menú mobile, animaciones.
============================================ */


/* ── EFECTO SCROLL EN EL NAV ── */
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }
});


/* ── MENÚ MOBILE (hamburger) ── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', function () {
    mobileMenu.classList.toggle('open');
  });
}

// Función global para cerrar el menú al hacer click en un link
function closeMenu() {
  if (mobileMenu) mobileMenu.classList.remove('open');
}


/* ── ANIMACIONES FADE-UP (bidireccionales) ──
   Los elementos se animan al entrar al viewport
   Y vuelven a su estado inicial al salir,
   por lo que se re-animan cada vez que aparecen.
*/
const fadeObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.1 });

// Observar todos los elementos con clase fade-up
document.querySelectorAll('.fade-up').forEach(function (el) {
  fadeObserver.observe(el);
});


/* ── ACTIVAR HERO INMEDIATAMENTE ──
   Los elementos del hero no esperan al scroll,
   se animan al cargar la página.
*/
setTimeout(function () {
  const heroEls = document.querySelectorAll('.hero-zone .fade-up, .page-hero .fade-up');
  heroEls.forEach(function (el) {
    el.classList.add('visible');
  });
}, 80);
