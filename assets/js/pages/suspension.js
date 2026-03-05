/**
 * ASWHA RACING: SUSPENSION SUBSYSTEM
 * Vanilla JS | IntersectionObserver Animation Engine
 */

document.addEventListener("DOMContentLoaded", () => {

  // Observer options to trigger when 15% of the element is visible
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select all animateable components
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Unique HUD Observer (Threshold 0.3)
  const hudObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };

  const hudObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, hudObserverOptions);

  const hudSection = document.getElementById('kinematics-hud');
  if (hudSection) hudObserver.observe(hudSection);

  // ---------------------------------------------------------------------
  // CONTINUOUS SCROLL EFFECTS (Parallax)
  // ---------------------------------------------------------------------
  let lastKnownScrollPosition = 0;
  let ticking = false;

  const heroBg = document.querySelector('.susp-hero-bg');
  const floatingAnatomy = document.querySelector('.anatomy-img');

  function executeScrollEffects(scrollPos) {
    // Hero Parallax: Move background slightly slower than scroll
    if (heroBg && scrollPos < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrollPos * 0.4}px) scale(1.05)`;
    }

    // Floating Anatomy Image Parallax
    if (floatingAnatomy) {
      // Calculate position relative to container
      const rect = floatingAnatomy.getBoundingClientRect();
      // Only animate if in viewport
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Shift image Y-axis based on scroll percentage in viewport
        const offset = (window.innerHeight - rect.top) * 0.05;
        floatingAnatomy.style.transform = `translateY(${-offset}px)`;
      }
    }
  }

  window.addEventListener('scroll', () => {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        executeScrollEffects(lastKnownScrollPosition);
        ticking = false;
      });
      ticking = true;
    }
  });

  // ---------------------------------------------------------------------
  // INTERACTIVE SUSPENSION SPRING PHYSICS
  // ---------------------------------------------------------------------
  const springHandle = document.getElementById('spring-handle');
  const springPath = document.getElementById('spring-path');
  const springSvg = document.getElementById('interactive-spring');

  if (springHandle && springPath) {
    let isDragging = false;
    let startY = 0;

    // Spring physics state
    let currentY = 180; // Current height of the spring (pixels)
    let restY = 180; // Equilibrium height
    let velocity = 0;

    // Physics logic bounds
    const k = 0.15; // Spring stiffness
    const damp = 0.82; // Damping factor (friction)

    // Coils visual config
    const numCoils = 10;
    const coilWidth = 36;

    // Calculate and draw SVG path dynamically based on height stretch
    function drawSpring(height) {
      let d = `M 30,0 `;
      const coilHeight = height / numCoils;

      for (let i = 0; i < numCoils; i++) {
        const y1 = (i * coilHeight) + (coilHeight / 4);
        const y2 = (i * coilHeight) + (coilHeight * 3 / 4);
        const yEnd = (i + 1) * coilHeight;

        // Draw a coil zigzag
        d += `L ${30 - coilWidth / 2},${y1} `;
        d += `L ${30 + coilWidth / 2},${y2} `;
        d += `L 30,${yEnd} `;
      }
      springPath.setAttribute('d', d);
      springSvg.setAttribute('height', height);
    }

    // Harmonic Oscillator Math for Snap-back
    function animateSpring() {
      if (!isDragging) {
        // Hooke's Law: F = -k * x
        const force = -k * (currentY - restY);
        velocity += force;
        velocity *= damp; // Applied Friction
        currentY += velocity;

        drawSpring(currentY);

        // Continue oscillating until rested
        if (Math.abs(velocity) > 0.05 || Math.abs(currentY - restY) > 0.05) {
          requestAnimationFrame(animateSpring);
        } else {
          currentY = restY;
          drawSpring(currentY);
        }
      }
    }

    // Mouse/Touch Drag Events
    springHandle.addEventListener('pointerdown', (e) => {
      isDragging = true;
      startY = e.clientY - currentY;
      springHandle.style.cursor = 'grabbing';
      velocity = 0; // stop moving
      e.preventDefault(); // disable touch scroll weirdness
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging) return;

      let newY = e.clientY - startY;
      // Max compression / Extensio blocks
      if (newY < 60) newY = 60;
      if (newY > 450) newY = 450;

      currentY = newY;
      drawSpring(currentY);
    });

    window.addEventListener('pointerup', () => {
      if (isDragging) {
        isDragging = false;
        springHandle.style.cursor = 'grab';
        requestAnimationFrame(animateSpring); // Trigger Physics Snap
      }
    });

    // Initialize static spring shape
    drawSpring(currentY);
  }

  // ---------------------------------------------------------------------
  // CORNER SPRINGS MULTI-INSTANCE (Hooke's Law)
  // ---------------------------------------------------------------------
  function initDraggableSpringImage(containerId, imgId, pathIds) {
    const kineContainer = document.getElementById(containerId);
    const kineImg = document.getElementById(imgId);

    if (!kineContainer || !kineImg) return;

    const pathTL = document.getElementById(pathIds.tl);
    const pathTR = document.getElementById(pathIds.tr);
    const pathBL = document.getElementById(pathIds.bl);
    const pathBR = document.getElementById(pathIds.br);

    if (!pathTL || !pathTR || !pathBL || !pathBR) return;

    let isKDragging = false;
    let pStartX = 0; let pStartY = 0;

    let currentX = 0; let currentY = 0;
    let vX = 0; let vY = 0;

    let kContainerWidth = 0;
    let kContainerHeight = 0;

    const kCorner = 0.12;
    const dampCorner = 0.75;

    function drawCornerSpring(startX, startY, endX, endY, pathEl) {
      const dx = endX - startX;
      const dy = endY - startY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 5) {
        pathEl.setAttribute('d', '');
        return;
      }

      const numCoils = 6;
      const coilWidth = 12;
      const angle = Math.atan2(dy, dx);
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const segmentDist = dist / numCoils;

      let d = `M ${startX},${startY} `;
      for (let i = 0; i < numCoils; i++) {
        const p1Dist = i * segmentDist + segmentDist * 0.25;
        const p1X = startX + p1Dist * cos - coilWidth * sin;
        const p1Y = startY + p1Dist * sin + coilWidth * cos;

        const p2Dist = i * segmentDist + segmentDist * 0.75;
        const p2X = startX + p2Dist * cos + coilWidth * sin;
        const p2Y = startY + p2Dist * sin - coilWidth * cos;

        const endSegX = startX + (i + 1) * segmentDist * cos;
        const endSegY = startY + (i + 1) * segmentDist * sin;

        d += `L ${p1X},${p1Y} L ${p2X},${p2Y} L ${endSegX},${endSegY} `;
      }
      pathEl.setAttribute('d', d);
    }

    function updateCornerSprings() {
      if (!kContainerWidth) {
        kContainerWidth = kineContainer.offsetWidth;
        kContainerHeight = kineContainer.offsetHeight;
      }

      kineImg.style.transform = `translate(${currentX}px, ${currentY}px)`;

      drawCornerSpring(0, 0, currentX, currentY, pathTL);
      drawCornerSpring(kContainerWidth, 0, kContainerWidth + currentX, currentY, pathTR);
      drawCornerSpring(0, kContainerHeight, currentX, kContainerHeight + currentY, pathBL);
      drawCornerSpring(kContainerWidth, kContainerHeight, kContainerWidth + currentX, kContainerHeight + currentY, pathBR);
    }

    function animateCornerSprings() {
      if (!isKDragging) {
        const forceX = -kCorner * currentX;
        const forceY = -kCorner * currentY;

        vX += forceX;
        vY += forceY;
        vX *= dampCorner;
        vY *= dampCorner;
        currentX += vX;
        currentY += vY;

        updateCornerSprings();

        if (Math.abs(vX) > 0.1 || Math.abs(vY) > 0.1 || Math.abs(currentX) > 0.1 || Math.abs(currentY) > 0.1) {
          requestAnimationFrame(animateCornerSprings);
        } else {
          currentX = 0; currentY = 0;
          updateCornerSprings();
        }
      }
    }

    kineImg.addEventListener('pointerdown', (e) => {
      isKDragging = true;
      kContainerWidth = kineContainer.offsetWidth;
      kContainerHeight = kineContainer.offsetHeight;

      pStartX = e.clientX - currentX;
      pStartY = e.clientY - currentY;
      kineImg.style.cursor = 'grabbing';
      vX = 0; vY = 0;
      e.preventDefault();

      // Bring to front
      kineImg.style.zIndex = "20";
    });

    window.addEventListener('pointermove', (e) => {
      if (!isKDragging) return;
      currentX = e.clientX - pStartX;
      currentY = e.clientY - pStartY;

      const maxDist = 200;
      const dist = Math.sqrt(currentX * currentX + currentY * currentY);
      if (dist > maxDist) {
        const scale = maxDist / dist;
        currentX *= scale;
        currentY *= scale;
      }
      updateCornerSprings();
    });

    window.addEventListener('pointerup', () => {
      if (isKDragging) {
        isKDragging = false;
        kineImg.style.cursor = 'grab';
        kineImg.style.zIndex = "10";
        requestAnimationFrame(animateCornerSprings);
      }
    });

    window.addEventListener('resize', () => {
      kContainerWidth = kineContainer.offsetWidth;
      kContainerHeight = kineContainer.offsetHeight;
      updateCornerSprings();
    });

    updateCornerSprings();
  }

  // Initialize the springs for Section 3 (Kinematics)
  initDraggableSpringImage(
    'kine-spring-container',
    'draggable-kine-img',
    { tl: 'kine-path-tl', tr: 'kine-path-tr', bl: 'kine-path-bl', br: 'kine-path-br' }
  );

  // Initialize the springs for Section 4 (Teardown Anatomy)
  initDraggableSpringImage(
    'anatomy-spring-container',
    'draggable-anatomy-img',
    { tl: 'anatomy-path-tl', tr: 'anatomy-path-tr', bl: 'anatomy-path-bl', br: 'anatomy-path-br' }
  );

});
