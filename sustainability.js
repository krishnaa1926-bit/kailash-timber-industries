// Sustainability Page Interactive Elements

// Counter Animation for Hero Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the number, the faster the animation

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;

        const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
}

// Progress Bar Animation
function animateProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');

    progressFills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        fill.style.width = width + '%';
    });
}

// Interactive Card Toggle
function toggleCard(card) {
    card.classList.toggle('expanded');
}

// Initialize Sustainability Page Features
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the sustainability page
    if (window.location.pathname.includes('sustainability.html') || window.location.pathname.includes('sustainability')) {
        // Animate counters when hero section comes into view
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(heroSection);
        }

        // Animate progress bars when progress section comes into view
        const progressSection = document.querySelector('.progress-section');
        if (progressSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateProgressBars();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(progressSection);
        }

        // Add click handlers for interactive cards
        const interactiveCards = document.querySelectorAll('.interactive-card');
        interactiveCards.forEach(card => {
            card.addEventListener('click', function() {
                toggleCard(this);
            });
        });
    }
});
