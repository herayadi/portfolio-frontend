/* ============================================
   EDUCATION — Rendering Module
   ============================================ */

const Education = (() => {
  const container = document.getElementById('education-grid');

  function init(data) {
    if (!container || !data.education) return;
    _render(data.education);
    console.log('[Education] Initialized');
  }

  function _render(educationData) {
    let html = '';
    educationData.forEach((edu, index) => {
      html += `
        <div class="card edu-card reveal" style="transition-delay: ${index * 100}ms">
          <div class="edu-icon">🎓</div>
          <div class="edu-info">
            <span class="edu-date">${edu.period || ''}</span>
            <h3 class="edu-school">${edu.school}</h3>
            <p class="edu-degree">${edu.degree} in ${edu.field}</p>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  return { init };
})();
