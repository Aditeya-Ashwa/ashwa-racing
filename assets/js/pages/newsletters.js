
const basePDF = "assets/pdfs/newsletters/";
const baseIMG = "assets/images/newsletters/";

const files = [
  "2017-11-general.pdf",
  "2017-09-alumni.pdf",
  "2017-09-general.pdf",
  "2017-08-alumni.pdf",
  "2017-08-general.pdf",
  "2017-07-alumni.pdf",
  "2017-07-general.pdf",
  "2017-06-general.pdf",
  "2017-05-general.pdf",
  "2017-04-alumni.pdf",
  "2017-04-combustion.pdf",
  "2017-04-hybrid.pdf",
  "2017-02-alumni.pdf",
  "2017-02-combustion.pdf",
  "2017-02-hybrid.pdf",
  "2016-12-combustion.pdf",
  "2016-12-hybrid.pdf",
  "2016-11-alumni.pdf",
  "2016-11-combustion.pdf",
  "2016-11-hybrid.pdf",
  "2016-10-alumni.pdf",
  "2016-10-combustion.pdf",
  "2016-10-hybrid.pdf",
  "2016-09-alumni.pdf",
  "2016-09-combustion.pdf",
  "2016-09-hybrid.pdf",
  "2016-07-alumni.pdf",
  "2016-04-alumni.pdf",
  "2015-12-alumni.pdf",
  "2015-12-combustion.pdf",
  "2015-12-hybrid.pdf",
  "2015-11-alumni.pdf",
  "2015-11-combustion.pdf",
  "2015-11-hybrid.pdf",
  "2015-09-alumni.pdf",
  "2015-09-combustion.pdf",
  "2015-09-hybrid.pdf",
  "2015-04-hybrid.pdf",
  "2015-03-hybrid.pdf",
  "2015-02-hybrid.pdf",
  "2015-01-hybrid.pdf",
];

function getMonthName(m) {
  const months = [
    "", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[parseInt(m)];
}

function formatType(type) {
  if (type === "hybrid") return "Hybrid";
  if (type === "combustion") return "Combustion";
  if (type === "alumni") return "Alumni";
  return type;
}

const newsletters = files.map(file => {
  const [year, month, typeWithExt] = file.split("-");
  const type = typeWithExt.replace(".pdf", "");

  return {
    year,
    month,
    type,
    title: `${getMonthName(month)} ${year}`,
    cover: `${baseIMG}${year}/${year}-${month}.png`,
    pdf: `${basePDF}${year}/${file}`
  };
});

newsletters.sort((a, b) => {
  return `${b.year}${b.month}` - `${a.year}${a.month}`;
});

const list = document.getElementById("list");
const filterBar = document.getElementById("filter-bar");
const count = document.getElementById("count");
const empty = document.getElementById("empty");

const years = [...new Set(newsletters.map(n => n.year))]
  .sort((a, b) => b - a);

// inject year buttons
years.forEach(year => {
  const btn = document.createElement("button");
  btn.className = "blog-filter-btn";
  btn.dataset.year = year;
  btn.innerText = year;
  filterBar.appendChild(btn);
});

function render(data) {
  list.innerHTML = "";

  if (data.length === 0) {
    empty.hidden = false;
    count.innerText = "0 newsletters";
    return;
  }

  empty.hidden = true;
  count.innerText = `${data.length} newsletters`;

  // GROUP BY MONTH
  const grouped = {};

  data.forEach(n => {
    const key = `${n.year}-${n.month}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(n);
  });

  // RENDER GROUPS
  Object.values(grouped).forEach(group => {
    const first = group[0];

    const card = document.createElement("div");
    card.className = "blog-card";

    card.innerHTML = `
      <div class="blog-card-image">
        <img src="${first.cover}" alt="${first.title}">
      </div>

      <div class="blog-card-body">
        <span class="blog-card-date"></span>
        <h3 class="blog-card-title">
          ${getMonthName(first.month)} ${first.year}
        </h3>

        <div class="newsletter-types">
          ${group.map(n => `
            <button class="newsletter-btn" data-pdf="${n.pdf}">
              ${formatType(n.type)}
            </button>
          `).join("")}
        </div>
      </div>
    `;

    list.appendChild(card);

    requestAnimationFrame(() => {
      card.classList.add("visible");
    });
  });
}

filterBar.addEventListener("click", (e) => {
  if (!e.target.matches(".blog-filter-btn")) return;

  document.querySelectorAll(".blog-filter-btn")
    .forEach(btn => btn.classList.remove("active"));

  e.target.classList.add("active");

  const year = e.target.dataset.year;

  if (year === "all") {
    render(newsletters);
  } else {
    render(newsletters.filter(n => n.year === year));
  }
});

requestAnimationFrame(() => {
  card.classList.add("visible");
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".newsletter-btn")) {
    e.stopPropagation();
    window.open(e.target.dataset.pdf, "_blank");
  }
});

render(newsletters);