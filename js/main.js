// Preloader
const preloadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="loader"></div>';
    document.body.prepend(preloader);
    
    // Initialize lazy loading
    preloadImages();
    
    // Remove preloader
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1000); // Reduced from 1500ms to 1000ms for faster initial load
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on a nav link
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Optimized scroll handler with requestAnimationFrame
let ticking = false;
const navbar = document.querySelector('.navbar');
const backToTopBtn = document.querySelector('.back-to-top');

const updateNavbar = () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
    
    ticking = false;
};

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}, { passive: true });

// Initial check
updateNavbar();

// Smooth scroll for back to top
backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// All data is now loaded from data.js

// Initialize Skills
function initSkills() {
    const skillsContainer = document.querySelector('.skills-container');
    
    if (!skillsContainer) return;
    
    Object.entries(skillsData).forEach(([category, skills]) => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'skill-category';
        categoryElement.innerHTML = `
            <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <div class="skills-grid"></div>
        `;
        
        const skillsGrid = categoryElement.querySelector('.skills-grid');
        
        skills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-card';
            skillElement.innerHTML = `
                <div class="skill-icon"><i class="${skill.icon}"></i></div>
                <h4>${skill.name}</h4>
                <div class="skill-level">
                    <div class="level" style="width: ${skill.level}%;"></div>
                </div>
            `;
            skillsGrid.appendChild(skillElement);
        });
        
        skillsContainer.appendChild(categoryElement);
    });
}

// Initialize Projects
function initProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!projectsGrid) return;
    
    // Default project image
    const defaultImage = 'img/project-placeholder.jpg';
    
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-category', project.category);
        
        // Create project card content
        projectCard.innerHTML = `
            <div class="project-image-container">
                <img src="" data-src="${project.image}" alt="${project.title}" onerror="this.onerror=null; this.src='${defaultImage}'; this.classList.add('img-error');">
                <div class="project-overlay"></div>
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-links">
                <a href="${project.demo}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Live Demo</a>
                <a href="${project.github}" class="btn btn-outline" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>`;
            
        // Lazy load images
        const img = projectCard.querySelector('img');
        if (img) {
            // Set a placeholder initially
            img.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNjAwIDQwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWEyZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPiR7cHJvamVjdC50aXRsZX08L3RleHQ+PC9zdmc+';
            
            // Load the actual image
            const imageLoader = new Image();
            imageLoader.onload = function() {
                img.src = project.image;
                img.classList.add('loaded');
            };
            imageLoader.onerror = function() {
                img.src = defaultImage;
                img.classList.add('img-error');
            };
            imageLoader.src = project.image;
        }
        projectsGrid.appendChild(projectCard);
    });
    
    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Initialize Blog Posts
function initBlog() {
    const blogGrid = document.querySelector('.blog-grid');
    
    if (!blogGrid) return;
    
    // Check if blogData exists, if not, show a message
    if (typeof blogData === 'undefined') {
        blogGrid.innerHTML = `
            <div class="coming-soon">
                <h3>Blog Coming Soon!</h3>
                <p>I'm currently working on some great content. Check back later!</p>
            </div>
        `;
        return;
    }
    
    // If blogData exists but is empty
    if (!Array.isArray(blogData) || blogData.length === 0) {
        blogGrid.innerHTML = `
            <div class="no-posts">
                <i class="fas fa-newspaper fa-3x"></i>
                <h3>No Blog Posts Yet</h3>
                <p>Stay tuned for upcoming articles and tutorials!</p>
            </div>
        `;
        return;
    }
    
    // If we have blog posts, render them
    blogData.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-card';
        postElement.innerHTML = `
            <div class="blog-img">
                <img src="${post.image || 'img/blog-placeholder.jpg'}" alt="${post.title || 'Blog Post'}" onerror="this.onerror=null; this.src='img/blog-placeholder.jpg';">
            </div>
            <div class="blog-content">
                <span class="blog-date">${post.date || ''} ${post.date && post.category ? '•' : ''} ${post.category || ''}</span>
                <h3>${post.title || 'Untitled Post'}</h3>
                <p>${post.excerpt || 'No excerpt available.'}</p>
                <a href="${post.url || '#'}" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        blogGrid.appendChild(postElement);
    });
}

// Contact Form Submission
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Form submission handler
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const submitText = submitBtn.innerHTML;
        const status = document.createElement('div');
        status.style.marginTop = '15px';
        status.style.padding = '10px';
        status.style.borderRadius = '4px';
        status.style.textAlign = 'center';
        
        // Remove any existing status messages
        const existingStatus = form.querySelector('.form-status');
        if (existingStatus) {
            existingStatus.remove();
        }
        status.className = 'form-status';
        form.appendChild(status);
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        try {
            // Get form elements
            const name = form.querySelector('[name="name"]').value;
            const email = form.querySelector('[name="email"]').value;
            const subject = form.querySelector('[name="subject"]').value;
            const message = form.querySelector('[name="message"]').value;
            
            // Create a simple form data object
            const formData = {
                access_key: 'c84a6e9c-4205-4c0d-91c3-36ba5af39890',
                name: name,
                email: email,
                subject: subject || 'New Contact Form Submission',
                message: message,
                botcheck: '', // This should be empty for the honeypot to work
                from_name: name || 'Portfolio Contact Form',
                replyto: email,
                website: window.location.href
            };

            // Log the data being sent (for debugging)
            console.log('Sending form data:', JSON.stringify(formData, null, 2));
            
            // Send to Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show success message
                status.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                status.style.color = '#4BB543';
                status.style.backgroundColor = 'rgba(75, 181, 67, 0.1)';
                status.style.border = '1px solid #4BB543';
                form.reset();
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            status.textContent = 'Failed to send message. Please try again or contact me directly at avanishmourya6@gmail.com';
            status.style.color = '#ff4d4d';
            status.style.backgroundColor = 'rgba(255, 77, 77, 0.1)';
            status.style.border = '1px solid #ff4d4d';
        } finally {
            // Re-enable button and reset text
            submitBtn.disabled = false;
            submitBtn.innerHTML = submitText;
            
            // Scroll to status message
            status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Hide status message after 5 seconds
            setTimeout(() => {
                status.style.opacity = '0';
                status.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    status.remove();
                }, 500);
            }, 5000);
        }
    });
}
// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.skill-card, .project-card, .blog-card, .about-content, .contact-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize particles.js
const initParticles = () => {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80 },
                color: { value: '#ffffff' },
                shape: { type: 'circle' },
                opacity: { value: 0.5 },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }
}

// Make sure data is loaded before initializing
function initializeApp() {
    // Initialize components
    initSkills();
    initProjects();
    initContactForm();
    animateOnScroll();
    
    // Initialize particles after a small delay
    setTimeout(() => {
        initParticles();
    }, 300);
}

console.log('main.js loaded, checking for data...');

// Check if data is already loaded
if (typeof skillsData !== 'undefined' && typeof projectsData !== 'undefined') {
    console.log('Data already available, initializing app...');
    initializeApp();
} else {
    console.log('Data not available yet, waiting...');
    // Set up a mutation observer to watch for when data becomes available
    const observer = new MutationObserver((mutations, obs) => {
        if (typeof skillsData !== 'undefined' && typeof projectsData !== 'undefined') {
            console.log('Data now available, initializing app...');
            initializeApp();
            obs.disconnect(); // Stop observing once data is loaded
        }
    });
    
    // Start observing the document with the configured parameters
    observer.observe(document, { childList: true, subtree: true });
    
    // Fallback in case the observer doesn't catch the data loading
    setTimeout(() => {
        if (typeof skillsData !== 'undefined' && typeof projectsData !== 'undefined' && !window.appInitialized) {
            console.log('Data loaded in timeout, initializing app...');
            window.appInitialized = true;
            initializeApp();
        }
    }, 1000);
}

// Add animation to hero section elements
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Add floating animation to elements
    const floatingElements = document.querySelectorAll('.floating-elements > div');
    floatingElements.forEach((element, index) => {
        element.style.animation = `float 6s ease-in-out ${index * 1.5}s infinite`;
    });

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu if open when resizing to desktop
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});
