"use strict";

fetch("assets/posts/index.json")
  .then(r => r.json())
  .then(posts => {
    const p = posts.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    if (!p) return;

    const card = document.getElementById("blog-card");
    const thumb = document.getElementById("blog-thumb");
    const title = document.getElementById("blog-title");
    const excerpt = document.getElementById("blog-excerpt");
    const date = document.getElementById("blog-date");

    if (card) card.href = `blog_post.html?slug=${encodeURIComponent(p.slug || "")}`;
    if (thumb) { thumb.src = p.cover || ""; thumb.alt = p.title || ""; }
    if (title) title.textContent = p.title || "";
    if (excerpt) excerpt.textContent = p.excerpt || "";
    if (date) date.textContent = p.date
      ? new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
      : "";
  })
  .catch(() => {}); // card stays hidden if fetch fails