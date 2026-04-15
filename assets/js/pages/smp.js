/* smp.js - High-End Storytelling Interactions */
document.addEventListener('DOMContentLoaded', () => {

  // 1. Initialize GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 2. Parallax Car Float
  const carImg = document.querySelector('.parallax-car');
  if (carImg && typeof gsap !== 'undefined') {
    gsap.to(carImg, {
      y: -15,
      rotation: 0.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      duration: 4
    });

    gsap.to(carImg, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: ".smp-hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }

  // 4. Partner Network Final Animation
  const partnerSection = document.querySelector('.partner-network-content');
  if (partnerSection && typeof gsap !== 'undefined') {
    gsap.to(partnerSection, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#partner-network",
        start: "top 70%"
      }
    });
  }

  // Deck Mockup Tilt Interaction (From original)
  const tiltBox = document.getElementById('tilt-box');
  const deck = document.querySelector('.proposal-deck');
  const glare = document.querySelector('.glare-layer');

  if (tiltBox && deck && glare) {
    tiltBox.addEventListener('mousemove', (e) => {
      const rect = tiltBox.getBoundingClientRect();
      const x = e.clientX - rect.left - (rect.width / 2);
      const y = e.clientY - rect.top - (rect.height / 2);

      const rotateX = -(y / (rect.height / 2)) * 15;
      const rotateY = (x / (rect.width / 2)) * 15;
      deck.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      const glareX = (e.clientX - rect.left) / rect.width * 100;
      const glareY = (e.clientY - rect.top) / rect.height * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4) 0%, transparent 60%)`;
    });

    tiltBox.addEventListener('mouseenter', () => {
      deck.style.transition = 'none';
      glare.style.opacity = '1';
    });

    tiltBox.addEventListener('mouseleave', () => {
      deck.style.transition = 'transform 0.5s ease-out';
      deck.style.transform = 'rotateX(0deg) rotateY(0deg)';
      glare.style.opacity = '0';
    });
  }

  // Counter animations for Partner Network Stats
  const statNums = document.querySelectorAll('.stat-num');
  if (typeof gsap !== 'undefined') {
    statNums.forEach(stat => {
      const valStr = stat.getAttribute('data-val');
      if (valStr) {
        const val = parseInt(valStr, 10);
        if (!isNaN(val)) {
          let obj = { val: 0 };
          gsap.to(obj, {
            val: val,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 80%"
            },
            onUpdate: () => {
              stat.innerHTML = Math.round(obj.val) + (valStr.includes('+') || val === 40 ? '+' : (val === 2025 ? '-26' : ''));
            }
          });
        }
      }
    });
  }
});

/* ==========================================================================
   Interactive Pixel Canvas Slabs
   ========================================================================== */

class Pixel {
  constructor(canvas, context, x, y, color, speed, delay) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size -= 0.1;
    }
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }
    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

function getEffectiveSpeed(value, reducedMotion) {
  const min = 0;
  const max = 100;
  const throttle = 0.001;
  const parsed = parseInt(value, 10);

  if (parsed <= min || reducedMotion) {
    return min;
  } else if (parsed >= max) {
    return max * throttle;
  } else {
    return parsed * throttle;
  }
}

const PIXEL_VARIANTS = {
  default: { gap: 5, speed: 70, colors: '#e2e8f0,#cbd5e1,#94a3b8' },
  blue: { gap: 10, speed: 50, colors: '#7dd3fc,#38bdf8,#0ea5e9' },
  yellow: { gap: 8, speed: 45, colors: '#b48608,#8a6d1c,#665219,#3d3215' }, // Significantly darker/muted gold for text readability
  red: { gap: 6, speed: 100, colors: '#fda4af,#fb7185,#e11d48' },
  green: { gap: 8, speed: 60, colors: '#86efac,#4ade80,#22c55e' }
};

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.pixel-card');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  cards.forEach(card => {
    const canvas = card.querySelector('.pixel-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const variantName = card.dataset.variant || 'default';
    const variantCfg = PIXEL_VARIANTS[variantName] || PIXEL_VARIANTS.default;

    let pixels = [];
    let animationRef = null;
    let timePrevious = performance.now();

    const initPixels = () => {
      const rect = card.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);

      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const colorsArray = variantCfg.colors.split(',');
      pixels = [];
      const gap = parseInt(variantCfg.gap, 10);
      const effSpeed = getEffectiveSpeed(variantCfg.speed, reducedMotion);

      for (let x = 0; x < width; x += gap) {
        for (let y = 0; y < height; y += gap) {
          const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];
          const dx = x - width / 2;
          const dy = y - height / 2;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const delay = reducedMotion ? 0 : distance;

          pixels.push(new Pixel(canvas, ctx, x, y, color, effSpeed, delay));
        }
      }
    };

    const doAnimate = (fnName) => {
      animationRef = requestAnimationFrame(() => doAnimate(fnName));
      const timeNow = performance.now();
      const timePassed = timeNow - timePrevious;
      const timeInterval = 1000 / 60; // 60fps

      if (timePassed < timeInterval) return;
      timePrevious = timeNow - (timePassed % timeInterval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let allIdle = true;
      for (let i = 0; i < pixels.length; i++) {
        const pixel = pixels[i];
        pixel[fnName]();
        if (!pixel.isIdle) allIdle = false;
      }

      if (allIdle) {
        cancelAnimationFrame(animationRef);
      }
    };

    const handleAnimation = (name) => {
      cancelAnimationFrame(animationRef);
      timePrevious = performance.now();
      animationRef = requestAnimationFrame(() => doAnimate(name));
    };

    // Initialize when card becomes visible or resized
    const resizeObserver = new ResizeObserver(() => {
      initPixels();
    });
    resizeObserver.observe(card);

    // Hover listeners
    card.addEventListener('mouseenter', () => handleAnimation('appear'));
    card.addEventListener('mouseleave', () => handleAnimation('disappear'));
    card.addEventListener('focusin', () => handleAnimation('appear'));
    card.addEventListener('focusout', () => handleAnimation('disappear'));
  });
});

