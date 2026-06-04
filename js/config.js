/* ============================================
   CONFIG — Environment Configuration
   ============================================ */

const CONFIG = {
  // If running locally, use localhost backend. 
  // Otherwise, set your production API URL here.
  API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api/v1'
    : 'https://api.herirahmat.com/api/v1'
};
