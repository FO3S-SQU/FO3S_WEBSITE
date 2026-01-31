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

//Card generation code starts below

function generateTestCard() {
    const container = document.getElementById('project-list');
    
    // Create the card element
    const card = document.createElement('div');
    card.className = 'project-card';
    
    
    card.innerHTML = `
        <h3>GHOST_DETECTOR_V1.0</h3>
        <p><strong>LOG_ENTRY:</strong> uses EM wave to detect ghost and process the signal using C++.</p>
        <a href="#" class="repo-url">ACCESS_SPECTRAL_DATA</a>
    `;
    
    // Add it to your centered grid
    container.appendChild(card);
}