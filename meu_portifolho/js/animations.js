// Animation configuration
const animationConfig = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500
  },
  easing: {
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  delays: {
    stagger: 100,
    section: 200
  }
};

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

class ScrollAnimations {
  constructor() {
    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), observerOptions);
    this.init();
  }

  init() {
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => this.observer.observe(el));
    
    // Observe staggered elements
    const staggeredElements = document.querySelectorAll('[data-stagger]');
    staggeredElements.forEach(el => this.observer.observe(el));
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animationType = element.dataset.animate;
        const staggerDelay = element.dataset.stagger;

        if (staggerDelay) {
          setTimeout(() => {
            this.animateElement(element, animationType);
          }, parseInt(staggerDelay));
        } else {
          this.animateElement(element, animationType);
        }

        this.observer.unobserve(element);
      }
    });
  }

  animateElement(element, animationType) {
    switch (animationType) {
      case 'fade-in':
        element.classList.add('animate-fade-in');
        break;
      case 'slide-up':
        element.classList.add('animate-slide-up');
        break;
      case 'slide-down':
        element.classList.add('animate-slide-down');
        break;
      case 'scale-in':
        element.classList.add('animate-scale-in');
        break;
      default:
        element.classList.add('animate-fade-in');
    }
  }
}

// Typewriter effect
class TypewriterEffect {
  constructor(element, text, speed = 100) {
    this.element = element;
    this.text = text;
    this.speed = speed;
    this.index = 0;
  }

  start() {
    this.element.innerHTML = '';
    this.type();
  }

  type() {
    if (this.index < this.text.length) {
      this.element.innerHTML += this.text.charAt(this.index);
      this.index++;
      setTimeout(() => this.type(), this.speed);
    }
  }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize scroll animations
  new ScrollAnimations();
  
  // Initialize typewriter effect for hero title
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    const typewriter = new TypewriterEffect(heroTitle, originalText, 80);
    setTimeout(() => typewriter.start(), 500);
  }
  
  // Add initial opacity to animated elements
  const animatedElements = document.querySelectorAll('[data-animate]');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
  });
});