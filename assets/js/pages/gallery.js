const galleryData = [
    {
        title: "RZ-XX5C Prototype",
        image: "XX5C",
        desc: "Our first prototype after 2021 to clear TI and run endurance at Formula Bharat 2025 achieving P2 for CDP"
    },
    {
        title: "RZ-XX6C Prototype",
        image: "XX6C",
        desc: "Improved iteration over the previous protoype, we achieved P2 in BPP and under top 5 teams for EDP @ Formula Bharat 2026, achieving P6 overall"
    },
    {
        title: "Hyperloop",
        image: "Hyperloop",
        desc: "Our first IRL prototype which went to Zurich 2024 hyperloop prototype foreshow"
    },
    {
        title: "P2 at CDP",
        image: "Costwin",
        desc: "Achived P2 in cost at Formula Bharat 2025"
    }
];
const grid = document.getElementById("galleryGrid");

/* CREATE ITEMS */

galleryData.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("gallery-item");

    div.innerHTML = `
        <img src="assets/images/gallery/${item.image}.webp" alt="${item.title}">
        <div class="gallery-overlay">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
        </div>
    `;

    grid.appendChild(div);
});

/* =========================
   MASONRY EFFECT
========================= */

function resizeGridItem(item) {
    const grid = document.querySelector(".gallery-grid");
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('gap'));

    const rowSpan = Math.ceil(
        (item.querySelector("img").getBoundingClientRect().height + rowGap) /
        (rowHeight + rowGap)
    );

    item.style.gridRowEnd = "span " + rowSpan;
}

function resizeAll() {
    const allItems = document.querySelectorAll(".gallery-item");
    allItems.forEach(item => {
        resizeGridItem(item);
    });
}

window.addEventListener("load", resizeAll);
window.addEventListener("resize", resizeAll);