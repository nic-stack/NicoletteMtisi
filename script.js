document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const offset = document.querySelector('.sticky-nav').offsetHeight; // Height of sticky nav

            // Scroll to the target element with an offset for the sticky nav
            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });
        });
    });

    // Sticky Navigation
    const stickyNav = document.querySelector('.sticky-nav');
    const heroSection = document.getElementById('home'); // Or the section just before the nav

    // Calculate the point at which the nav should become sticky
    // This is typically the height of the content *before* the nav
    const stickyPoint = heroSection.offsetHeight;

    function handleScroll() {
        if (window.scrollY > stickyPoint) {
            stickyNav.classList.add('fixed-nav');
        } else {
            stickyNav.classList.remove('fixed-nav');
        }

        // Back to Top button visibility
        const backToTopBtn = document.getElementById('backToTopBtn');
        if (window.scrollY > 300) { // Show button after scrolling 300px down
            backToTopBtn.style.display = 'flex'; // Use flex to center icon
        } else {
            backToTopBtn.style.display = 'none';
        }
    }

    window.addEventListener('scroll', handleScroll);
    // Call on load in case user refreshed part-way down
    handleScroll();


    // Back to Top Button functionality
    const backToTopBtn = document.getElementById('backToTopBtn');
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Optional: Contact Form Submission (example - will not actually send email without backend)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            alert('Thank you for your message! I will get back to you soon.');
            // In a real application, you would send this data to a backend server
            // using fetch() or XMLHttpRequest here.
            contactForm.reset(); // Clear the form after submission
        });
    }
});
