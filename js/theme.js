/* ============================================
   THEME — Dark/Light Mode Toggle
   ============================================ */

const Theme = (() => {
  const STORAGE_KEY = 'hr-cv-theme';
  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  /**
   * Initialize theme
   */
  function init() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');

    _applyTheme(theme);
    _bindEvents();
    console.log('[Theme] Initialized:', theme);
  }

  /**
   * Bind events
   */
  function _bindEvents() {
    if (toggle) {
      toggle.addEventListener('click', _toggleTheme);
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        _applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  /**
   * Toggle between dark and light
   */
  function _toggleTheme() {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    _applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  /**
   * Apply theme to DOM
   */
  function _applyTheme(theme) {
    root.setAttribute('data-theme', theme);
  }

  /**
   * Get current theme
   */
  function getTheme() {
    return root.getAttribute('data-theme');
  }

  return { init, getTheme };
})();
