/* ============================================
   TIMELINE — Experience layout & interactions
   ============================================ */

const Timeline = (() => {
  const container = document.getElementById('timeline');

  /**
   * Initialize Timeline
   */
  function init(data) {
    if (!container || !data.experience) return;

    _renderContent(data.experience);
    _bindEvents();
    _initIntersectionObserver();

    console.log('[Timeline] Initialized');
  }

  /**
   * Generates DOM
   */
  function _renderContent(experienceData) {
    let html = '';

    experienceData.forEach((exp, index) => {
      // First item is slightly expanded state by default to show it's interactive, or just keep them all closed. 
      // Let's keep them all collapsed for a cleaner look, or maybe first is expanded. Let's make first one expanded.
      const isExpanded = index === 0;
      const cardClass = isExpanded ? 'card timeline-card expanded' : 'card timeline-card';
      const toggleText = isExpanded ? 'Show Less' : 'Show Details';

      const impactHtml = exp.impact.map(item => `<li>${item}</li>`).join('');
      const techHtml = exp.tech.map(tech => `<span class="tag">${tech}</span>`).join('');

      html += `
        <div class="timeline-item reveal" style="transition-delay: ${index * 100}ms">
          <div class="timeline-marker"></div>
          <div class="timeline-content-wrapper">
            <div class="${cardClass}">
              <div class="timeline-header">
                <span class="timeline-date">${exp.period}</span>
                <h3 class="timeline-role">${exp.role}</h3>
                <div class="timeline-company">${exp.company}</div>
              </div>
              
              <div class="timeline-body">
                <p class="timeline-description">${exp.description}</p>
                
                <div class="timeline-impact">
                  <h4>Key Impact</h4>
                  <ul>
                    ${impactHtml}
                  </ul>
                </div>
                
                <div class="timeline-tech">
                  ${techHtml}
                </div>
              </div>
              
              <button class="timeline-toggle" aria-expanded="${isExpanded}">
                <span class="toggle-text">${toggleText}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  /**
   * Bind expand/collapse events
   */
  function _bindEvents() {
    const toggles = container.querySelectorAll('.timeline-toggle');

    toggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        const card = e.currentTarget.closest('.timeline-card');
        const textSpan = e.currentTarget.querySelector('.toggle-text');
        const isExpanded = card.classList.contains('expanded');

        if (isExpanded) {
          card.classList.remove('expanded');
          textSpan.textContent = 'Show Details';
          e.currentTarget.setAttribute('aria-expanded', 'false');
        } else {
          card.classList.add('expanded');
          textSpan.textContent = 'Show Less';
          e.currentTarget.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /**
   * Observer for smooth reveal on scrolling
   */
  function _initIntersectionObserver() {
    // Note: If About section already initialized .reveal globally, we still need 
    // to observe the newly added timeline items.
    const reveals = container.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(element => observer.observe(element));
  }

  return { init };
})();
