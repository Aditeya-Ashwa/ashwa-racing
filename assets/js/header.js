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

/* ==========================================================
   SPONSOR SYSTEM — SAFELY INITIALIZED, NO JUMPS, NO RESETS
========================================================== */

let sponsorsInitialized = false;

function initializeSponsors() {
    if (sponsorsInitialized) return;
    sponsorsInitialized = true;

    const SPONSOR_COUNT = 12;
    const SPONSOR_PATH = prefix + "assets/images/sponsors/";   /* <--- ONLY ADDED prefix */
    const ROTATE_INTERVAL = 2500;  
    const SCROLL_SPEED = 0.55;

    /* 1) TOP-RIGHT ROTATING SPONSOR */
    const rotatingImg = document.getElementById("top-rotating-sponsor");
    let currentSponsor = 1;

    function rotateTopSponsor() {
        currentSponsor = (currentSponsor % SPONSOR_COUNT) + 1;
        if (rotatingImg) rotatingImg.src = `${SPONSOR_PATH}s${currentSponsor}.png`;
    }

    if (rotatingImg) {
        rotateTopSponsor();
        setInterval(rotateTopSponsor, ROTATE_INTERVAL);
    }

    /* 2) INLINE CROSSFADE SPONSOR */
    const inlineImg = document.getElementById("inline-sponsor");
    let inlineIndex = 1;

    if (inlineImg) {
        inlineImg.src = `${SPONSOR_PATH}s1.png`;
        inlineImg.style.opacity = 1;

        function rotateInlineSponsor() {
            inlineImg.style.opacity = 0;
            setTimeout(() => {
                inlineIndex = (inlineIndex % SPONSOR_COUNT) + 1;
                inlineImg.src = `${SPONSOR_PATH}s${inlineIndex}.png`;
                inlineImg.style.opacity = 1;
            }, 500);
        }

        setInterval(rotateInlineSponsor, ROTATE_INTERVAL);
    }

    /* 3) CIRCULAR MARQUEE */
    const track = document.getElementById("sponsor-track");

    if (track) {
        if (track.children.length === 0) {
            for (let i = 1; i <= SPONSOR_COUNT; i += 2) {
                const img1 = document.createElement("img");
                img1.src = `${SPONSOR_PATH}s${i}.png`;
                img1.className = "sponsor-logo";
                track.appendChild(img1);

                const nextIndex = i + 1 > SPONSOR_COUNT ? 1 : i + 1;
                const img2 = document.createElement("img");
                img2.src = `${SPONSOR_PATH}s${nextIndex}.png`;
                img2.className = "sponsor-logo";
                track.appendChild(img2);
            }
        }

        let pos = 0;

        function scrollLoop() {
            pos -= SCROLL_SPEED;
            track.style.transform = `translateX(${pos}px)`;

            const first = track.children[0];
            const firstWidth = first.offsetWidth + 32;

            if (-pos >= firstWidth) {
                track.appendChild(first);
                pos += firstWidth;
            }

            requestAnimationFrame(scrollLoop);
        }

        const images = track.querySelectorAll("img");
        Promise.all(
            [...images].map(img => img.complete ? Promise.resolve() : new Promise(res => img.onload = res))
        ).then(() => {
            if (!track.classList.contains("scroll-start")) {
                track.classList.add("scroll-start");
                scrollLoop();
            }
        });
    }
}