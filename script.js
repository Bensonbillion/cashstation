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

  // --- Fade-in observer ---
  // TODO: IntersectionObserver for fade-in-up animations on section headings

  // --- Confetti trigger ---
  // TODO: Fire gold & black confetti burst on inquiry form submission

  // --- WhatsApp button ---
  // TODO: Floating WhatsApp button visibility and link behavior

  // --- FAQ accordion ---
  // TODO: Toggle open/close on FAQ items

});
