// DOM Elements
const navLinks = document.getElementById("navLinks")
const menuIcon = document.getElementById("menuIcon")
const closeMenu = document.getElementById("closeMenu")
const themeToggle = document.getElementById("themeToggle")
const scrollTop = document.getElementById("scrollTop")
const typewriterElement = document.getElementById("typewriter")
const contactForm = document.getElementById("contactForm")

// Show/Hide Menu
menuIcon.addEventListener("click", () => {
  navLinks.classList.add("show-menu")
})

closeMenu.addEventListener("click", () => {
  navLinks.classList.remove("show-menu")
})

// Close menu when clicking on a nav link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show-menu")
  })
})

// Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark")

  if (document.body.classList.contains("dark")) {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
    localStorage.setItem("theme", "dark")
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
    localStorage.setItem("theme", "light")
      particles.forEach((particleA, index) => {
          particles.forEach((particleB, indexB) => {
              if (index !== indexB) {
                  const distance = Math.sqrt(
                      Math.pow(particleA.x - particleB.x, 2) +
                      Math.pow(particleA.y - particleB.y, 2)
                  );

                  if (distance < maxDistance) {
                      ctx.beginPath();
                      ctx.moveTo(particleA.x, particleA.y);
                      ctx.lineTo(particleB.x, particleB.y);
                      ctx.strokeStyle = `rgba(108, 92, 231, ${1 - distance / maxDistance})`;
                      ctx.lineWidth = 0.5;
                      ctx.stroke();
                  }
              }
          });
      });
  }
})

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme")
if (savedTheme === "dark") {
  document.body.classList.add("dark")
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
}

// Scroll to top
scrollTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Show/hide scroll to top button
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollTop.style.opacity = "1"
  } else {
    scrollTop.style.opacity = "0"
  }
})

// Active link based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-links a")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
})

// Header shadow on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
  } else {
    header.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)"
  }
})

// Typewriter effect
function typeWriter(element, texts, wait = 3000) {
  let textIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typeSpeed = 100

  function type() {
    const currentText = texts[textIndex]

    if (isDeleting) {
      element.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
      typeSpeed = 50
    } else {
      element.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
      typeSpeed = 100
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true
      typeSpeed = wait
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
    }

    setTimeout(type, typeSpeed)
  }

  type()
}

// Start typewriter effect
if (typewriterElement) {
  typeWriter(typewriterElement, ["Front-End Developer", "BCA Student", "Web Designer"], 2000)
}

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
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    // Initialize animations after loader is hidden
                    initAnimations();
                }, 500);
            }, 500);
        }
        loaderBar.style.width = `${progress}%`;
    }, 200);
});

// Menu Toggle
navToggle.addEventListener('click', () => {
    document.body.classList.toggle('menu-active');
    playSound(clickSound);
});

// Close menu when clicking a menu link
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('menu-active');
        playSound(clickSound);
        
        // Smooth scroll to section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
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
    });
});

// Custom Cursor
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
    
    // Connect nearby particles with lines
    function connectParticles() {
        const maxDistance = 150;
    }
}