/* ===============================
   HEADER.JS (MERGED + FIXED)
   - Loads header.html + footer.html
   - Initializes sponsor animations
   - FIX: Marquee waits for image load → no empty gap
================================ */

/* ---------- LOAD HEADER ---------- */
fetch("components/header.html")
  .then(res => res.text())
  .then(data => {
      document.getElementById("main-header").innerHTML = data;

      // Initialize sponsor animations AFTER header loads
      initializeSponsors();
  });

/* ---------- LOAD FOOTER ---------- */
fetch("components/footer.html")
  .then(res => res.text())
  .then(data => {
      document.getElementById("main-footer").innerHTML = data;
  });

/* ---------- SPONSOR SYSTEM ---------- */
function initializeSponsors() {

    const SPONSOR_COUNT = 7;
    const SPONSOR_PATH = "assets/images/sponsors/";
    const ROTATE_INTERVAL = 3000;

    /* ----------------------------
       TOP RIGHT ROTATING SPONSOR
    ----------------------------- */
    let currentSponsor = 1;
    const rotatingImg = document.getElementById("top-rotating-sponsor");

    function rotateSponsor() {
        currentSponsor = (currentSponsor % SPONSOR_COUNT) + 1;
        if (rotatingImg) rotatingImg.src = `${SPONSOR_PATH}s${currentSponsor}.png`;
    }

    if (rotatingImg) setInterval(rotateSponsor, ROTATE_INTERVAL);


    /* ----------------------------
       INFINITE MARQUEE STRIP
    ----------------------------- */
    const track = document.getElementById("sponsor-track");

    function loadAllSponsors() {
        for (let i = 1; i <= SPONSOR_COUNT; i++) {
            const img = document.createElement("img");
            img.src = `${SPONSOR_PATH}s${i}.png`;
            img.className = "sponsor-logo";
            track.appendChild(img);
        }
    }

    if (track) {
        loadAllSponsors();
        loadAllSponsors(); // duplicate for infinite loop

        /* ---- FIX: Wait for images to load before animation starts ---- */
        const images = track.querySelectorAll("img");

        Promise.all(
            Array.from(images).map(img => {
                return new Promise(res => {
                    if (img.complete) res();
                    else img.onload = res;
                });
            })
        ).then(() => {
            track.classList.add("scroll-start"); // start animation only now
        });
    }


    /* ----------------------------
       INLINE FADE-IN SPONSOR BOX
    ----------------------------- */
    let inlineIndex = 1;
    const inlineImg = document.getElementById("inline-sponsor");

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
}