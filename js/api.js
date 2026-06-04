/* ============================================
   API — Backend Integration Utility
   ============================================ */

const API = (() => {
  const BASE_URL = CONFIG.API_BASE_URL;

  /**
   * Generic fetch wrapper
   */
  async function _fetchData(endpoint) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`[API] Error fetching ${endpoint}:`, error);
      return null;
    }
  }

  /**
   * Post data wrapper
   */
  async function _postData(endpoint, data) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return response;
    } catch (error) {
      console.error(`[API] Error posting to ${endpoint}:`, error);
      return null;
    }
  }

  return {
    getCV: () => _fetchData('/cv'),
    getPosts: () => _fetchData('/posts'),
    getPost: (slug) => _fetchData(`/posts/${slug}`),
    submitContact: (data) => _postData('/contact', data)
  };
})();
