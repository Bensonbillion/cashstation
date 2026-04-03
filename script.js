/* =========================================
   Cookie Consent
   ========================================= */

(function() {
  var CONSENT_KEY = 'mcs_cookie_consent';
  var GA_ID = 'G-RFF5F4QF88';

  var banner = document.getElementById('cookie-banner');
  var acceptBtn = document.getElementById('cookie-accept');
  var declineBtn = document.getElementById('cookie-decline');

  var consent = localStorage.getItem(CONSENT_KEY);

  if (consent === 'accepted') {
    enableAnalytics();
  } else if (consent === 'declined') {
    disableAnalytics();
  } else {
    setTimeout(function() {
      if (banner) banner.style.display = 'block';
    }, 2000);
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function() {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      if (banner) banner.style.display = 'none';
      enableAnalytics();
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', function() {
      localStorage.setItem(CONSENT_KEY, 'declined');
      if (banner) banner.style.display = 'none';
      disableAnalytics();
    });
  }

  function enableAnalytics() {
    window['ga-disable-' + GA_ID] = false;
    if (typeof gtag === 'function') {
      gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  }

  function disableAnalytics() {
    window['ga-disable-' + GA_ID] = true;
    if (typeof gtag === 'function') {
      gtag('consent', 'update', { analytics_storage: 'denied' });
    }
  }
})();

/* =========================================
   MyCashStation — Main Script
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // --- Money rain background ---
  const rainContainer = document.querySelector('.money-rain-container');
  if (rainContainer) {
    const billCount = window.innerWidth < 768 ? 8 : 14;
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

  // --- Mobile bar show/hide ---
  const mobBar = document.getElementById('mob-bar');
  if (mobBar) {
    const hero = document.getElementById('hero');
    window.addEventListener('scroll', () => {
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      if (heroBottom < 0) {
        mobBar.classList.add('visible');
      } else {
        mobBar.classList.remove('visible');
      }
    });
  }

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

  // --- Multi-step form navigation ---
  function goToStep(stepNum) {
    const steps = [1, 2, 3];

    steps.forEach(n => {
      const el = document.getElementById('form-step-' + n);
      if (el) {
        el.style.display = n === stepNum ? 'block' : 'none';
      }
    });

    const fills = { 1: '33%', 2: '66%', 3: '100%' };
    const fill = document.getElementById('fp-fill');
    if (fill) fill.style.width = fills[stepNum];

    const labels = {
      1: ['fp-active','',''],
      2: ['fp-done','fp-active',''],
      3: ['fp-done','fp-done','fp-active']
    };

    [1,2,3].forEach((n, i) => {
      const s = document.getElementById('fp-s'+n);
      if (!s) return;
      s.classList.remove('fp-active','fp-done');
      if (labels[stepNum][i]) {
        s.classList.add(labels[stepNum][i]);
      }
      if (n === 1) {
        const dot = s.querySelector('.fp-dot-inner');
        if (dot && stepNum > 1) dot.textContent = '\u2713';
        if (dot && stepNum === 1) dot.textContent = '1';
      }
      if (n === 2) {
        const dot = s.querySelector('.fp-dot-inner');
        if (dot && stepNum > 2) dot.textContent = '\u2713';
        if (dot && stepNum <= 2) dot.textContent = '2';
      }
    });

    const c1 = document.getElementById('fp-c1');
    const c2 = document.getElementById('fp-c2');
    if (c1) c1.classList.toggle('fp-connector--filled', stepNum > 1);
    if (c2) c2.classList.toggle('fp-connector--filled', stepNum > 2);

    const bookSection = document.getElementById('book');
    if (bookSection) {
      window.scrollTo({
        top: bookSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  }

  document.querySelectorAll('.step-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.dataset.next);
      goToStep(next);
    });
  });

  document.querySelectorAll('.step-back').forEach(btn => {
    btn.addEventListener('click', () => {
      const back = parseInt(btn.dataset.back);
      goToStep(back);
    });
  });

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

      const email = document.getElementById('field-email');

      if (!name.value.trim()) { showError(name, 'This field is required'); valid = false; }
      if (!phone.value.trim()) { showError(phone, 'This field is required'); valid = false; }
      if (!email || !email.value.trim() || !email.value.includes('@')) { showError(email, 'Please enter a valid email address'); valid = false; }
      if (!date.value) { showError(date, 'This field is required'); valid = false; }
      if (!eventType.value) { showError(eventType, 'This field is required'); valid = false; }

      if (!valid) return;

      // Loading state
      submitBtn.textContent = 'Sending... \u23F3';
      submitBtn.classList.add('loading');

      const formData = new FormData();

      const nameVal = document.getElementById('field-name');
      const phoneVal = document.getElementById('field-phone');
      const emailVal = document.getElementById('field-email');
      const dateVal = document.getElementById('field-date');
      const eventTypeVal = document.getElementById('field-event-type');
      const serviceBoxes = document.querySelectorAll('#book input[type="checkbox"]:checked');
      const guestsVal = document.getElementById('field-guests');

      if (nameVal) formData.append('Full Name', nameVal.value);
      if (phoneVal) formData.append('Phone Number', phoneVal.value);
      if (emailVal) formData.append('Email', emailVal.value);
      if (dateVal) formData.append('Event Date', dateVal.value);
      if (eventTypeVal) formData.append('Event Type', eventTypeVal.value);

      const services = [];
      serviceBoxes.forEach(cb => { services.push(cb.value); });
      formData.append('Service Interest', services.join(', ') || 'Not selected');

      if (guestsVal) formData.append('Guest Count', guestsVal.value);

      formData.append('_subject', 'New MyCashStation Inquiry');

      fetch('https://formspree.io/f/mzdkeker', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          if (form) form.style.display = 'none';
          if (successDiv) successDiv.style.display = 'flex';

          const confettiColors = ['#FFD700', '#E6B800', '#C4A265', '#0D0D0D', '#F5F2EC'];
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
        } else {
          return response.json().then(() => {
            submitBtn.textContent = 'Check Availability \u2192';
            submitBtn.classList.remove('loading');
            alert('Something went wrong. Please email us directly at support@mycashstation.ca');
          });
        }
      })
      .catch(() => {
        submitBtn.textContent = 'Check Availability \u2192';
        submitBtn.classList.remove('loading');
        alert('Connection error. Please email us at support@mycashstation.ca');
      });
    });
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
