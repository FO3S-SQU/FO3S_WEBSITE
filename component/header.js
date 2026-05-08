/**
 * header.js — Shared header component
 *
 * Injects the site header into every page automatically.
 * Loaded with `defer` in <head>, so it runs after DOM parse
 * but before script.js (order is preserved with defer).
 */
(function () {
    'use strict';

    const headerEl = document.querySelector('header');
    if (!headerEl) return;

    // Determine current page for active-link highlighting
    const page = window.location.pathname.split('/').pop() || 'index.html';

    headerEl.innerHTML = `
        <nav>
            <a class="logo" href="index.html">
                <img src="assets/images/fo3s-logo.png" alt="FO3S Logo">
            </a>

            <ul class="nav-links">
                <li><a href="index.html"                   id="nav-home">Home</a></li>
                <li><a href="about.html"                   id="nav-about">About</a></li>
                <li><a href="index.html#upcoming_events"   id="nav-events">Events</a></li>
            </ul>

            <div class="nav-right">
                <div class="lang-switcher" role="group" aria-label="Language selection">
                    <button class="lang-btn" data-lang="ar">\uD83C\uDDF4\uD83C\uDDF2 AR</button>
                    <button class="lang-btn" data-lang="en">\uD83C\uDDEC\uD83C\uDDE7 EN</button>
                </div>

                <button class="nav-toggle" aria-label="Open navigation menu" aria-expanded="false">
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                </button>
            </div>
        </nav>
    `;

    // ── Active link highlight ──────────────────────────────────────────────
    const activeId = page === 'about.html' ? 'nav-about' : 'nav-home';
    const activeLink = document.getElementById(activeId);
    if (activeLink) activeLink.classList.add('nav-active');

    // ── Hamburger toggle ──────────────────────────────────────────────────
    const navToggle = headerEl.querySelector('.nav-toggle');
    const navLinks  = headerEl.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.classList.toggle('is-open', isOpen);
    });

    // Close on any link click (important for mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close when clicking outside the header
    document.addEventListener('click', (e) => {
        if (!headerEl.contains(e.target)) closeMenu();
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    function closeMenu() {
        navLinks.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('is-open');
    }
})();