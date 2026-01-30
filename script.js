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

// The form submission code starts below
const ideaForm = document.getElementById('ideaForm');
const status = document.getElementById('formStatus');

ideaForm.addEventListener('submit', async (event) => {
    event.preventDefault(); 
    
    const data = new FormData(event.target);
    status.innerText = "Sending...";
    status.style.color = "black"; // Reset color to neutral while sending
//The freezing state when trying to send the form without internet is fixed below 
    try {
        // Attempt the network request
        const response = await fetch("https://formspree.io/f/mwvblagk", {
            method: "POST",
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            status.style.color = "green";
            status.innerText = "Success! Your idea has been sent.";
            ideaForm.reset();// Clear the form inputs
            setTimeout(closeModal, 2000); 
        } else {
            // This runs if the server is reached but rejects the data
            status.style.color = "red";
            status.innerText = "Oops! Server rejected the request.";
        }
    } catch (error) {
        // This runs if there is a network error
        // If there is no internet, the code execute these two lines  immediately
        status.style.color = "red";
        status.innerText = "No network! Please reconnect and try again.";
    }
});
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





const slider = document.querySelector('.ig-slider');
const chassis = document.querySelector('.phone-chassis');
let isPaused = false;

// 1. Clone the first slide and add it to the end for a seamless loop
const firstCard = slider.querySelector('.ig-card').cloneNode(true);
slider.appendChild(firstCard);

function startAutoSlide() {
    setInterval(() => {
        if (!isPaused) {
            const cardWidth = slider.offsetWidth;
            const currentScroll = slider.scrollLeft;
            const maxScroll = slider.scrollWidth - cardWidth;

            // Check if we are on the "cloned" last image
            if (currentScroll >= maxScroll - 5) {
                // 1. Instantly jump back to start (no animation)
                slider.style.scrollBehavior = 'auto';
                slider.scrollLeft = 0;
                
                // 2. Then immediately slide to the second image smoothly
                setTimeout(() => {
                    slider.style.scrollBehavior = 'smooth';
                    slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
                }, 20);
            } else {
                // Normal smooth slide to next
                slider.style.scrollBehavior = 'smooth';
                slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        }
    }, 2000);
}

// pause sliding on hover or touch
if (chassis) {
    chassis.addEventListener('mouseenter', () => isPaused = true);
    chassis.addEventListener('mouseleave', () => isPaused = false);
    chassis.addEventListener('touchstart', () => isPaused = true);
    chassis.addEventListener('touchend', () => isPaused = false);
}

startAutoSlide();