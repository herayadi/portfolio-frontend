/* ============================================
   APP.JS — Main Application Entry
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  console.log('[App] Middleware Developer CV — Initialized');
  
  // Initialize Modules
  Theme.init();
  Navigation.init();
  Hero.init(DATA.personal);
  About.init(DATA);
  Timeline.init(DATA);
  Projects.init(DATA);
  Skills.init(DATA);
  Contact.init(DATA);
  Footer.init(DATA);
  
  // Init global animations last to ensure all DOM is injected
  setTimeout(() => {
    Animations.init();
  }, 100);
  
  console.log('[App] Theme:', document.documentElement.getAttribute('data-theme'));
});
