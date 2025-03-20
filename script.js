// DOM Elements
const loader = document.querySelector('.loader');
const loaderBar = document.querySelector('.loader-bar');
const navToggle = document.querySelector('.nav-toggle');
const fullMenu = document.querySelector('.full-menu');
const menuLinks = document.querySelectorAll('.menu-links a');
const sections = document.querySelectorAll('.section');
const cursorOuter = document.querySelector('.cursor-outer');
const cursorInner = document.querySelector('.cursor-inner');
const hoverElements = document.querySelectorAll('a, button, .nav-toggle, .project-card, .skill-tag');
const splitTextElements = document.querySelectorAll('.split-text');
const statItems = document.querySelectorAll('.stat-item');
const skillItems = document.querySelectorAll('.skill-item');
const particleCanvas = document.getElementById('particleCanvas');
const contactForm = document.getElementById('contactForm');
const hoverSound = document.getElementById('hoverSound');
const clickSound = document.getElementById('clickSound');

// Page Loader
window.addEventListener('load', () => {
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Hide loader after a short delay
            setTimeout(() => {
                if (loader) {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        loader.style.display = 'none';
                        // Initialize animations after loader is hidden
                        initAnimations();
                    }, 500);
                } else {
                    console.error('Loader element not found');
                    // Still try to initialize animations
                    initAnimations();
                }
            }, 500);
        }
        if (loaderBar) {
            loaderBar.style.width = `${progress}%`;
        }
    }, 200);
});

// Menu Toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        document.body.classList.toggle('menu-active');
        playSound(clickSound);
    });
}

// Close menu when clicking a menu link
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('menu-active');
        playSound(clickSound);
        
        // Smooth scroll to section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Add page transition effect
            document.body.classList.add('page-transitioning');
            
            setTimeout(() => {
                // Hide all sections
                sections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Show target section
                targetSection.classList.add('active');
                
                // Remove transition effect
                setTimeout(() => {
                    document.body.classList.remove('page-transitioning');
                }, 500);
            }, 500);
        }
    });
});

// Custom Cursor
if (cursorOuter && cursorInner) {
    document.addEventListener('mousemove', (e) => {
        cursorOuter.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    // Hover effect for interactive elements
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorOuter.classList.add('cursor-hover');
            cursorInner.classList.add('cursor-hover');
            playSound(hoverSound);
        });
        
        element.addEventListener('mouseleave', () => {
            cursorOuter.classList.remove('cursor-hover');
            cursorInner.classList.remove('cursor-hover');
        });
    });
}

// Split text animation
function splitText() {
    splitTextElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.transitionDelay = `${i * 0.05}s`;
            element.appendChild(span);
        }
    });
}

// Animate stats counter
function animateStats() {
    statItems.forEach(item => {
        const targetValue = parseFloat(item.dataset.value);
        const valueDisplay = item.querySelector('.stat-value');
        if (!valueDisplay) return;
        
        let currentValue = 0;
        const increment = targetValue / 50;
        const duration = 1500;
        const interval = duration / 50;
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(counter);
            }
            valueDisplay.textContent = currentValue.toFixed(2);
        }, interval);
    });
}

// Animate skill bars
function animateSkillBars() {
    skillItems.forEach(item => {
        const level = item.dataset.level;
        const progressBar = item.querySelector('.skill-progress');
        if (!progressBar) return;
        
        setTimeout(() => {
            progressBar.style.width = `${level}%`;
        }, 300);
    });
}

// Initialize Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger specific animations based on section
                const sectionId = entry.target.id;
                
                if (sectionId === 'about') {
                    animateStats();
                }
                
                if (sectionId === 'skills') {
                    animateSkillBars();
                }
                
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Particle animation for canvas background
function initParticleAnimation() {
    if (!particleCanvas) return;
    
    const ctx = particleCanvas.getContext('2d');
    let particles = [];
    
    // Set canvas size
    function resizeCanvas() {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    }
    
    // Create particles
    function createParticles() {
        particles = [];
        const particleCount = Math.floor(window.innerWidth / 20);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * particleCanvas.width,
                y: Math.random() * particleCanvas.height,
                radius: Math.random() * 2 + 1,
                color: `rgba(108, 92, 231, ${Math.random() * 0.5 + 0.1})`,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1
            });
        }
    }
    
    // Connect nearby particles with lines
    function connectParticles() {
        const maxDistance = 150;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = 1 - (distance / maxDistance);
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(108, 92, 231, ${opacity * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Draw particles
    function drawParticles() {
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > particleCanvas.width) {
                particle.speedX *= -1;
            }
            
            if (particle.y < 0 || particle.y > particleCanvas.height) {
                particle.speedY *= -1;
            }
        });
        
        // Connect particles with lines
        connectParticles();
        
        requestAnimationFrame(drawParticles);
    }
    
    // Initialize canvas
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
    
    resizeCanvas();
    createParticles();
    drawParticles();
}

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name && email && subject && message) {
            // In a real application, you would send this data to a server
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields');
        }
    });
}

// Project card tilt effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const cardRect = card.getBoundingClientRect();
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;
        
        const centerX = cardRect.width / 2;
        const centerY = cardRect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Play sound function
function playSound(sound) {
    if (sound) {
        sound.currentTime = 0;
        sound.volume = 0.2;
        sound.play().catch(() => {
            // Autoplay was prevented, ignore error
        });
    }
}

// Initialize all animations
function initAnimations() {
    console.log("Initializing animations");
    
    // Make sure home section is visible
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.classList.add('active');
        console.log("Home section activated");
    } else {
        console.error("Home section not found");
    }
    
    // Initialize text splitting
    splitText();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize particle animation
    initParticleAnimation();
}

// Initialize on DOMContentLoaded if not already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log("DOM Content Loaded");
    });
} else {
    console.log("DOM already loaded");
}

// Force initialization after a timeout as a fallback
setTimeout(() => {
    if (loader && loader.style.display !== 'none') {
        console.log("Forcing loader to hide after timeout");
        loader.style.opacity = '0';
        loader.style.display = 'none';
        initAnimations();
    }
}, 5000); // 5 second fallback
