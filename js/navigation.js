/* ============================================
   NAVIGATION — Navbar, Smooth Scroll, Active Section
   ============================================ */

const Navigation = (() => {
  // DOM elements
  const navbar = document.getElementById('navbar');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const hamburger = document.getElementById('hamburger');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const sections = document.querySelectorAll('.section[id]');

  // State
  let currentSection = '';
  let isMenuOpen = false;
  let ticking = false;

  /**
   * Initialize navigation
   */
  function init() {
    _bindEvents();
    _onScroll(); // check initial state
    console.log('[Navigation] Initialized');
  }

  /**
   * Bind all event listeners
   */
  function _bindEvents() {
    // Scroll events
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          _onScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Nav link clicks
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        _scrollToSection(targetId);
        if (isMenuOpen) _closeMenu();
      });
    });

    // Logo click → scroll to top
    const logo = document.getElementById('nav-logo');
    if (logo) {
      logo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (isMenuOpen) _closeMenu();
      });
    }

    // Hamburger toggle
    if (hamburger) {
      hamburger.addEventListener('click', _toggleMenu);
    }

    // Close menu on overlay click
    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', _closeMenu);
    }

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        _closeMenu();
      }
    });

    // Close menu on resize (if going to desktop)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        _closeMenu();
      }
    });
  }

  /**
   * Handle scroll — navbar bg + active section
   */
  function _onScroll() {
    const scrollY = window.scrollY;

    // Navbar glassmorphism on scroll
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active section detection
    _updateActiveSection(scrollY);
  }

  /**
   * Detect which section is currently in view
   */
  function _updateActiveSection(scrollY) {
    const offset = window.innerHeight * 0.35;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - offset;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        if (currentSection !== sectionId) {
          currentSection = sectionId;
          _highlightNavLink(sectionId);
        }
      }
    });
  }

  /**
   * Highlight the active nav link
   */
  function _highlightNavLink(sectionId) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === sectionId) {
        link.classList.add('active');
      }
    });
  }

  /**
   * Smooth scroll to section
   */
  function _scrollToSection(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const navHeight = navbar.offsetHeight;
    const targetPosition = target.offsetTop - navHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  /**
   * Toggle mobile menu
   */
  function _toggleMenu() {
    isMenuOpen ? _closeMenu() : _openMenu();
  }

  /**
   * Open mobile menu
   */
  function _openMenu() {
    isMenuOpen = true;
    hamburger.classList.add('active');
    navMenu.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close mobile menu
   */
  function _closeMenu() {
    isMenuOpen = false;
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  return { init };
})();
