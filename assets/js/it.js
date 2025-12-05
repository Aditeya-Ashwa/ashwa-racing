import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

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

// Create main wireframe sphere
const geometry = new THREE.IcosahedronGeometry(2.5, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0xe63946,
  wireframe: true,
  opacity: 0.25,
  transparent: true
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Create inner glowing sphere
const innerGeometry = new THREE.IcosahedronGeometry(2.3, 1);
const innerMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
  opacity: 0.15,
  transparent: true
});

const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
scene.add(innerSphere);

// Add floating particles
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

  // Smooth mouse following
  targetX = mouseX * 0.3;
  targetY = mouseY * 0.3;

  // Rotate spheres
  sphere.rotation.x = elapsedTime * 0.05 + targetY;
  sphere.rotation.y = elapsedTime * 0.08 + targetX;
  
  innerSphere.rotation.x = -elapsedTime * 0.03 - targetY * 0.5;
  innerSphere.rotation.y = -elapsedTime * 0.06 - targetX * 0.5;

  // Rotate particles
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

// Scroll parallax effect
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  camera.position.y = scrollY * 0.001;
  sphere.position.y = scrollY * 0.0005;
});
