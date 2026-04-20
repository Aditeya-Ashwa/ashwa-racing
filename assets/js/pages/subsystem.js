// ============================================================
// SUBSYSTEM PAGE - CLEAN GRID INTERACTIONS
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  initializeSubsystemCards();
});

/**
 * Initialize subsystem cards
 */
function initializeSubsystemCards() {
  const cards = document.querySelectorAll('.prog-card');

  cards.forEach(card => {
    // Click handler for navigation
    card.addEventListener('click', function () {
      const href = this.getAttribute('onclick');
      if (href) {
        const match = href.match(/'([^']+)'/);
        if (match) {
          window.location.href = match[1];
        }
      }
    });

    // Touch support for mobile
    let touchTimeout;
    card.addEventListener('touchstart', function () {
      this.classList.add('touch-active');
      clearTimeout(touchTimeout);
    }, false);

    card.addEventListener('touchend', function () {
      const element = this;
      touchTimeout = setTimeout(() => {
        element.classList.remove('touch-active');
      }, 200);
    }, false);
  });
}

/**
 * Navigate to subsystem page
 */
function goToPage(page) {
  window.location.href = page;
}