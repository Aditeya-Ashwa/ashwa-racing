/* ============================================================
   ASHWA RACING — it.js
   Three.js wireframe sphere (original code preserved exactly),
   terminal typewriter, scroll reveal, roadmap progress bars.
   ============================================================ */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

/* ════════════════════════════════════════════════════════════
   THREE.JS — original logic preserved, minor additions noted
════════════════════════════════════════════════════════════ */

const canvas = document.getElementById('it-hero-canvas');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 6;

// Main wireframe sphere
const geometry = new THREE.IcosahedronGeometry(2.5, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0xe63946,
  wireframe: true,
  opacity: 0.25,
  transparent: true
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Inner glowing sphere
const innerGeometry = new THREE.IcosahedronGeometry(2.3, 1);
const innerMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
  opacity: 0.15,
  transparent: true
});
const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
scene.add(innerSphere);

// Floating particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 150;
const positions = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 15;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
  color: 0x4d9fff,
  size: 0.03,
  transparent: true,
  opacity: 0.6,
  blending: THREE.AdditiveBlending
});
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Mouse interaction
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation loop
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();

  targetX = mouseX * 0.3;
  targetY = mouseY * 0.3;

  sphere.rotation.x = elapsedTime * 0.05 + targetY;
  sphere.rotation.y = elapsedTime * 0.08 + targetX;

  innerSphere.rotation.x = -elapsedTime * 0.03 - targetY * 0.5;
  innerSphere.rotation.y = -elapsedTime * 0.06 - targetX * 0.5;

  particles.rotation.y = elapsedTime * 0.02;
  particles.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;

  renderer.render(scene, camera);
}
animate();

// Responsive resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Scroll parallax — canvas moves with scroll
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  camera.position.y = scrollY * 0.001;
  sphere.position.y  = scrollY * 0.0005;
}, { passive: true });


/* ════════════════════════════════════════════════════════════
   TERMINAL TYPEWRITER
════════════════════════════════════════════════════════════ */

// Lines to type. Each entry: { type, text, delay }
// type: "cmd" | "out" | "blank" | "green" | "blue" | "yellow"
const TERMINAL_SCRIPT = [
  { type: 'cmd',    text: 'whoami',                      delay: 500  },
  { type: 'green',  text: 'ashwa-racing/it-subsystem',   delay: 40   },
  { type: 'blank',  text: '',                            delay: 280  },
  { type: 'cmd',    text: 'git log --oneline -4',        delay: 600  },
  { type: 'yellow', text: 'a3f91c2 launch: new website', delay: 30   },
  { type: 'yellow', text: 'b87e014 feat: blog engine',   delay: 30   },
  { type: 'yellow', text: '4d2c88a fix: mobile nav',     delay: 30   },
  { type: 'yellow', text: 'e019fac chore: deploy CI',    delay: 30   },
  { type: 'blank',  text: '',                            delay: 280  },
  { type: 'cmd',    text: 'npm run build',               delay: 700  },
  { type: 'out',    text: '> ashwa-racing@2.0.0 build',  delay: 40   },
  { type: 'out',    text: '> vite build --mode prod',    delay: 20   },
  { type: 'blank',  text: '',                            delay: 120  },
  { type: 'blue',   text: '✓  dist/index.html   2.1 kB', delay: 180  },
  { type: 'blue',   text: '✓  dist/assets/main  48 kB',  delay: 60   },
  { type: 'green',  text: '✓  built in 1.42s',           delay: 200  },
  { type: 'blank',  text: '',                            delay: 400  },
  { type: 'cmd',    text: 'git push origin main',        delay: 700  },
  { type: 'out',    text: 'Enumerating objects: 9...',   delay: 60   },
  { type: 'out',    text: 'Writing objects: 100%',       delay: 80   },
  { type: 'green',  text: 'main -> main  [deployed]',    delay: 300  },
];

// Character-by-character typing speed (ms per char)
const TYPE_SPEED = 28;

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function typeLine(containerEl, lineObj) {
  const row = document.createElement('div');
  row.classList.add('tl-row');

  if (lineObj.type === 'blank') {
    row.classList.add('tl-blank');
    containerEl.appendChild(row);
    return;
  }

  if (lineObj.type === 'cmd') {
    // Prompt
    const prompt = document.createElement('span');
    prompt.className = 'tl-prompt';
    prompt.textContent = '❯ ';
    row.appendChild(prompt);
  }

  const textNode = document.createElement('span');
  textNode.className = `tl-${lineObj.type}`;
  row.appendChild(textNode);
  containerEl.appendChild(row);

  // Type characters one by one
  for (const char of lineObj.text) {
    textNode.textContent += char;
    await sleep(TYPE_SPEED);
  }
}

async function runTerminal() {
  const body = document.getElementById('terminal-body');
  if (!body) return;

  for (const line of TERMINAL_SCRIPT) {
    await sleep(line.delay);
    await typeLine(body, line);
    // Auto-scroll terminal
    body.scrollTop = body.scrollHeight;
  }

  // Blinking cursor at the end
  const cursorRow = document.createElement('div');
  cursorRow.innerHTML = `<span class="tl-prompt">❯ </span><span class="cursor"></span>`;
  body.appendChild(cursorRow);
}

// Respect reduced-motion: show all lines instantly
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const body = document.getElementById('terminal-body');
  if (body) {
    TERMINAL_SCRIPT.forEach(line => {
      if (line.type === 'blank') {
        body.innerHTML += '<div class="tl-blank"></div>';
      } else {
        const prefix = line.type === 'cmd' ? '<span class="tl-prompt">❯ </span>' : '';
        body.innerHTML += `<div><${prefix}<span class="tl-${line.type}">${line.text}</span></div>`;
      }
    });
  }
} else {
  runTerminal();
}


/* ════════════════════════════════════════════════════════════
   SCROLL REVEAL
════════════════════════════════════════════════════════════ */

const revealObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    obs.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));


/* ════════════════════════════════════════════════════════════
   ROADMAP PROGRESS BARS
   Bars animate their fill width only when they scroll into view.
════════════════════════════════════════════════════════════ */

const barObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('animated');
    obs.unobserve(entry.target);
  });
}, { threshold: 0.3 });

document.querySelectorAll('.ri-bar-fill').forEach(bar => barObs.observe(bar));