/**
 * Shared Claude redesign footer.
 *
 * Injects the redesign footer with the same page-specific links Claude used.
 */
(function () {
  'use strict';

  const footerEl = document.querySelector('footer.site-footer');
  if (!footerEl) return;

  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const page = pathParts[pathParts.length - 1] || 'index.html';
  const isAbout = page === 'about.html';
  const isArabic = pathParts.includes('ar');

  const links = isArabic
    ? isAbout
      ? `
    <a href="index.html">الرئيسية</a>
    <a href="https://www.instagram.com/fo3s_squ" target="_blank">إنستغرام</a>
    <a href="https://github.com/FO3S-SQU" target="_blank">GitHub</a>
    <a href="mailto:fo3s@squ.edu.om">البريد</a>`
      : `
    <a href="https://www.instagram.com/fo3s_squ" target="_blank">إنستغرام</a>
    <a href="https://github.com/FO3S-SQU" target="_blank">GitHub</a>
    <a href="mailto:fo3s@squ.edu.om">البريد</a>
    <a href="about.html">من نحن</a>`
    : isAbout
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
  const footerText = isArabic
    ? 'جماعة البرمجيات الحرة ومفتوحة المصدر · جامعة السلطان قابوس'
    : 'Free &amp; Open Source Software Society · Sultan Qaboos University';
  const footerCopy = isArabic
    ? '© 2025 FO3S · جماعة البرمجيات الحرة'
    : '© 2025 FO3S';

  footerEl.innerHTML = `
  <div class="footer-logo">
    <img src="https://fo3s-squ.github.io/FO3S_WEBSITE/fo3s_logo-removebg-preview.png" alt="FO3S" />
    <span>${footerText}</span>
  </div>
  <div class="footer-links">${links}
  </div>
  <div class="footer-copy">${footerCopy}</div>`;
})();
