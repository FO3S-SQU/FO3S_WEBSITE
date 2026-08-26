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

  const page = window.location.pathname.split('/').pop() || 'index.html';
  const isAbout = page === 'about.html';

  headerEl.innerHTML = isAbout
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
    <button class="nav-lang" title="Switch to Arabic">ع</button>
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
    <button class="nav-lang" title="Switch to Arabic">ع</button>
    <a href="#join" class="btn-join-nav">Join us ↗</a>
  </div>
</nav>`;
})();
