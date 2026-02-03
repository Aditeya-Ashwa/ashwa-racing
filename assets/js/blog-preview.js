// =======================
// BLOG PREVIEW (HOMEPAGE)
// =======================

fetch('/assets/posts/index.json')
  .then(res => res.json())
  .then(posts => {
    const container = document.getElementById('blog-preview');
    if (!container) return;

    // Latest 3 posts
    posts.slice(0, 3).forEach(post => {
      const card = document.createElement('article');
      card.className = 'blog-preview-card';

      card.innerHTML = `
        <a href="/blog_post.html?slug=${post.slug}">
          <img src="${post.cover}" alt="${post.title}">
          <div class="blog-preview-content">
            <h3>${post.title}</h3>
            <p class="blog-preview-meta">
              ${post.date} · ${post.author}
            </p>
          </div>
        </a>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => console.error('Blog preview error:', err));
