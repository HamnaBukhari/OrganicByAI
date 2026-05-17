/* ============================================================
   OrganicByAI — Shared Head Elements + Header & Footer
   ============================================================ */

/* ---- SHARED HEAD INJECTION ---- */
(function () {
  const h = document.head;

  // Google Analytics
  const ga1 = document.createElement('script');
  ga1.async = true;
  ga1.src = 'https://www.googletagmanager.com/gtag/js?id=G-WTCB8VR45L';
  h.appendChild(ga1);
  const ga2 = document.createElement('script');
  ga2.textContent = 'window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","G-WTCB8VR45L");';
  h.appendChild(ga2);

  // Google Fonts
  const pc1 = document.createElement('link');
  pc1.rel = 'preconnect'; pc1.href = 'https://fonts.googleapis.com';
  h.appendChild(pc1);
  const pc2 = document.createElement('link');
  pc2.rel = 'preconnect'; pc2.href = 'https://fonts.gstatic.com'; pc2.crossOrigin = '';
  h.appendChild(pc2);
  const fonts = document.createElement('link');
  fonts.rel = 'stylesheet';
  fonts.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
  h.appendChild(fonts);
})();

/* ---- SHARED HEADER & FOOTER ---- */
(function () {
  const path = window.location.pathname;
  const inBlog = path.includes('/blog/');
  const root   = inBlog ? '../' : '';

  let active = 'home';
  if (path.includes('/services')) active = 'services';
  else if (path.includes('/about'))    active = 'about';
  else if (path.includes('/blog'))     active = 'blog';

  function a(page) { return active === page ? ' class="active"' : ''; }

  const svgLeaf = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`;

  const svgLinkedIn = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7H10v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`;
  const svgX        = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`;
  const svgTikTok   = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34l-.03-8.47a8.28 8.28 0 0 0 4.84 1.56V5.03a4.85 4.85 0 0 1-1.04-.34z"/></svg>`;
  const svgYouTube  = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0A1F12"/></svg>`;
  const svgMail     = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;flex-shrink:0;position:relative;top:-1px"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`;
  const svgClose    = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

  /* ---- HEADER ---- */
  const header = `
<nav class="nav">
  <div class="container">
    <div class="nav-inner">
      <a href="${root}index.html" class="nav-logo">
        <img src="${root}assets/images/logo.png" alt="OrganicByAI" class="nav-logo-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <span class="nav-logo-fallback" style="display:none">
          <div class="nav-logo-icon" style="color:#fff">${svgLeaf}</div>
          <span class="nav-logo-text">organicby<span>ai</span></span>
        </span>
      </a>
      <ul class="nav-links">
        <li><a href="${root}index.html"${a('home')}>Home</a></li>
        <li><a href="${root}services.html"${a('services')}>Services</a></li>
        <li><a href="${root}about.html"${a('about')}>About</a></li>
        <li><a href="${root}blog/index.html"${a('blog')}>Blog</a></li>
      </ul>
      <div class="nav-actions">
        <a href="mailto:umarfwork@gmail.com" class="btn btn-primary btn-sm">Get in Touch</a>
        <button class="nav-hamburger" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </div>
</nav>
<div class="nav-mobile">
  <button class="nav-mobile-close" aria-label="Close menu">${svgClose}</button>
  <a href="${root}index.html">Home</a>
  <a href="${root}services.html">Services</a>
  <a href="${root}about.html">About</a>
  <a href="${root}blog/index.html">Blog</a>
  <a href="mailto:umarfwork@gmail.com" class="btn btn-primary" style="margin-top:12px">Get in Touch</a>
</div>`;

  /* ---- FOOTER ---- */
  const footer = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="${root}index.html" class="nav-logo">
          <img src="${root}assets/images/logo.png" alt="OrganicByAI" class="nav-logo-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <span class="nav-logo-fallback" style="display:none">
            <div class="nav-logo-icon" style="color:#fff">${svgLeaf}</div>
            <span class="nav-logo-text">organicby<span>ai</span></span>
          </span>
        </a>
        <p>AI-powered organic growth for businesses that want more visibility, traffic, and leads — without depending on paid ads.</p>
        <div class="footer-socials">
          <a href="#" class="social-btn" aria-label="LinkedIn">${svgLinkedIn}</a>
          <a href="#" class="social-btn" aria-label="X / Twitter">${svgX}</a>
          <a href="#" class="social-btn" aria-label="TikTok">${svgTikTok}</a>
          <a href="#" class="social-btn" aria-label="YouTube">${svgYouTube}</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul class="footer-links">
          <li><a href="${root}services.html#ai-seo">AI SEO Strategy</a></li>
          <li><a href="${root}services.html#geo">GEO / AI Search</a></li>
          <li><a href="${root}services.html#aeo">Answer Engine Opt.</a></li>
          <li><a href="${root}services.html#blog-content">AI Blog Content</a></li>
          <li><a href="${root}services.html#ugc-videos">AI UGC Videos</a></li>
          <li><a href="${root}services.html#local-seo">Local SEO</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul class="footer-links">
          <li><a href="${root}about.html">About Us</a></li>
          <li><a href="${root}services.html">All Services</a></li>
          <li><a href="${root}blog/index.html">Blog</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul class="footer-links">
          <li><a href="mailto:umarfwork@gmail.com" style="display:inline-flex;align-items:center;gap:6px">${svgMail} umarfwork@gmail.com</a></li>
        </ul>
        <div style="margin-top:20px">
          <a href="mailto:umarfwork@gmail.com" class="btn btn-primary btn-sm">Get in Touch</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 OrganicByAI. All rights reserved.</p>
      <p>Organic Growth, Powered by AI</p>
    </div>
  </div>
</footer>`;

  /* ---- INJECT ---- */
  const navEl    = document.getElementById('nav-container');
  const footerEl = document.getElementById('footer-container');
  if (navEl)    navEl.innerHTML    = header;
  if (footerEl) footerEl.innerHTML = footer;
})();
