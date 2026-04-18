const counters = document.querySelectorAll('h2[id$="_count"]');// Select all h2 elements with IDs ending with '_count'

const animateCount = (element) => {
    const target = +element.getAttribute('data-target');// the plus sign converts the string to a number
    let currentCount = 0;
    
    const update = () => {
        let increment = target / 60;
        
        if (currentCount > target * 0.9) {
            increment = target / 600; //slower increment for the last 10%
        }

        currentCount += increment;

        element.innerText = Math.floor(currentCount);

        if (currentCount < target) {
            window.requestAnimationFrame(update);//This what makes incremnt by calling update again and again
        } else {
            element.innerText = target;
        }
    };

    window.requestAnimationFrame(update);
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {// Check if the element is in the viewport
            animateCount(entry.target);//If it is, start the animation
        } else {
            entry.target.innerText = "0"; // Reset the count when out of view
        }
    });
}, { threshold: 0.2 });// Incremnt when 20% of the element is visible

counters.forEach(counter => observer.observe(counter));// Observe each counter element

//--- end of the counter animation code ---


//--- end of the form submission code ---

// the modal code starts below
const modal = document.getElementById('ideaModal');
const closeBtn = document.querySelector('.close-btn');

function openModal() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Stop the background from scrolling
}


function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
    status.innerText = ""; // Clear status when closing
}



// Close when clicking the 'X'
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
    
}

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

//No need for event listener for openModal since it's called directly from HTML
//--- end of the modal code ---



// The slideshow code starts below

document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.c-slide');
    let currentSlide = 0;
    const slideInterval = 4000; // Changes every 4 seconds

    function nextSlide() {
        //  remove 'active' from current slide
        slides[currentSlide].classList.remove('active');
        
        // move to next index (or back to 0 if at the end)
        currentSlide = (currentSlide + 1) % slides.length;
        
        //  Add 'active' to the new slide
        slides[currentSlide].classList.add('active');
    }

    
    setInterval(nextSlide, slideInterval);
});

//--- end of the slideshow code ---






// 1. TRANSLATION DICTIONARY
copyRight = `${new Date().getFullYear()} © FO3S`;
const translations = {
    en: {
        navHome: "Home", 
        navAbout: "About", 
        navEvents: "Events", 
        navContact: "Contact",
        heroSubtitle: "LEARN TO CODE, CODE TO LEARN",
        heroTitle: "Welcome to the Free and <br> Open Source Software Society",
        heroBtn: "Join Us",
        labelMembers: "Members", 
        labelEvents: "Events Hosted",
        titleEvents: "Upcoming Events",
        eventEmptyTitle: "We're currently brainstorming!",
        eventEmptyP: "Have an idea for a special event? Share it with us!",
        eventBtn: "Suggest an Idea",
        titleProjects: "Members Projects",
        inviteTitle: "Fill our projects section with your creative projects",
        inviteP: "Built something cool? Share your GitHub link!",
        inviteBtn: "Submit Project",
        footerBrand: "Free and Open Source Software Society",
        footerJoin: "Join Us", 
        footerCopy: copyRight,
        // Modal
        modalTitle: "Suggest an Event",
        placeholderEmail: "Your Email",
        placeholderTopic: "Proposed Topic",
        placeholderDesc: "Describe the idea...",
        modalSubmit: "Submit Idea"

    },
    ar: {
        navHome: "الرئيسية", 
        navAbout: "من نحن", 
        navEvents: "الفعاليات", 
        navContact: "تواصل معنا",
        heroSubtitle: "نتعلم لنبرمج، نبرمج لنتعلم",
        heroTitle: "مرحباً بكم في جماعة <br> البرمجيات الحرة والمفتوحة المصدر",
        heroBtn: "انضم إلينا",
        labelMembers: "الأعضاء", 
        labelEvents: "فعالية مستضافة",
        titleEvents: "الفعاليات القادمة",
        eventEmptyTitle: "نحن في مرحلة العصف الذهني حالياً!",
        eventEmptyP: "هل لديك فكرة لفعالية مميزة؟ شاركنا فكرتك.",
        eventBtn: "اقترح فكرة",
        titleProjects: "مشاريع الأعضاء",
        inviteTitle: "املأ قسم المشاريع بإبداعاتك الخاصة",
        inviteP: "شاركنا مشروعك عبر رابط GitHub!",
        inviteBtn: "إرسال المشروع",
        footerBrand: "جماعة البرمجيات الحرة والمفتوحة المصدر",
        footerJoin: "انضم إلينا", 
        footerCopy: copyRight,
        // Modal
        modalTitle: "اقترح فعالية",
        placeholderEmail: "بريدك الإلكتروني",
        placeholderTopic: "الموضوع المقترح",
        placeholderDesc: "صف الفكرة...",
        modalSubmit: "إرسال الفكرة"
    }
};

const languageToggle = document.getElementById('language_toggle');

languageToggle.addEventListener('change', () => {
    const lang = languageToggle.checked ? 'en' : 'ar';
    updateLanguage(lang);
});

function updateLanguage(lang) {
    document.body.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    const t = translations[lang];

    // Helper function to update elements safely without crashing
    const setEl = (id, val, isHTML = false) => {
        const el = document.getElementById(id);
        if (el) {
            // Check if it's an input field for placeholder translation
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = val;
            } else if (isHTML) {
                el.innerHTML = val;
            } else {
                el.innerText = val;
            }
        }
    };

    // Navigation & Hero
    setEl('nav-home', t.navHome);
    setEl('nav-about', t.navAbout);
    setEl('nav-events', t.navEvents);
    setEl('nav-contact', t.navContact);
    setEl('hero-subtitle', t.heroSubtitle);
    setEl('hero-title', t.heroTitle, true);
    setEl('hero-btn', t.heroBtn);

    // Stats & Content
    setEl('label-members', t.labelMembers);
    setEl('label-events', t.labelEvents);
    setEl('title-events', t.titleEvents);
    setEl('event-empty-title', t.eventEmptyTitle);
    setEl('event-empty-p', t.eventEmptyP);
    setEl('event-btn', t.eventBtn);
    setEl('title-projects', t.titleProjects);
    setEl('invite-title', t.inviteTitle);
    setEl('invite-p', t.inviteP);
    setEl('invite-btn', t.inviteBtn);
    
    // Footer
    setEl('footer-brand', t.footerBrand);
    setEl('footer-join', t.footerJoin);
    setEl('footer-copy', t.footerCopy);

    // Modal Text & Placeholders
    setEl('modal-title', t.modalTitle);
    setEl('submit_idea_btn', t.modalSubmit);
    setEl('userEmail', t.placeholderEmail);
    setEl('eventTopic', t.placeholderTopic);
    setEl('eventDesc', t.placeholderDesc);

    localStorage.setItem('preferred_lang', lang);
}

// Initial load check
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferred_lang') || 'ar';
    if (languageToggle) languageToggle.checked = (savedLang === 'en');
    updateLanguage(savedLang);
});
                


document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.about-tab');
    const panels = document.querySelectorAll('.about-panel');

    if (!tabButtons.length || !panels.length) return;

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            if (!target) return;

            // Activate button
            tabButtons.forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');

            // Show matching panel
            panels.forEach(panel => {
                panel.classList.toggle(
                    'is-active',
                    panel.id === `tab-${target}`
                );
            });
        });
    });
});

// Use a block scope to avoid variable name conflicts with other scripts
{
    const modal = document.getElementById("projectModal");
    const openBtn = document.getElementById("invite-btn");
    const closeBtn = document.getElementById("closeModal");
    const projectGrid = document.getElementById('project-list');
    const submissionForm = document.getElementById('submissionForm');

    const hideModal = () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    };

    if (openBtn) openBtn.addEventListener('click', () => {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    });

    if (closeBtn) closeBtn.addEventListener('click', hideModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });

    if (submissionForm) {
        submissionForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(submissionForm);
            
            try {
                await fetch("/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams(formData).toString(),
                });
                alert("Project submitted successfully! It will appear on this page shortly.");
                hideModal();
                submissionForm.reset();
                setTimeout(updateFleetDisplay, 2000);
            } catch (error) {
                alert("❌ Connection lost. Check your signal.");
            }
        });
    }

    async function updateFleetDisplay() {
        const API_URL = 'https://script.google.com/macros/s/AKfycbxZ62b52hvUmh_UM2ublGgU6deSiMKB51GVKxv9w7erZXR9Nlh2TRrnyXpMMC9uDr2wJA/exec'; 

        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            if (data && data.length > 0) {
                projectGrid.innerHTML = ''; 
                data.forEach(project => {
                    projectGrid.innerHTML += `
                        <div class="project-card">
                            <div class="icon">🚀</div>
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            <small>Built by: <strong>${project.owner}</strong></small>
                            <br><br>
                            <a href="${project.url}" target="_blank" class="submit-btn" style="text-decoration:none">View Project</a>
                        </div>`;
                });
            }
        } catch (err) {
            console.log("Waiting for fleet signals...");
        }
    }

    window.addEventListener('load', updateFleetDisplay);
}