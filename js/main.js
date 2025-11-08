// Preloader
window.addEventListener('load', () => {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="loader"></div>';
    document.body.prepend(preloader);
    
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1500);
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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

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

// Skills Data
const skillsData = {
    frontend: [
        { name: 'HTML5', level: 95, icon: 'fab fa-html5' },
        { name: 'CSS3', level: 90, icon: 'fab fa-css3-alt' },
        { name: 'JavaScript', level: 85, icon: 'fab fa-js' },
       
    ],
   
    tools: [
        { name: 'Git', level: 90, icon: 'fab fa-git-alt' },
        { name: 'GitHub', level: 85, icon: 'fab fa-github' },
        { name: 'VS Code', level: 95, icon: 'fas fa-code' }
    ]
};

// Projects Data
const projectsData = [
    {
        id: 1,
        title: 'Calculator',
        category: 'web',
        image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNDAwIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzFhMWEyZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBkeT0iLjNlbSI+Q2FsY3VsYXRvcjwvdGV4dD48L3N2Zz4=',
        description: 'A functional calculator built with HTML, CSS, and JavaScript.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        demo: 'https://avanishmourya6-web.github.io/CALCULATOR/',
        github: '#'
    },
    {
        id: 2,
        title: 'To-Do List',
        category: 'web',
        image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNDAwIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzE2MjEzZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBkeT0iLjNlbSI+VG8tRG8gTGlzdDwvdGV4dD48L3N2Zz4=',
        description: 'An interactive to-do list application with task management features.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        demo: 'https://avanishmourya6-web.github.io/To-Do_List/',
        github: '#'
    },
    {
        id: 3,
        title: 'Avi-Weather',
        category: 'web',
        image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNDAwIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzBmMzQ2MCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBkeT0iLjNlbSI+V2VhdGhlciBBcHA8L3RleHQ+PC9zdmc+',
        description: 'Weather application showing current weather and forecasts.',
        tech: ['HTML', 'CSS', 'JavaScript', 'Weather API'],
        demo: 'https://avanishmourya6-web.github.io/Weather-by-Avnish/',
        github: '#'
    }
]
// Blog Data
const blogData = [
    {
        title: 'Getting Started with React Hooks',
        date: 'June 15, 2023',
        category: 'React',
        image: 'https://via.placeholder.com/600x400/1a1a2e/ffffff?text=React+Hooks',
        excerpt: 'Learn how to use React Hooks to simplify your functional components and manage state effectively.',
        url: '#'
    },
    {
        title: 'CSS Grid Layout: A Complete Guide',
        date: 'May 28, 2023',
        category: 'CSS',
        image: 'https://via.placeholder.com/600x400/16213e/ffffff?text=CSS+Grid',
        excerpt: 'Master CSS Grid Layout with this comprehensive guide covering all the properties and examples.',
        url: '#'
    },
    {
        title: 'Building RESTful APIs with Node.js',
        date: 'April 10, 2023',
        category: 'Node.js',
        image: 'https://via.placeholder.com/600x400/0f3460/ffffff?text=Node.js+API',
        excerpt: 'Step-by-step guide to building scalable and maintainable RESTful APIs using Node.js and Express.',
        url: '#'
    }
];

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
    
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-category', project.category);
        
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-links">
                <a href="${project.demo}" class="btn btn-primary" target="_blank">Live Demo</a>
                <a href="${project.github}" class="btn btn-outline" target="_blank">GitHub</a>
            </div>
        `;
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
    
    blogData.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-card';
        postElement.innerHTML = `
            <div class="blog-img">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="blog-content">
                <span class="blog-date">${post.date} • ${post.category}</span>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <a href="${post.url}" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        blogGrid.appendChild(postElement);
    });
}

// Contact Form Submission
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Add Web3Forms access key input if not exists
    if (!form.querySelector('input[name="access_key"]')) {
        const accessKeyInput = document.createElement('input');
        accessKeyInput.type = 'hidden';
        accessKeyInput.name = 'access_key';
        accessKeyInput.value = 'c84a6e9c-4205-4c0d-91c3-36ba5af39890'; // Same key as in AVI_git
        form.appendChild(accessKeyInput);
    }

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
            const formData = new FormData(form);
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show success message
                status.textContent = 'Message sent successfully!';
                status.style.color = '#4BB543';
                status.style.backgroundColor = 'rgba(75, 181, 67, 0.1)';
                status.style.border = '1px solid #4BB543';
                form.reset();
                
                // Scroll to status message
                setTimeout(() => {
                    status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            } else {
                throw new Error(result.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
            status.textContent = 'Failed to send message. Please try again.';
            status.style.color = '#ff4d4d';
            status.style.backgroundColor = 'rgba(255, 77, 77, 0.1)';
            status.style.border = '1px solid #ff4d4d';
        } finally {
            // Re-enable button and reset text
            submitBtn.disabled = false;
            submitBtn.innerHTML = submitText;
            
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

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSkills();
    initProjects();
    initContactForm();
    animateOnScroll();
    
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // Initialize particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            // ... existing particles config ...
        });
    }
    
    // Add animation to skill levels on scroll
    const skillLevels = document.querySelectorAll('.skill-level .level');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillLevels.forEach(level => {
        skillObserver.observe(level);
    });
    
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
