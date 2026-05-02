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
   MyCashStation V4 Main Script
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // Money rain background in hero
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

  // Nav scroll behavior
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

  // Fade-in observer
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

  // Mobile bar show/hide
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

  // FAQ accordion
  const faqButtons = document.querySelectorAll('.faq-question');

  function closeAllFaq() {
    document.querySelectorAll('.faq-item.open').forEach(item => {
      item.classList.remove('open');
      const q = item.querySelector('.faq-question');
      const a = item.querySelector('.faq-answer');
      if (q) q.setAttribute('aria-expanded', 'false');
      if (a) a.style.maxHeight = '0';
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

  // Booking qualifier card filled state
  const qualInputs = document.querySelectorAll('.qual-card .qual-input');
  qualInputs.forEach(input => {
    const card = input.closest('.qual-card');
    const updateFilled = () => {
      if (input.value && input.value.trim()) {
        card.classList.add('is-filled');
      } else {
        card.classList.remove('is-filled');
      }
    };
    input.addEventListener('input', updateFilled);
    input.addEventListener('change', updateFilled);
  });

  // Set min date to today on the booking date input
  const dateInput = document.getElementById('qual-event-date');
  if (dateInput) {
    dateInput.min = new Date().toISOString().split('T')[0];
  }

});

/* =========================================
   Hero Machine Parallax (desktop only)
   ========================================= */

(function() {
  var card = document.querySelector('.machine-card');
  if (!card) return;
  if (window.innerWidth < 768) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var ticking = false;

  function update() {
    var y = window.scrollY;
    if (y > 800) { ticking = false; return; }
    var parallax = y * 0.08;
    var tilt = Math.min(y * 0.005, 1.6);
    card.style.transform = 'translateY(' + parallax + 'px) rotate(' + tilt + 'deg)';
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  });
})();
