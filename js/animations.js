/* ============================================
   ANIMATIONS — Global Scroll Reveal
   ============================================ */

const Animations = (() => {
  /**
   * Initialize Global Animations
   */
  function init() {
    _initIntersectionObserver();
    console.log('[Animations] Initialized');
  }

  /**
   * Intersection observer for all elements with class 'reveal'
   */
  function _initIntersectionObserver() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Optional: Remove observer entirely after animation has played
          obs.unobserve(entry.target);
        }
      });
    }, { 
      root: null,
      threshold: 0.15,
      // Small root margin to trigger slightly before coming into view
      rootMargin: '0px 0px -50px 0px' 
    });

    reveals.forEach(element => {
      // Don't observe if already active
      if (!element.classList.contains('active')) {
        observer.observe(element);
      }
    });
  }

  return { init };
})();
