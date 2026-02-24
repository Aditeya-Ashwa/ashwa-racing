// =======================
// BLOG PREVIEW (HOMEPAGE)
// =======================

fetch('/assets/posts/index.json')
  .then(res => res.json())
  .then(posts => {
    const container = document.getElementById('blog-preview');
    if (!container) return;

    // Ensure container has correct grid class
    container.classList.add('blog-grid');

    posts.slice(0, 3).forEach(post => {

      const card = document.createElement('a');
      card.href = `/blog_post.html?slug=${post.slug}`;
      card.className = 'blog-card';

      card.innerHTML = `
        <img src="${post.cover}" alt="${post.title}">
        <div class="blog-card-body">
          <div class="blog-card-meta">
            ${post.date} · ${post.author}
          </div>
          <h3>${post.title}</h3>
          <p>${post.excerpt ?? ''}</p>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => console.error('Blog preview error:', err));