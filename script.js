/* =========================================
   MyCashStation — Main Script
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // --- Nav scroll behavior ---
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // --- Hero particles ---
  if (typeof tsParticles !== 'undefined') {
    tsParticles.load('tsparticles', {
      fullScreen: { enable: false },
      particles: {
        number: { value: 40 },
        color: { value: '#C4A265' },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 3 } },
        opacity: { value: { min: 0.1, max: 0.4 } },
        move: {
          enable: true,
          speed: 0.6,
          direction: 'top',
          outModes: { default: 'out' }
        }
      },
      interactivity: {
        events: {
          onHover: { enable: false },
          onClick: { enable: false }
        }
      },
      detectRetina: true
    });
  }

  // --- Fade-in observer ---
  // TODO: IntersectionObserver for fade-in-up animations on section headings

  // --- Confetti trigger ---
  // TODO: Fire gold & black confetti burst on inquiry form submission

  // --- WhatsApp button ---
  // TODO: Floating WhatsApp button visibility and link behavior

  // --- FAQ accordion ---
  // TODO: Toggle open/close on FAQ items

});
