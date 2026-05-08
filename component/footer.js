// Footer component
// Injects the shared footer into the empty <footer> placeholder on every page.
(function () {
    'use strict';

    const footerEl = document.querySelector('footer');
    if (!footerEl) return;

    footerEl.className = 'footer_container';

    footerEl.innerHTML = `
        <div class="footer_main_content">
            <div class="footer_brand footer_left">
                <h3 id="footer-brand">Free and Open Source Software Society</h3>
            </div>

            <div class="footer_nav_group footer_center">
                <div class="footer_links">
                    <a href="https://www.instagram.com/fo3s_squ" class="social-link" aria-label="FO3S on Instagram">
                        <i class="fab fa-instagram" aria-hidden="true"></i>
                        <span id="footer-ig">Instagram</span>
                    </a>
                    <a href="https://github.com/FO3S-SQU" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="FO3S on GitHub">
                        <i class="fab fa-github" aria-hidden="true"></i>
                        <span id="footer-github">GitHub</span>
                    </a>
                    <a href="mailto:fo3s@squ.edu.om" class="social-link" aria-label="Email FO3S">
                        <i class="fas fa-envelope" aria-hidden="true"></i>
                        <span id="footer-mail">Email</span>
                    </a>
                </div>
            </div>

            <div class="footer_right">
                <a href="about.html">
                    <button id="footer-join" class="join_btn">Join Us</button>
                </a>
            </div>
        </div>

        <div class="footer_copyright" id="footer-copy">
            <span id="copyright-year"></span> &copy; FO3S
        </div>
    `;

    // Set copyright year now that the element exists
    const yearEl = footerEl.querySelector('#copyright-year');
    if (yearEl) yearEl.innerText = new Date().getFullYear();
})();