document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation and .btn links
    document.querySelectorAll('nav a, .btn').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#home') { // Special handling for 'home' to scroll to very top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Calculate offset for sticky nav (adjust if nav height changes)
                    const navHeight = document.querySelector('.sticky-nav').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - navHeight - 20; // -20 for extra padding

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Sticky Navigation Bar functionality
    const nav = document.querySelector('.sticky-nav');
    const heroSection = document.querySelector('.hero'); // Not directly used in the current sticky logic, but good to have reference
    let navOffsetTop = nav.offsetTop; // Initial position of the nav

    // Recalculate navOffsetTop on load and resize, then handle sticky state
    const updateNavSticky = () => {
        navOffsetTop = nav.offsetTop; // Get the initial offset of the nav
        handleStickyNav();
    };

    function handleStickyNav() {
        if (window.pageYOffset >= navOffsetTop) {
            nav.classList.add('sticky'); // Add a class when sticky
        } else {
            nav.classList.remove('sticky');
        }
    }

    // Call once on load, then on scroll and resize
    window.addEventListener('scroll', handleStickyNav);
    window.addEventListener('resize', updateNavSticky);
    updateNavSticky(); // Initial check

    // Back to Top Button functionality
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) { // Show button after scrolling 300px
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Optional: Highlight active nav link (more advanced, but good UX)
    const sections = document.querySelectorAll('section, header.hero'); // Include hero for home
    const navLinks = document.querySelectorAll('.nav-links a');

    function highlightNavLink() {
        let current = '';
        const navHeight = nav.offsetHeight; // Get current nav height

        sections.forEach(section => {
            // Add a small buffer to the top offset to ensure the section is well into view
            const sectionTop = section.offsetTop - navHeight - 50; // Adjusted buffer
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Initial call
});