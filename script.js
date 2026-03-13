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
  const fadeEls = document.querySelectorAll('.fade-in-up');
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay;
        if (delay) {
          entry.target.style.transitionDelay = delay + 's';
        }
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => fadeObserver.observe(el));

  // --- Experience card preselect ---
  function preselectService(value) {
    const checkbox = document.querySelector('#book input[type="checkbox"][value="' + value + '"]');
    if (checkbox) {
      checkbox.checked = true;
    }
  }

  document.querySelectorAll('.exp-card-cta[data-service]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      preselectService(btn.dataset.service);
    });
  });

  // --- Form: set min date to today ---
  const dateField = document.getElementById('field-date');
  if (dateField) {
    dateField.min = new Date().toISOString().split('T')[0];
  }

  // --- Form submission ---
  const submitBtn = document.getElementById('submit-btn');
  const form = document.getElementById('inquiry-form');
  const successDiv = document.getElementById('form-success');

  function clearErrors() {
    form.querySelectorAll('.field-error').forEach(el => el.classList.remove('field-error'));
    form.querySelectorAll('.field-error-msg').forEach(el => el.remove());
  }

  function showError(input, msg) {
    input.classList.add('field-error');
    const span = document.createElement('span');
    span.className = 'field-error-msg';
    span.textContent = msg;
    input.parentNode.appendChild(span);
  }

  if (submitBtn && form && successDiv) {
    submitBtn.addEventListener('click', () => {
      clearErrors();

      const name = document.getElementById('field-name');
      const phone = document.getElementById('field-phone');
      const date = document.getElementById('field-date');
      const eventType = document.getElementById('field-event-type');

      let valid = true;

      if (!name.value.trim()) { showError(name, 'This field is required'); valid = false; }
      if (!phone.value.trim()) { showError(phone, 'This field is required'); valid = false; }
      if (!date.value) { showError(date, 'This field is required'); valid = false; }
      if (!eventType.value) { showError(eventType, 'This field is required'); valid = false; }

      if (!valid) return;

      // Loading state
      submitBtn.textContent = 'Sending... \u23F3';
      submitBtn.classList.add('loading');

      setTimeout(() => {
        // Hide form, show success
        form.style.display = 'none';
        successDiv.style.display = 'flex';

        // Fire confetti
        const confettiColors = ['#C4A265', '#D4AF37', '#FFD700', '#0A0A0A', '#F0EDE6'];
        const confettiConfig = {
          colors: confettiColors,
          shapes: ['square'],
          gravity: 1.2,
          scalar: 1.1,
          ticks: 200
        };

        confetti(Object.assign({}, confettiConfig, {
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0.2, y: 0.6 }
        }));
        confetti(Object.assign({}, confettiConfig, {
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 0.8, y: 0.6 }
        }));

        // Reset button for potential re-use
        submitBtn.textContent = 'Check Availability \u2192';
        submitBtn.classList.remove('loading');
      }, 1200);
    });
  }

  // --- WhatsApp button ---
  // TODO: Floating WhatsApp button visibility and link behavior

  // --- FAQ accordion ---
  // TODO: Toggle open/close on FAQ items

});
