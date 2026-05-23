/* ============================================
   S&D — JAVASCRIPT DE INICIO (index.html)
   Incluye: marcas de agua, carrusel.
   Requiere: js/shared.js cargado antes.
============================================ */


/* ── MARCAS DE AGUA (logo decorativo de fondo) ── */
const heroWm    = document.getElementById('hero-wm');
const contactoWm = document.getElementById('contacto-wm');

if (heroWm)     heroWm.style.backgroundImage     = "url('img/logo.png')";
if (contactoWm) contactoWm.style.backgroundImage = "url('img/logo.png')";


/* ── CARRUSEL ──
   Auto-play cada 5 segundos.
   Navegación con flechas, dots y swipe táctil.
*/
const track   = document.getElementById('carouselTrack');
const dotsBox = document.getElementById('carouselDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Solo ejecutar si el carrusel existe en la página
if (track) {

  const slides = track.querySelectorAll('.carousel-slide');
  let current   = 0;
  let autoTimer = null;

  // Crear los dots de navegación
  function buildDots() {
    if (!dotsBox) return;
    slides.forEach(function (_, i) {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', function () {
        goTo(i);
        resetAuto();
      });
      dotsBox.appendChild(dot);
    });
  }

  // Ir a un slide específico
  function goTo(n) {
    current = ((n % slides.length) + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';

    // Actualizar dots activos
    document.querySelectorAll('.carousel-dot').forEach(function (dot, i) {
      dot.classList.toggle('active', i === current);
    });
  }

  // Reiniciar el timer de auto-play
  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(function () { goTo(current + 1); }, 5000);
  }

  // Flechas de navegación
  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      goTo(current - 1);
      resetAuto();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      goTo(current + 1);
      resetAuto();
    });
  }

  // Soporte para swipe táctil (mobile)
  let touchStartX = 0;

  track.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', function (e) {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 50) {
      goTo(current + (diff < 0 ? 1 : -1));
      resetAuto();
    }
  }, { passive: true });

  // Iniciar
  buildDots();
  resetAuto();
}
