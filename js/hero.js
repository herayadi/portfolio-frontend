/* ============================================
   HERO — Particle Background & Typing Effect
   ============================================ */

const Hero = (() => {
  const canvas = document.getElementById('hero-canvas');
  const typedRoleElement = document.getElementById('typed-role');
  
  let ctx, w, h;
  let particles = [];
  let isPlaying = true;
  let rafId;

  // Configuration for Particle network
  const config = {
    particleCount: window.innerWidth > 768 ? 80 : 40,
    maxDistance: 150,
    particleSpeed: 0.5,
    colors: ['#06b6d4', '#22d3ee', '#ffffff'] // Arctic Frost accents
  };

  /**
   * Initialize Hero Section
   */
  function init(data) {
    if (canvas && canvas.getContext) {
      ctx = canvas.getContext('2d');
      _resizeCanvas();
      _createParticles();
      _animateParticles();

      window.addEventListener('resize', () => {
        _resizeCanvas();
        _createParticles();
      });

      // Pause animation when not in view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!isPlaying) {
              isPlaying = true;
              _animateParticles();
            }
          } else {
            isPlaying = false;
            cancelAnimationFrame(rafId);
          }
        });
      }, { threshold: 0 });
      observer.observe(document.getElementById('hero'));
    }

    if (typedRoleElement && data && data.role) {
      _typeEffect(data.role, 0);
    }

    console.log('[Hero] Initialized');
  }

  /**
   * Resize canvas to fill viewport correctly
   */
  function _resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * config.particleSpeed;
      this.vy = (Math.random() - 0.5) * config.particleSpeed;
      this.radius = Math.random() * 2 + 1;
      this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
    }

    update() {
      // Bounce off edges
      if (this.x <= 0 || this.x >= w) this.vx *= -1;
      if (this.y <= 0 || this.y >= h) this.vy *= -1;
      
      this.x += this.vx;
      this.y += this.vy;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      
      // Global alpha depending on theme could be adjusted, but handled via CSS opacity on canvas
      const theme = document.documentElement.getAttribute('data-theme');
      ctx.globalAlpha = theme === 'light' ? 0.3 : 0.6;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function _createParticles() {
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function _animateParticles() {
    if (!isPlaying) return;

    ctx.clearRect(0, 0, w, h);

    const theme = document.documentElement.getAttribute('data-theme');
    const lineOpacity = theme === 'light' ? 0.1 : 0.2;

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Connect particles
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < config.maxDistance) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(6, 182, 212, ${lineOpacity * (1 - dist / config.maxDistance)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    rafId = requestAnimationFrame(_animateParticles);
  }

  /**
   * Typing effect for the role
   */
  function _typeEffect(text, index) {
    if (index < text.length) {
      typedRoleElement.textContent += text.charAt(index);
      setTimeout(() => _typeEffect(text, index + 1), 100); // 100ms per character
    }
  }

  return { init };
})();
