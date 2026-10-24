/* ============================================
   S&D — JAVASCRIPT DE INICIO (index.html)
   Incluye: carrusel.
   Requiere: js/shared.js cargado antes.
============================================ */


/* ── CARRUSEL ──
   Auto-play cada 5 segundos (se pausa fuera de pantalla o con la pestaña oculta).
   Navegación con flechas, dots y swipe táctil.
   Transición por fundido: así el paso del último slide al primero
   no "rebobina" pasando por todos los slides.
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
    slides.forEach(function (slide, i) {
      slide.classList.toggle('active', i === current);
    });

    // Actualizar dots activos
    document.querySelectorAll('.carousel-dot').forEach(function (dot, i) {
      dot.classList.toggle('active', i === current);
    });
  }

  // Reiniciar el timer de auto-play (solo si el carrusel está a la vista)
  let inView = false;

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = null;
    if (inView && !document.hidden) {
      autoTimer = setInterval(function () { goTo(current + 1); }, 5000);
    }
  }

  // Pausar cuando el carrusel sale de pantalla o la pestaña se oculta
  new IntersectionObserver(function (entries) {
    inView = entries[0].isIntersecting;
    resetAuto();
  }, { threshold: 0.3 }).observe(track);

  document.addEventListener('visibilitychange', resetAuto);

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
  // Solo cuenta como swipe si el gesto es más horizontal que vertical:
  // así, al scrollear la página por encima del carrusel no cambia de slide.
  let touchStartX = 0;
  let touchStartY = 0;

  track.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  track.addEventListener('touchend', function (e) {
    const diffX = e.changedTouches[0].clientX - touchStartX;
    const diffY = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      goTo(current + (diffX < 0 ? 1 : -1));
      resetAuto();
    }
  }, { passive: true });

  // Iniciar
  buildDots();
  goTo(0);
}
