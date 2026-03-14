/* =========================================
   MyCashStation — Main Script
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // --- Money rain background ---
  const rainContainer = document.querySelector('.money-rain-container');
  if (rainContainer) {
    const billCount = window.innerWidth < 768 ? 8 : 12;
    for (let i = 0; i < billCount; i++) {
      const bill = document.createElement('span');
      bill.className = 'money-bill';
      bill.style.left = (5 + Math.random() * 85) + '%';
      bill.style.animationDelay = (Math.random() * 8) + 's';
      bill.style.animationDuration = (6 + Math.random() * 6) + 's';
      const rot = Math.floor(-30 + Math.random() * 60) + 'deg';
      bill.style.setProperty('--rot', rot);
      rainContainer.appendChild(bill);
    }
  }

  // --- Nav scroll behavior ---
  const nav = document.getElementById('nav');

  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
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
  const whatsappFloat = document.getElementById('whatsapp-float');

  if (whatsappFloat) {
    setTimeout(() => {
      whatsappFloat.classList.add('visible');
    }, 1500);

    const bookSection = document.getElementById('book');
    if (bookSection) {
      window.addEventListener('scroll', () => {
        const bookRect = bookSection.getBoundingClientRect();
        if (bookRect.top < window.innerHeight && bookRect.bottom > 0) {
          whatsappFloat.classList.add('dimmed');
        } else {
          whatsappFloat.classList.remove('dimmed');
        }
      });
    }
  }

  // --- FAQ accordion ---
  const faqButtons = document.querySelectorAll('.faq-question');

  function closeAllFaq() {
    document.querySelectorAll('.faq-item.open').forEach(item => {
      item.classList.remove('open');
      item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      item.querySelector('.faq-answer').style.maxHeight = '0';
    });
  }

  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      closeAllFaq();

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Open first FAQ item by default
  const firstFaq = document.querySelector('.faq-item');
  if (firstFaq) {
    const firstAnswer = firstFaq.querySelector('.faq-answer');
    const firstBtn = firstFaq.querySelector('.faq-question');
    firstFaq.classList.add('open');
    firstBtn.setAttribute('aria-expanded', 'true');
    firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
  }

});
