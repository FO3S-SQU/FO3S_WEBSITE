/**
 * Shared Claude redesign navigation.
 *
 * Injects the same nav markup used by the redesign output, with page-specific
 * links for home vs about.
 */
(function () {
  'use strict';

  const headerEl = document.querySelector('header.site-header');
  if (!headerEl) return;

  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const page = pathParts[pathParts.length - 1] || 'index.html';
  const isAbout = page === 'about.html';
  const isArabic = pathParts.includes('ar');

  const langHref = isArabic
    ? (isAbout ? '../about.html' : '../index.html')
    : (isAbout ? 'ar/about.html' : 'ar/index.html');
  const langLabel = isArabic ? 'EN' : 'AR';
  const langTitle = isArabic ? 'Switch to English' : 'Switch to Arabic';

  headerEl.innerHTML = isArabic
    ? isAbout
      ? `
<nav>
  <a href="index.html" class="nav-logo">
    <img src="https://fo3s-squ.github.io/FO3S_WEBSITE/fo3s_logo-removebg-preview.png" alt="شعار FO3S" />
    <div>
      <span class="nav-logo-text">FO3S</span>
      <span class="nav-logo-sub">جامعة السلطان قابوس</span>
    </div>
  </a>
  <div class="nav-links">
    <a href="index.html">الرئيسية</a>
    <a href="about.html" class="active">من نحن</a>
    <a href="index.html#freedoms">ما هي FOSS</a>
    <a href="index.html#events">الفعاليات</a>
    <a href="index.html#projects">المشاريع</a>
    <a class="nav-lang" href="${langHref}" title="${langTitle}">${langLabel}</a>
    <a href="index.html#join" class="btn-join-nav">انضم إلينا ↗</a>
  </div>
</nav>`
      : `
<nav>
  <a href="#home" class="nav-logo">
    <img src="https://fo3s-squ.github.io/FO3S_WEBSITE/fo3s_logo-removebg-preview.png" alt="شعار FO3S" />
    <div>
      <span class="nav-logo-text">FO3S</span>
      <span class="nav-logo-sub">جامعة السلطان قابوس</span>
    </div>
  </a>
  <div class="nav-links">
    <a href="#about">من نحن</a>
    <a href="#freedoms">ما هي FOSS</a>
    <a href="#events">الفعاليات</a>
    <a href="#projects">المشاريع</a>
    <a class="nav-lang" href="${langHref}" title="${langTitle}">${langLabel}</a>
    <a href="#join" class="btn-join-nav">انضم إلينا ↗</a>
  </div>
</nav>`
    : isAbout
    ? `
<nav>
  <a href="index.html" class="nav-logo">
    <img src="https://fo3s-squ.github.io/FO3S_WEBSITE/fo3s_logo-removebg-preview.png" alt="FO3S logo" />
    <div>
      <span class="nav-logo-text">FO3S</span>
      <span class="nav-logo-sub">Sultan Qaboos University</span>
    </div>
  </a>
  <div class="nav-links">
    <a href="index.html">Home</a>
    <a href="about.html" class="active">About</a>
    <a href="index.html#freedoms">What is FOSS</a>
    <a href="index.html#events">Events</a>
    <a href="index.html#projects">Projects</a>
    <a class="nav-lang" href="${langHref}" title="${langTitle}">${langLabel}</a>
    <a href="index.html#join" class="btn-join-nav">Join us ↗</a>
  </div>
</nav>`
    : `
<nav>
  <a href="#home" class="nav-logo">
    <img src="https://fo3s-squ.github.io/FO3S_WEBSITE/fo3s_logo-removebg-preview.png" alt="FO3S logo" />
    <div>
      <span class="nav-logo-text">FO3S</span>
      <span class="nav-logo-sub">Sultan Qaboos University</span>
    </div>
  </a>
  <div class="nav-links">
    <a href="#about">About</a>
    <a href="#freedoms">What is FOSS</a>
    <a href="#events">Events</a>
    <a href="#projects">Projects</a>
    <a class="nav-lang" href="${langHref}" title="${langTitle}">${langLabel}</a>
    <a href="#join" class="btn-join-nav">Join us ↗</a>
  </div>
</nav>`;
})();
