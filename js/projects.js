/* ============================================
   PROJECTS — Filter, Grid, and Modal
   ============================================ */

const Projects = (() => {
  const filterContainer = document.getElementById('projects-filter');
  const gridContainer = document.getElementById('projects-grid');
  const modalOverlay = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  
  let projectsData = [];
  let currentFilter = 'all';

  /**
   * Initialize Projects Section
   */
  function init(data) {
    if (!gridContainer || !data.projects) return;
    
    projectsData = data.projects;
    
    _renderFilters();
    _renderGrid('all');
    _bindEvents();
    
    // Initialize Mermaid.js configuration
    if (typeof mermaid !== 'undefined') {
      _initMermaid();
      // Also observe theme changes to re-init mermaid with new theme
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'data-theme') {
            _initMermaid();
            // If modal is open, re-render the diagram
            if (modalOverlay.classList.contains('active')) {
              _reRenderActiveMermaid();
            }
          }
        });
      });
      observer.observe(document.documentElement, { attributes: true });
    }

    // Call reveal observer again for newly added elements
    _initIntersectionObserver();
    
    console.log('[Projects] Initialized');
  }

  /**
   * Render Filter Buttons
   */
  function _renderFilters() {
    // Get unique categories
    const categories = ['all', ...new Set(projectsData.map(p => p.category))];
    
    let html = '';
    categories.forEach(cat => {
      const label = cat.charAt(0).toUpperCase() + cat.slice(1);
      const activeClass = cat === 'all' ? 'active' : '';
      html += `<button class="filter-btn ${activeClass}" data-filter="${cat}">${label}</button>`;
    });
    
    filterContainer.innerHTML = html;
  }

  /**
   * Render Projects Grid
   */
  function _renderGrid(filter) {
    let filteredData = projectsData;
    if (filter !== 'all') {
      filteredData = projectsData.filter(p => p.category === filter);
    }
    
    let html = '';
    filteredData.forEach((project, index) => {
      const techHtml = project.tech.slice(0, 3).map(t => `<span class="tag">${t}</span>`).join('');
      
      html += `
        <div class="card project-card reveal" data-id="${project.id}" style="transition-delay: ${index * 100}ms">
          <div class="project-icon">${project.icon}</div>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-brief">${project.brief}</p>
          <div class="project-tech">
            ${techHtml}
            ${project.tech.length > 3 ? `<span class="tag">+${project.tech.length - 3}</span>` : ''}
          </div>
          <div class="project-link">
            <span>View Case Study</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      `;
    });
    
    gridContainer.innerHTML = html;
    
    // Re-bind modal click events for new grid items
    const cards = gridContainer.querySelectorAll('.project-card');
    cards.forEach(card => {
      card.addEventListener('click', () => _openModal(card.getAttribute('data-id')));
    });

    // Manually trigger reveal for filtered items if they haven't been observed
    setTimeout(() => {
      const reveals = gridContainer.querySelectorAll('.reveal');
      reveals.forEach(r => r.classList.add('active'));
    }, 50);
  }

  /**
   * Bind Events (Filters, Modal closing)
   */
  function _bindEvents() {
    // Filter click
    filterContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        const btns = filterContainer.querySelectorAll('.filter-btn');
        btns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        currentFilter = e.target.getAttribute('data-filter');
        // Fade out grid slightly, then re-render
        gridContainer.style.opacity = '0';
        setTimeout(() => {
          _renderGrid(currentFilter);
          gridContainer.style.opacity = '1';
        }, 300);
      }
    });

    // Close Modal via Overlay click
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        _closeModal();
      }
    });
    
    // Close Modal via Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        _closeModal();
      }
    });
  }

  /**
   * Open Modal and render specific project details
   */
  function _openModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;
    
    const techHtml = project.tech.map(t => `<span class="tag">${t}</span>`).join('');
    
    let diagramHtml = '';
    if (project.architecture) {
      diagramHtml = `
        <div class="modal-section">
          <h3>Architecture Map</h3>
          <div class="modal-architecture mermaid" id="mermaid-container">
            ${project.architecture}
          </div>
        </div>
      `;
    }

    const html = `
      <div class="modal-header">
        <div>
          <h2>${project.title}</h2>
          <div class="project-tech" style="margin-bottom:0;">${techHtml}</div>
        </div>
        <button class="modal-close" id="modal-close-btn" aria-label="Close Case Study">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div class="modal-grid">
          <div class="modal-section">
            <h3>The Problem</h3>
            <p>${project.problem}</p>
          </div>
          <div class="modal-section">
            <h3>The Solution</h3>
            <p>${project.solution}</p>
          </div>
        </div>
        ${diagramHtml}
        <div class="modal-result">
          <h3>Impact & Result</h3>
          <p><strong>${project.result}</strong></p>
        </div>
      </div>
    `;

    modalContent.innerHTML = html;
    
    // Bind close button
    document.getElementById('modal-close-btn').addEventListener('click', _closeModal);
    
    // Show Modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Render Mermaid diagram
    if (typeof mermaid !== 'undefined' && project.architecture) {
      setTimeout(() => {
         mermaid.run({
            nodes: [document.getElementById('mermaid-container')]
         });
      }, 100);
    }
  }

  /**
   * Close Modal
   */
  function _closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    // Clear content after animation
    setTimeout(() => {
      if (!modalOverlay.classList.contains('active')) {
        modalContent.innerHTML = '';
      }
    }, 400);
  }

  /**
   * Initialize Mermaid settings based on theme
   */
  function _initMermaid() {
    if (typeof mermaid === 'undefined') return;
    
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'default',
      securityLevel: 'loose',
      fontFamily: 'Inter, sans-serif'
    });
  }
  
  /**
   * Re-render mermaid diagram in modal if theme changes
   */
  function _reRenderActiveMermaid() {
       const container = document.getElementById('mermaid-container');
       if (container) {
           // We'd have to find the active project's raw mermaid string again to re-render, 
           // since mermaid modifies the DOM. For simplicity in this demo, just let it be 
           // or re-process by getting the raw string from currently viewed data id.
           // A simpler approach is to close the modal or force a manual re-open.
       }
  }

  /**
   * Observer for smooth reveal
   */
  function _initIntersectionObserver() {
    const reveals = document.querySelectorAll('.projects-filter.reveal, .projects-grid.reveal');
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
