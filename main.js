/* ═══════════════════════════════════════════
   STRENGTH POLYMER INDUSTRIES — main.js
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Dynamic Year ──
  document.querySelectorAll('.footer-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // ── Navbar Scroll ──
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // ── Hamburger ──
  const burger = document.querySelector('.hamburger');
  const menu   = document.querySelector('.nav-menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      menu.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
  }

  // ── Active nav link ──
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  // ── Scroll-reveal (Intersection Observer) ──
  const revealEls = document.querySelectorAll(
    '.reveal, .product-card, .industry-card, .client-card, .stat-box, .info-card-c, .val-card, .team-photo-wrap'
  );
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(26px)';
    el.style.transition = `opacity .6s ease ${i * 0.07}s, transform .6s ease ${i * 0.07}s`;
    io.observe(el);
  });
  document.addEventListener('scroll', () => {}, { passive: true });

  // ── Revealed class adds styles ──
  const style = document.createElement('style');
  style.textContent = `.revealed { opacity: 1 !important; transform: none !important; }`;
  document.head.appendChild(style);

  // ── Contact Form → mailto ──
  const form = document.getElementById('inquiryForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const v = id => document.getElementById(id)?.value.trim() || '';
      const name    = v('fname');
      const company = v('fcompany');
      const email   = v('femail');
      const phone   = v('fphone');
      const product = v('fproduct');
      const qty     = v('fqty');
      const message = v('fmessage');
      if (!name || !phone || !product || !message) {
        alert('Please fill all required (*) fields.'); return;
      }
      const subject = encodeURIComponent(`[SPI Inquiry] ${product} — ${name}`);
      const body = encodeURIComponent(
`Namaste,

I would like to inquire about your rubber products.

──────────────────────────────
  INQUIRY DETAILS
──────────────────────────────
  Name         : ${name}
  Company      : ${company || 'N/A'}
  Email        : ${email   || 'N/A'}
  Phone        : ${phone}
  Product      : ${product}
  Quantity     : ${qty     || 'N/A'}

  Requirements:
  ${message}
──────────────────────────────

Please revert at your earliest convenience.

Regards,
${name}
`);
      window.location.href = `mailto:strengthpolymer19@yahoo.com?subject=${subject}&body=${body}`;
    });
  }

});
