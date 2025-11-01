// Typed.js initialization for typing effect
const typed = new Typed('.typed-text', {
    strings: ['Data Analyst', 'Web Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navbar.classList.contains('active')) {
        icon.classList.remove('bx-menu');
        icon.classList.add('bx-x');
    } else {
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
    });
});

// Active navigation on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });

    // Header background on scroll
    const header = document.getElementById('header');
    if (scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Particle animation for home section
function createParticles() {
    const particles = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = '#0ef';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particles.appendChild(particle);
    }
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0);
        }
        25% {
            transform: translate(20px, -20px);
        }
        50% {
            transform: translate(-20px, 20px);
        }
        75% {
            transform: translate(-20px, -20px);
        }
    }
`;
document.head.appendChild(style);

createParticles();

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe section titles
const sectionTitles = document.querySelectorAll('.section-title');
sectionTitles.forEach(title => observer.observe(title));

// Observe about content
const aboutImg = document.querySelector('.about-img');
const aboutText = document.querySelector('.about-text');
if (aboutImg) observer.observe(aboutImg);
if (aboutText) observer.observe(aboutText);

// Observe skill categories
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach((category, index) => {
    setTimeout(() => {
        observer.observe(category);
    }, index * 100);
});

// Animate skill bars when visible
const skillBars = document.querySelectorAll('.skill-bar');
const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
                const progressBar = entry.target.querySelector('.progress-bar');
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.setProperty('--progress', progress + '%');
                progressBar.classList.add('active');
            }, index * 100);
        }
    });
}, observerOptions);

skillBars.forEach(bar => skillBarObserver.observe(bar));

// Observe contact sections
const contactInfo = document.querySelector('.contact-info');
const contactForm = document.querySelector('.contact-form');
if (contactInfo) observer.observe(contactInfo);
if (contactForm) observer.observe(contactForm);

// Portfolio filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// Show all projects initially with animation
projectCards.forEach((card, index) => {
    setTimeout(() => {
        card.classList.add('show');
    }, index * 100);
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach((card, index) => {
            card.classList.remove('show');

            setTimeout(() => {
                if (filter === 'all') {
                    card.classList.remove('hide');
                    setTimeout(() => card.classList.add('show'), index * 50);
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filter) {
                        card.classList.remove('hide');
                        setTimeout(() => card.classList.add('show'), index * 50);
                    } else {
                        card.classList.add('hide');
                    }
                }
            }, 300);
        });
    });
});

// Contact form handling
const contactFormElement = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactFormElement.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Basic validation
    if (name && email && subject && message) {
        // Show success message
        formMessage.textContent = 'Thank you! Your message has been sent successfully.';
        formMessage.className = 'form-message success';

        // Reset form
        contactFormElement.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 5000);
    } else {
        // Show error message
        formMessage.textContent = 'Please fill in all fields.';
        formMessage.className = 'form-message error';

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 5000);
    }
});

// Smooth scroll for anchor links
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

// Add custom cursor effect (optional)
let cursorDot, cursorOutline;

function initCustomCursor() {
    cursorDot = document.createElement('div');
    cursorDot.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: #0ef;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.1s ease;
        display: none;
    `;

    cursorOutline = document.createElement('div');
    cursorOutline.style.cssText = `
        position: fixed;
        width: 30px;
        height: 30px;
        border: 2px solid #0ef;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.15s ease;
        display: none;
    `;

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    // Only show custom cursor on desktop
    if (window.innerWidth > 768) {
        cursorDot.style.display = 'block';
        cursorOutline.style.display = 'block';

        document.addEventListener('mousemove', (e) => {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
            cursorOutline.style.left = (e.clientX - 15) + 'px';
            cursorOutline.style.top = (e.clientY - 15) + 'px';
        });

        // Scale cursor on hover over interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'scale(1.5)';
                cursorOutline.style.transform = 'scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'scale(1)';
                cursorOutline.style.transform = 'scale(1)';
            });
        });
    }
}

initCustomCursor();