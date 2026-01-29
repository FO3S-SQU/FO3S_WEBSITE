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
}, { threshold: 0.2 });

counters.forEach(counter => observer.observe(counter));