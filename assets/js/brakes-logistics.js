const canvas = document.getElementById("rotor-canvas");
if (!canvas) console.error("Canvas #rotor-canvas not found");

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: "high-performance"
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.4));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); 

const camera = new THREE.PerspectiveCamera(
    52,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);
camera.position.set(0, 2, 25);

let model = null;

// GLTF load + geometry merge + wireframe conversion
new THREE.GLTFLoader().load(
    "assets/models/brakes_bg.glb",
    (gltf) => {
        const geometries = [];

        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                child.geometry.computeBoundsTree?.(); 
                geometries.push(child.geometry.clone());
            }
        });

        // Merge everything into ONE buffer geometry
        const merged = THREE.BufferGeometryUtils.mergeBufferGeometries(geometries, false);

        // Convert to line segments (real wireframe, minimal GPU load)
        const wireframe = new THREE.LineSegments(
            new THREE.WireframeGeometry(merged),
            new THREE.LineBasicMaterial({
                color: 0xbb2a2a,
                transparent: true,
                opacity: 0.55
            })
        );

        wireframe.position.set(0, 2, -250);
        wireframe.rotation.set(0.25, 0.45, 0);

        wireframe.frustumCulled = false;

        model = wireframe;
        scene.add(wireframe);

        console.log("Wireframe model loaded");
    }
);

renderer.setAnimationLoop(() => {
    if (model) {
        const t = performance.now() * 0.00025;
        model.rotation.x = t * 1.2;
        model.rotation.y = t * 2.1;
        model.rotation.z = t * 0.9;
    }

    renderer.render(scene, camera);
});

window.addEventListener("scroll", () => {
    const f = Math.min(window.scrollY / window.innerHeight, 2);
    camera.position.y = 1.5 - f * 0.15;
    camera.fov = 52 + f * 1.8;
    camera.updateProjectionMatrix();
}, { passive: true });

let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, 120);
});
