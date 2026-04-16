/* ============================================
   SKILLS — Grouped Cards & Animated Progress Bars
   ============================================ */

const Skills = (() => {
  const container = document.getElementById('skills-grid');
  
  /**
   * Initialize Skills Section
   */
  function init(data) {
    if (!container || !data.skills) return;
    
    _renderContent(data.skills);
    _initIntersectionObserver();
    
    console.log('[Skills] Initialized');
  }

  /**
   * Render Skills DOM
   */
  function _renderContent(skillsData) {
    // skillsData is an object with categories as keys
    let html = '';
    
    let index = 0;
    for (const [key, category] of Object.entries(skillsData)) {
      let itemsHtml = '';
      
      category.items.forEach(skill => {
        // Convert percentage to a human readable level term for tooltip
        let levelTerm = 'Basic';
        if (skill.level >= 85) levelTerm = 'Expert';
        else if (skill.level >= 70) levelTerm = 'Advanced';
        else if (skill.level >= 50) levelTerm = 'Intermediate';

        itemsHtml += `
          <div class="skill-item">
            <div class="skill-info">
              <span class="skill-name">${skill.name}</span>
              <span class="skill-level-text">${skill.level}%</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" data-width="${skill.level}%"></div>
            </div>
            <div class="skill-tooltip">${levelTerm}</div>
          </div>
        `;
      });
      
      html += `
        <div class="skill-category-card reveal" style="transition-delay: ${index * 100}ms">
          <div class="skill-header">
            <div class="skill-icon">${category.icon}</div>
            <h3 class="skill-title">${category.title}</h3>
          </div>
          <div class="skill-list">
            ${itemsHtml}
          </div>
        </div>
      `;
      index++;
    }
    
    container.innerHTML = html;
  }

  /**
   * Intersection observer to animate progress bars once they enter viewport
   */
  function _initIntersectionObserver() {
    const reveals = container.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          
          // Animate the progress bars inside this specific card
          const progressFills = entry.target.querySelectorAll('.progress-fill');
          progressFills.forEach(fill => {
            const targetWidth = fill.getAttribute('data-width');
            // Give a tiny delay so the card reveal happens just before bars start moving
            setTimeout(() => {
              fill.style.width = targetWidth;
            }, 200);
          });
          
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(element => observer.observe(element));
  }

  return { init };
})();
