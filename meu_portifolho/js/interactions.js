// Micro-interactions and UI enhancements
class MicroInteractions {
  constructor() {
    this.init();
  }

  init() {
    this.setupHeaderScroll();
    this.setupMobileMenu();
    this.setupSmoothScroll();
    this.setupButtonEffects();
    this.setupCardHovers();
  }

  // Header scroll effect
  setupHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
      
      // Hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      
      lastScrollY = currentScrollY;
    });
  }

  // Mobile menu functionality
  setupMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('menu-open');
      
      if (isOpen) {
        this.closeMobileMenu();
      } else {
        this.openMobileMenu();
      }
    });

    // Close menu when clicking overlay
    if (menuOverlay) {
      menuOverlay.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    }

    // Close menu when clicking menu links
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });
  }

  openMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    menuToggle.classList.add('menu-active');
    mobileMenu.classList.add('menu-open');
    if (menuOverlay) menuOverlay.classList.add('overlay-active');
    document.body.style.overflow = 'hidden';
  }

  closeMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    menuToggle.classList.remove('menu-active');
    mobileMenu.classList.remove('menu-open');
    if (menuOverlay) menuOverlay.classList.remove('overlay-active');
    document.body.style.overflow = '';
  }

  // Smooth scroll for navigation links
  setupSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Button click effects
  setupButtonEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .project-link');
    
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }

  // Card hover effects
  setupCardHovers() {
    const cards = document.querySelectorAll('.project-card, .skill-item, .certificacao-item');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });
  }
}

// Parallax scroll effect
class ParallaxEffect {
  constructor() {
    this.elements = document.querySelectorAll('[data-parallax]');
    this.init();
  }

  init() {
    if (this.elements.length === 0) return;
    
    window.addEventListener('scroll', () => {
      this.updateParallax();
    });
  }

  updateParallax() {
    const scrolled = window.pageYOffset;
    
    this.elements.forEach(element => {
      const rate = scrolled * -0.5;
      element.style.transform = `translateY(${rate}px)`;
    });
  }
}

// Initialize interactions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MicroInteractions();
  new ParallaxEffect();
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .header-scrolled {
    @apply shadow-lg bg-white/95 backdrop-blur-md;
  }
`;
document.head.appendChild(style);