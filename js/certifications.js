/* ============================================
   CERTIFICATIONS — Rendering Module
   ============================================ */

const Certifications = (() => {
  const container = document.getElementById('cert-grid');

  function init(data) {
    if (!container || !data.certifications) return;
    _render(data.certifications);
    console.log('[Certifications] Initialized');
  }

  function _render(certData) {
    let html = '';
    certData.forEach((cert, index) => {
      html += `
        <div class="card cert-card reveal" style="transition-delay: ${index * 100}ms">
          <div class="cert-icon">📜</div>
          <div class="cert-info">
            <h3 class="cert-name">${cert.name}</h3>
            <p class="cert-org">${cert.organization}</p>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  return { init };
})();
