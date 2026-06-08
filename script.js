// Strength Polymer Industries — Main JS

document.addEventListener('DOMContentLoaded', () => {

  // Dynamic year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  // Contact form — builds a mailto link with all fields pre-filled
  const form = document.getElementById('inquiryForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name    = document.getElementById('fname').value.trim();
      const company = document.getElementById('fcompany').value.trim();
      const email   = document.getElementById('femail').value.trim();
      const phone   = document.getElementById('fphone').value.trim();
      const product = document.getElementById('fproduct').value;
      const message = document.getElementById('fmessage').value.trim();

      if (!name || !phone || !product || !message) {
        alert('Please fill all required fields (*).');
        return;
      }

      const subject = encodeURIComponent(`[SPI Inquiry] ${product} — ${name}`);
      const body = encodeURIComponent(
`Hello Maruti Pawar,

I am interested in your products and would like to place an inquiry.

━━━━━━━━━━━━━━━━━━━━━━━━
INQUIRY DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━
Name         : ${name}
Company      : ${company || 'N/A'}
Email        : ${email || 'N/A'}
Phone        : ${phone}
Product      : ${product}

Requirements:
${message}
━━━━━━━━━━━━━━━━━━━━━━━━

Please get in touch at your earliest convenience.

Thank you,
${name}
`
      );

      window.location.href = `mailto:strengthpolymer19@yahoo.com?subject=${subject}&body=${body}`;
    });
  }

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .industry-card, .client-card, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

});
