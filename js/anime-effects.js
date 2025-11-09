// Initialize particles.js for the background
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ff2d75"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00f0ff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Create speed lines effect
    createSpeedLines();
    
    // Create floating particles
    createFloatingParticles();
    
    // Add hover effect to skill cards
    initSkillCardEffects();
    
    // Add scroll reveal animations
    initScrollReveal();
});

// Create speed lines effect
function createSpeedLines() {
    const speedLines = document.getElementById('speedLines');
    if (!speedLines) return;
    
    for (let i = 0; i < 20; i++) {
        const line = document.createElement('div');
        line.className = 'speed-line';
        line.style.left = Math.random() * 100 + 'vw';
        line.style.animationDelay = Math.random() * 5 + 's';
        line.style.animationDuration = (Math.random() * 3 + 1) + 's';
        speedLines.appendChild(line);
    }
}

// Create floating particles
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'floating-particles';
    document.body.appendChild(particlesContainer);
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 2px and 6px
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random position
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        
        // Random animation duration between 10s and 20s
        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = duration + 's';
        
        // Random delay
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        // Random color
        const colors = ['#ff2d75', '#00f0ff', '#ffffff', '#ffd700'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = randomColor;
        
        // Random blur effect
        if (Math.random() > 0.7) {
            particle.style.filter = `blur(${Math.random() * 2}px)`;
        }
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize skill card hover effects
function initSkillCardEffects() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
            
            // Add glow effect
            const glow = document.createElement('div');
            glow.className = 'skill-glow';
            glow.style.left = x + 'px';
            glow.style.top = y + 'px';
            card.appendChild(glow);
            
            // Remove glow after animation
            setTimeout(() => {
                glow.remove();
            }, 500);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Initialize scroll reveal animations
function initScrollReveal() {
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-card, .project-card, .blog-card, .about-content, .contact-content, .section-title');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
}

// Add typing effect to hero text
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typingSpeed = 100; // milliseconds
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    // Start typing effect
    setTimeout(typeWriter, 1000);
}

// Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .filter-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
}

// Text animation between names
function initNameAnimation() {
    const nameAvnish = document.querySelector('.name-avnish');
    const nameWeb15 = document.querySelector('.name-web15');
    
    if (!nameAvnish || !nameWeb15) return;
    
    // Initial state
    let isShowingAvnish = true;
    
    // Function to switch between names
    function switchName() {
        if (isShowingAvnish) {
            // Fade out Avnish Kumar
            nameAvnish.style.opacity = '0';
            
            // After fade out, hide Avnish and show WEB15
            setTimeout(() => {
                nameAvnish.style.visibility = 'hidden';
                nameWeb15.style.visibility = 'visible';
                nameWeb15.style.opacity = '1';
                
                isShowingAvnish = false;
                
                // Schedule next switch after 3 seconds
                setTimeout(switchName, 3000);
            }, 500);
        } else {
            // Fade out WEB15
            nameWeb15.style.opacity = '0';
            
            // After fade out, hide WEB15 and show Avnish
            setTimeout(() => {
                nameWeb15.style.visibility = 'hidden';
                nameAvnish.style.visibility = 'visible';
                nameAvnish.style.opacity = '1';
                
                isShowingAvnish = true;
                
                // Schedule next switch after 3 seconds
                setTimeout(switchName, 3000);
            }, 500);
        }
    }
    
    // Start the animation
    setTimeout(switchName, 3000);
}

// Initialize all effects
function initAnimeEffects() {
    // Initialize particles
    if (typeof particlesJS !== 'undefined') {
        initParticles();
    }

    // Initialize other effects
    createSpeedLines();
    createFloatingParticles();
    initSkillCardEffects();
    initScrollReveal();
    initTypingEffect();
    addRippleEffect();
    initNameAnimation();

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 50;
            const y = (window.innerHeight / 2 - e.pageY) / 50;
            
            hero.style.backgroundPosition = `${x}px ${y}px`;
        });
    }

    // Add keyboard event listener for easter egg
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'a') {
            document.body.classList.toggle('anime-mode');
            if (document.body.classList.contains('anime-mode')) {
                createConfetti();
            }
        }
    });
}

// Call the initialization function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initAnimeEffects);

// ... rest of the code remains the same ...
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'a') {
        animeMode = !animeMode;
        document.body.classList.toggle('anime-mode-active', animeMode);
        
        if (animeMode) {
            // Add some fun confetti when anime mode is activated
            createConfetti();
        }
    }
});

// Create confetti effect
function createConfetti() {
    const colors = ['#ff2d75', '#00f0ff', '#ffffff', '#ffd700', '#ff6b6b', '#4ecdc4'];
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * 100;
        const animationDuration = Math.random() * 3 + 2;
        const animationDelay = Math.random() * 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const rotation = Math.random() * 360;
        
        // Apply styles
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.left = `${posX}%`;
        confetti.style.background = color;
        confetti.style.animation = `fall ${animationDuration}s linear ${animationDelay}s infinite`;
        confetti.style.transform = `rotate(${rotation}deg)`;
        
        // Random shape
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }
        
        confettiContainer.appendChild(confetti);
    }
    
    // Remove confetti after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 10000);
}

// Add CSS for confetti
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .confetti-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    }
    
    .confetti {
        position: absolute;
        width: 10px;
        height: 10px;
        background: #ff2d75;
        opacity: 0.8;
    }
    
    /* Ripple effect */
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Initialize the application when the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimeEffects);
} else {
    initAnimeEffects();
}
