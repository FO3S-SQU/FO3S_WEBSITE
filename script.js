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
    event.preventDefault(); // it prevents the default form submission behavior
    
    const data = new FormData(event.target);// Collects the form data like (input values)
    status.innerText = "Sending...";

    const response = await fetch("https://formspree.io/f/mwvblagk", {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
        status.style.color = "green";
        status.innerText = "Success! Your idea has been sent.";
        ideaForm.reset();
        setTimeout(closeModal, 2000); // Closes the modal automatically after 2 seconds
    } else {
        status.style.color = "red";
        status.innerText = "Oops! There was a problem sending your idea.";
    }
});
