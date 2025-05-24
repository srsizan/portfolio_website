// Initialize Lucide icons
lucide.createIcons();

// Mobile menu functionality
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white/95');
        navbar.classList.remove('bg-white/90');
    } else {
        navbar.classList.remove('bg-white/95');
        navbar.classList.add('bg-white/90');
    }
});

// Active navigation link highlighting with enhanced styling
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-primary', 'font-semibold', 'active');
        link.classList.add('text-gray-700');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.remove('text-gray-700');
            link.classList.add('text-primary', 'font-semibold', 'active');
        }
    });
});

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            
            // Add staggered animation to cards
            if (entry.target.classList.contains('project-card') || entry.target.classList.contains('skill-card')) {
                const cards = entry.target.parentElement.children;
                Array.from(cards).forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animationDelay = `${index * 0.1}s`;
                        card.classList.add('animate-fade-in');
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe all sections and cards for animations
sections.forEach(section => {
    observer.observe(section);
});

document.querySelectorAll('.project-card, .skill-card').forEach(card => {
    observer.observe(card);
});

// Enhanced typewriter effect for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Add cursor blink effect after typing is complete
            element.innerHTML += '<span class="animate-pulse">|</span>';
        }
    }
    
    type();
}

// Initialize typewriter effect when page loads
window.addEventListener('load', () => {
    const heroSubtitle = document.querySelector('#typewriter');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 80);
        }, 1000);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('#home');
    const rate = scrolled * -0.3;
    
    if (hero) {
        const heroContent = hero.querySelector('.max-w-7xl');
        if (heroContent) {
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    }
});

// Enhanced back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i data-lucide="arrow-up" class="w-6 h-6"></i>';
backToTopButton.className = 'fixed bottom-8 right-8 bg-gradient-to-r from-primary to-secondary text-white w-14 h-14 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 opacity-0 invisible z-50 flex items-center justify-center transform hover:scale-110';
backToTopButton.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

document.body.appendChild(backToTopButton);
lucide.createIcons();

// Show/hide back to top button with animation
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('opacity-0', 'invisible');
        backToTopButton.classList.add('animate-bounce');
    } else {
        backToTopButton.classList.add('opacity-0', 'invisible');
        backToTopButton.classList.remove('animate-bounce');
    }
});

// Mouse follower effect for hero section
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('#home .animate-float, #home .animate-float-delayed');
    
    floatingElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const elementX = rect.left + rect.width / 2;
        const elementY = rect.top + rect.height / 2;
        
        const deltaX = (mouseX - elementX) * 0.01;
        const deltaY = (mouseY - elementY) * 0.01;
        
        element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
    
    requestAnimationFrame(animateFloatingElements);
}

// Start mouse follower animation
animateFloatingElements();

// Enhanced loading animation
function showLoadingAnimation() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="text-center">
            <div class="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <div class="text-white text-xl font-semibold">Loading Portfolio...</div>
        </div>
    `;
    
    document.body.appendChild(loadingOverlay);
    
    // Hide loading after 1 second
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
        setTimeout(() => {
            loadingOverlay.remove();
        }, 500);
    }, 1000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Show loading animation
    showLoadingAnimation();
    
    // Re-initialize Lucide icons
    lucide.createIcons();
    
    // Add smooth entrance animation to body
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize skill progress bar animations
    animateSkillBars();
});

// Enhanced skill progress bar animations
function animateSkillBars() {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const targetWidth = bar.getAttribute('data-width');
                        bar.style.transition = 'width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        bar.style.width = targetWidth + '%';
                    }, index * 200);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('.skill-card').forEach(card => {
        skillObserver.observe(card);
    });
}

// Performance optimization: Lazy load images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            img.style.transition = 'opacity 0.3s ease';
            img.style.opacity = '1';
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    img.style.opacity = '0';
    imageObserver.observe(img);
});

// Add responsive design helpers
function handleResize() {
    const width = window.innerWidth;
    
    // Close mobile menu on resize to desktop
    if (width >= 768) {
        mobileMenu.classList.add('hidden');
    }
}

window.addEventListener('resize', handleResize);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        mobileMenu.classList.add('hidden');
    }
});

// Add additional CSS animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .project-card, .skill-card {
        animation: fadeIn 0.6s ease-out forwards;
        opacity: 0;
    }
    
    .animate-fade-in {
        animation: fadeIn 0.6s ease-out forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(additionalStyles);

// Console welcome message
console.log(`
    🚀 Welcome to Samiun Rahman Sizan's Enhanced Portfolio
    
    Portfolio crafted with:
    • HTML5 & Semantic markup
    • Tailwind CSS for modern styling
    • Enhanced JavaScript animations
    • Lucide icons for UI elements
    • Responsive design principles
    • Advanced CSS animations
    • Performance optimizations
    
    New Features:
    ✨ Enhanced hero section with floating elements
    ✨ Improved contact section (form removed)
    ✨ Advanced project and skill cards
    ✨ Smooth animations and transitions
    ✨ Interactive elements and effects
    
    Connect with Sizan:
    📧 samiunsizan@gmail.com
    🔗 linkedin.com/in/samiun-rahman-sizan-860806171
    💻 github.com/srsizan
`);

// Initialize skill bar animations
animateSkillBars();
