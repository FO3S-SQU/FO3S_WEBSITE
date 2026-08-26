/**
 * Shared Claude redesign footer.
 *
 * Injects the redesign footer with the same page-specific links Claude used.
 */
(function () {
  'use strict';

  const footerEl = document.querySelector('footer.site-footer');
  if (!footerEl) return;

  const page = window.location.pathname.split('/').pop() || 'index.html';
  const isAbout = page === 'about.html';

  const links = isAbout
    ? `
    <a href="index.html">Home</a>
    <a href="https://www.instagram.com/fo3s_squ" target="_blank">Instagram</a>
    <a href="https://github.com/FO3S-SQU" target="_blank">GitHub</a>
    <a href="mailto:fo3s@squ.edu.om">Email</a>`
    : `
    <a href="https://www.instagram.com/fo3s_squ" target="_blank">Instagram</a>
    <a href="https://github.com/FO3S-SQU" target="_blank">GitHub</a>
    <a href="mailto:fo3s@squ.edu.om">Email</a>
    <a href="about.html">About</a>`;

  footerEl.innerHTML = `
  <div class="footer-logo">
    <img src="https://fo3s-squ.github.io/FO3S_WEBSITE/fo3s_logo-removebg-preview.png" alt="FO3S" />
    <span>Free &amp; Open Source Software Society · Sultan Qaboos University</span>
  </div>
  <div class="footer-links">${links}
  </div>
  <div class="footer-copy">© 2025 FO3S · جماعة البرمجيات الحرة</div>`;
})();
