/* ============================================================
   OrganicByAI — Main JavaScript
   Circuit animation · Scroll reveal · Counters · Typing · Nav
   ============================================================ */

/* === CANVAS CIRCUIT ANIMATION === */
function initCircuit() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let nodes = [], raf;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    nodes = [];
    const n = Math.min(60, Math.floor((canvas.width * canvas.height) / 14000));
    for (let i = 0; i < n; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - .5) * .45,
        vy: (Math.random() - .5) * .45,
        r: Math.random() * 2 + 1
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
    });
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 130) {
          ctx.strokeStyle = `rgba(82,183,136,${(1 - dist/130) * .38})`;
          ctx.lineWidth = .8;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    nodes.forEach(n => {
      ctx.fillStyle = 'rgba(82,183,136,.65)';
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    });
    raf = requestAnimationFrame(draw);
  }

  resize(); draw();
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { cancelAnimationFrame(raf); resize(); draw(); }, 200);
  });
}

/* === SCROLL REVEAL === */
function initReveal() {
  const els = document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }});
  }, { threshold: .1, rootMargin: '0px 0px -48px 0px' });
  els.forEach(el => obs.observe(el));
}

/* === COUNTER ANIMATION === */
function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target  = parseInt(el.dataset.count);
      const suffix  = el.dataset.suffix || '';
      const dur = 2000, start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString() + suffix;
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: .5 });
  els.forEach(el => obs.observe(el));
}

/* === ANIMATED BAR FILLS === */
function initBars() {
  const bars = document.querySelectorAll('.stat-bar-fill, .bar-fill');
  if (!bars.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const w = e.target.dataset.width || '80';
      setTimeout(() => { e.target.style.width = w + '%'; }, 150);
      obs.unobserve(e.target);
    });
  }, { threshold: .5 });
  bars.forEach(b => obs.observe(b));
}

/* === TYPING EFFECT === */
function initTyping() {
  const el = document.getElementById('typingWord');
  if (!el) return;
  const words = ['Google','ChatGPT','Gemini','Perplexity','TikTok','YouTube Shorts','Instagram Reels','LinkedIn'];
  let wi = 0, ci = 0, deleting = false;
  function tick() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; setTimeout(tick, 1600); return; }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(tick, deleting ? 75 : 115);
  }
  tick();
}

/* === STICKY NAV === */
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* === MOBILE NAV === */
function initMobileNav() {
  const ham  = document.querySelector('.nav-hamburger');
  const mob  = document.querySelector('.nav-mobile');
  const cls  = document.querySelector('.nav-mobile-close');
  if (!ham || !mob) return;
  const open  = () => { mob.classList.add('open');  document.body.style.overflow = 'hidden'; };
  const close = () => { mob.classList.remove('open'); document.body.style.overflow = ''; };
  ham.addEventListener('click', open);
  if (cls) cls.addEventListener('click', close);
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
}

/* === FAQ ACCORDION === */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });
}

/* === SMOOTH SCROLL === */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

/* === 3D CARD TILT === */
function initTiltEffect() {
  const cards = document.querySelectorAll('.service-card, .svc-full-card, .blog-card, .why-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rotX = ((y - r.height / 2) / r.height) * -10;
      const rotY = ((x - r.width  / 2) / r.width)  *  10;
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-7px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* === CURSOR GLOW === */
function initCursorGlow() {
  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  document.body.appendChild(glow);
  let visible = false;
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
    if (!visible) { glow.style.opacity = '1'; visible = true; }
  });
  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; visible = false; });
}

/* === MAGNETIC BUTTONS === */
function initMagneticButtons() {
  document.querySelectorAll('.btn-primary, .btn-white').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width  / 2) * .2;
      const y = (e.clientY - r.top  - r.height / 2) * .2;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

/* === RIPPLE EFFECT === */
function initRippleEffect() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const r = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = (e.clientX - r.left) + 'px';
      ripple.style.top  = (e.clientY - r.top)  + 'px';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}

/* === CONTACT FORM === */
function initForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    if (!btn) return;
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      form.reset();
      setTimeout(() => { btn.textContent = 'Get Free Audit'; btn.disabled = false; }, 3500);
    }, 1400);
  });
}

/* === INIT === */
document.addEventListener('DOMContentLoaded', () => {
  initCircuit();
  initReveal();
  initCounters();
  initBars();
  initTyping();
  initNav();
  initMobileNav();
  initFAQ();
  initSmoothScroll();
  initForm();
  initTiltEffect();
  initCursorGlow();
  initMagneticButtons();
  initRippleEffect();
});
