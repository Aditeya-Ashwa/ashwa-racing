/* ===============================
   HEADER.JS (CLEAN + MERGED)
   - Loads header + footer
   - Initializes sponsor system safely ONCE
   - Prevents marquee double-start bug
   - Fixes mobile close button
================================ */

/* ------ REAL FIX: detect path AFTER 'ashwa-racing' ------ */
const fullPath = window.location.pathname;
const base = "/ashwa-racing/";

// everything after /ashwa-racing/
const afterBase = fullPath.replace(base, "");

// count folders after project root
const depth = afterBase === "" ? 0 : afterBase.split("/").length - 1;

// build prefix
let prefix = "";
for (let i = 0; i < depth; i++) prefix += "../";

/* ---------- LOAD HEADER ---------- */
fetch(prefix + "components/header.html")
  .then(res => res.text())
  .then(data => {
      document.getElementById("main-header").innerHTML = data;

      // Initialize all sponsor animations safely
      initializeSponsors();

      // Mobile X close button logic
      const closeBtn = document.getElementById("mobileClose");
      const navToggle = document.getElementById("nav-toggle");
      if (closeBtn && navToggle) {
          closeBtn.addEventListener("click", () => {
              navToggle.checked = false;
          });
      }
  });

/* ---------- LOAD FOOTER ---------- */
fetch(prefix + "components/footer.html")
  .then(res => res.text())
  .then(data => {
      document.getElementById("main-footer").innerHTML = data;
  });

let sponsorsInitialized = false;

async function initializeSponsors() {
    if (sponsorsInitialized) return;
    sponsorsInitialized = true;

    const SPONSOR_PATH = prefix + "assets/images/sponsors/";
    const ROTATE_INTERVAL = 2500;
    const SCROLL_SPEED = 0.55;

    // Load manifest
    const manifest = await fetch(SPONSOR_PATH + "manifest.json").then(res => res.json());
    const sponsorList = manifest.sponsors;
    const SPONSOR_COUNT = sponsorList.length;

    /* 1) TOP-RIGHT ROTATING SPONSOR */
    let currentSponsor = 0;
    const rotatingImg = document.getElementById("top-rotating-sponsor");

    function rotateTopSponsor() {
        currentSponsor = (currentSponsor + 1) % SPONSOR_COUNT;
        if (rotatingImg) rotatingImg.src = SPONSOR_PATH + sponsorList[currentSponsor];
    }

    if (rotatingImg) {
        rotateTopSponsor();
        setInterval(rotateTopSponsor, ROTATE_INTERVAL);
    }

    /* 2) INLINE CROSSFADE SPONSOR */
    const inlineImg = document.getElementById("inline-sponsor");
    let inlineIndex = 0;

    if (inlineImg) {
        inlineImg.src = SPONSOR_PATH + sponsorList[0];
        inlineImg.style.opacity = 1;

        function rotateInlineSponsor() {
            inlineImg.style.opacity = 0;
            setTimeout(() => {
                inlineIndex = (inlineIndex + 1) % SPONSOR_COUNT;
                inlineImg.src = SPONSOR_PATH + sponsorList[inlineIndex];
                inlineImg.style.opacity = 1;
            }, 500);
        }

        setInterval(rotateInlineSponsor, ROTATE_INTERVAL);
    }

    /* 3) ULTRA-SMOOTH MARQUEE */
    const track = document.getElementById("sponsor-track");

    if (track) {

        // Prevent double init
        if (track.dataset.initialized) return;
        track.dataset.initialized = "true";

        // Populate once
        sponsorList.forEach(name => {
            const img = document.createElement("img");
            img.src = SPONSOR_PATH + name;
            img.className = "sponsor-logo";
            track.appendChild(img);
        });

        // Duplicate content for seamless loop
        track.innerHTML += track.innerHTML;

        let pos = 0;
        const SPEED = 0.6;

        function animate() {
            pos -= SPEED;

            const halfWidth = track.scrollWidth / 2;

            if (Math.abs(pos) >= halfWidth) {
                pos = 0; // clean reset
            }

            track.style.transform = `translate3d(${pos}px, 0, 0)`;
            requestAnimationFrame(animate);
        }

        // Wait until all images are decoded
        const images = track.querySelectorAll("img");

        Promise.all(
            [...images].map(img =>
                img.decode ? img.decode().catch(() => {}) :
                new Promise(res => img.complete ? res() : img.onload = res)
            )
        ).then(() => {
            animate();
        });
    }
}
