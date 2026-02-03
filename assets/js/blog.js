const isPostPage = window.location.pathname.includes('blog_post.html');

// =======================
// BLOG LIST
// =======================
if (!isPostPage) {
  fetch('/assets/posts/index.json')
    .then(res => res.json())
    .then(posts => {
      const container = document.getElementById('blog-list');

      posts.forEach(post => {
        const card = document.createElement('article');
        card.className = 'blog-card';

        card.innerHTML = `
          <a href="/blog_post.html?slug=${post.slug}">
            <img src="${post.cover}" alt="${post.title}">
            <h2>${post.title}</h2>
            <p>${post.date} · ${post.author}</p>
          </a>
        `;

        container.appendChild(card);
      });
    });
}

// =======================
// SINGLE POST
// =======================
if (isPostPage) {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');

  fetch(`/assets/posts/${slug}.md`)
    .then(res => res.text())
    .then(md => {
      document.getElementById('post-content').innerHTML =
        marked.parse(md);
    });
}
