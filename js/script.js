// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle?.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Animated counter for statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    };

    // Intersection Observer for stat counters
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form validation (Formspree handles submission)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Basic validation before Formspree submission
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const subject = document.getElementById('subject')?.value.trim();
            const message = document.getElementById('message')?.value.trim();

            if (!name || !email || !subject || !message) {
                e.preventDefault();
                alert('Please fill in all required fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address');
                return;
            }

            // Formspree will handle the actual submission
        });
    }

    // Admission form validation (Formspree handles submission)
    const admissionForm = document.getElementById('admissionForm');
    if (admissionForm) {
        admissionForm.addEventListener('submit', function(e) {
            const studentName = document.getElementById('studentName')?.value.trim();
            const parentName = document.getElementById('parentName')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const phone = document.getElementById('phone')?.value.trim();
            const grade = document.getElementById('grade')?.value;
            const dob = document.getElementById('dob')?.value;
            const address = document.getElementById('address')?.value.trim();

            if (!studentName || !parentName || !email || !phone || !grade || !dob || !address) {
                e.preventDefault();
                alert('Please fill in all required fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address');
                return;
            }

            // Phone validation (basic)
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                e.preventDefault();
                alert('Please enter a valid 10-digit phone number');
                return;
            }

            // Formspree will handle the actual submission
        });
    }

    // Gallery lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                // Create lightbox overlay
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <span class="close-lightbox">&times;</span>
                        <img src="${img.src}" alt="${img.alt}">
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';

                // Close lightbox
                const closeBtn = lightbox.querySelector('.close-lightbox');
                closeBtn.addEventListener('click', () => {
                    lightbox.remove();
                    document.body.style.overflow = 'auto';
                });

                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox) {
                        lightbox.remove();
                        document.body.style.overflow = 'auto';
                    }
                });
            }
        });
    });

    // Add active class to current nav item
    const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentLocation) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.feature-card, .news-card, .program-card');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => fadeObserver.observe(element));
});

// Add lightbox styles dynamically
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    }

    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }

    .lightbox-content img {
        max-width: 100%;
        max-height: 90vh;
        border-radius: 5px;
    }

    .close-lightbox {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 40px;
        cursor: pointer;
        transition: transform 0.3s ease;
    }

    .close-lightbox:hover {
        transform: scale(1.2);
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(lightboxStyles);
