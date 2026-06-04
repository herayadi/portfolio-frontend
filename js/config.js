/* ============================================
   CONFIG — Environment Configuration
   ============================================ */

// ⚠️ DEPLOYMENT INSTRUCTIONS:
// 1. After deploying the backend to Vercel, copy the provided Vercel URL.
// 2. Paste the URL into the PRODUCTION_BACKEND_URL variable below.
// 3. Example: 'https://backend-next-abcd123.vercel.app'
const PRODUCTION_BACKEND_URL = 'https://YOUR_VERCEL_BACKEND_URL_HERE.vercel.app';

const CONFIG = {
  // Base URL for the API
  API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api/v1'
    : `${PRODUCTION_BACKEND_URL}/api/v1`,
  
  // Base URL for the Playground link
  PLAYGROUND_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/playground'
    : `${PRODUCTION_BACKEND_URL}/playground`
};
