'use client';

import { useEffect, useCallback, useRef } from 'react';

// Enhanced animation configuration with performance tiers
const ANIMATION_CONFIG = {
  // Basic animations - optimized
  'scale-on-scroll': { threshold: 0.1, rootMargin: '50px', performance: 'high' },
  'fade-in-up': { threshold: 0.15, rootMargin: '30px', performance: 'high' },
  'slide-in-left': { threshold: 0.2, rootMargin: '40px', performance: 'medium' },
  'slide-in-right': { threshold: 0.2, rootMargin: '40px', performance: 'medium' },
  'stagger-fade-in': { threshold: 0.1, rootMargin: '60px', performance: 'high' },
  
  // Premium animations
  'premium-hover': { threshold: 0.25, rootMargin: '20px', performance: 'medium' },
  'floating': { threshold: 0.3, rootMargin: '10px', performance: 'low' },
  'gentle-pulse': { threshold: 0.2, rootMargin: '30px', performance: 'medium' },
  
  // New enhanced animations
  'smooth-reveal': { threshold: 0.1, rootMargin: '80px', performance: 'high' },
  'elastic-scale': { threshold: 0.15, rootMargin: '60px', performance: 'medium' },
  'parallax-float': { threshold: 0.3, rootMargin: '20px', performance: 'low' },
  'magnetic-hover': { threshold: 0.2, rootMargin: '40px', performance: 'high' },
  'depth-reveal': { threshold: 0.15, rootMargin: '50px', performance: 'medium' },
  'wave-entrance': { threshold: 0.1, rootMargin: '70px', performance: 'medium' }
} as const;

// Stagger delay configuration
const STAGGER_DELAYS = {
  'stagger-1': 100,
  'stagger-2': 200,
  'stagger-3': 300,
  'stagger-4': 400,
  'stagger-5': 500,
  'stagger-6': 600,
} as const;

class PremiumScrollAnimationSystem {
  private observers: Map<string, IntersectionObserver> = new Map();
  private animatedElements: Set<Element> = new Set();
  private rafId: number | null = null;
  private parallaxElements: NodeListOf<Element> | null = null;
  
  constructor() {
    this.handleParallax = this.handleParallax.bind(this);
  }

  // Enhanced intersection observer callback with stagger support
  private createObserverCallback = (animationType: string): IntersectionObserverCallback => {
    return (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          this.animatedElements.add(entry.target);
          
          // Handle staggered animations
          const staggerClasses = Array.from(entry.target.classList)
            .filter(cls => cls.startsWith('stagger-'))
            .map(cls => cls as keyof typeof STAGGER_DELAYS);
          
          if (staggerClasses.length > 0) {
            const delay = Math.max(...staggerClasses.map(cls => STAGGER_DELAYS[cls] || 0));
            setTimeout(() => {
              entry.target.classList.add('visible');
              this.triggerCustomAnimation(entry.target, animationType);
            }, delay);
          } else {
            entry.target.classList.add('visible');
            this.triggerCustomAnimation(entry.target, animationType);
          }
        }
      });
    };
  };

  // Trigger custom animations based on element type
  private triggerCustomAnimation(element: Element, animationType: string) {
    switch (animationType) {
      case 'premium-hover':
        this.addHoverEnhancements(element);
        break;
      case 'floating':
        this.addFloatingAnimation(element);
        break;
      case 'gentle-pulse':
        this.addPulseAnimation(element);
        break;
    }
  }

  // Add enhanced hover effects
  private addHoverEnhancements(element: Element) {
    const htmlElement = element as HTMLElement;
    
    const originalTransform = htmlElement.style.transform || '';
    
    htmlElement.addEventListener('mouseenter', () => {
      // Removed scaling transform to keep content static
      htmlElement.style.transform = originalTransform;
      htmlElement.style.filter = 'brightness(1.1)';
    });
    
    htmlElement.addEventListener('mouseleave', () => {
      htmlElement.style.transform = originalTransform;
      htmlElement.style.filter = '';
    });
  }

  // Add floating animation with random variation
  private addFloatingAnimation(element: Element) {
    const htmlElement = element as HTMLElement;
    const randomDelay = Math.random() * 2000;
    const randomDuration = 4000 + Math.random() * 2000;
    
    setTimeout(() => {
      htmlElement.style.animationDuration = `${randomDuration}ms`;
      htmlElement.classList.add('floating');
    }, randomDelay);
  }

  // Add pulse animation with variation
  private addPulseAnimation(element: Element) {
    const htmlElement = element as HTMLElement;
    const randomDelay = Math.random() * 1000;
    
    setTimeout(() => {
      htmlElement.classList.add('gentle-pulse');
    }, randomDelay);
  }

  // Parallax scrolling handler
  private handleParallax() {
    if (!this.parallaxElements) return;
    
    const scrollY = window.pageYOffset;
    
    this.parallaxElements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      const rect = htmlElement.getBoundingClientRect();
      const speed = parseFloat(htmlElement.dataset.parallaxSpeed || '0.5');
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInViewport) {
        const yPos = -(scrollY * speed);
        htmlElement.style.transform = `translateY(${yPos}px)`;
      }
    });
    
    this.rafId = requestAnimationFrame(this.handleParallax);
  }

  // Initialize all animation systems
  public init() {
    if (typeof window === 'undefined') return;

    // Create observers for each animation type
    Object.entries(ANIMATION_CONFIG).forEach(([animationType, config]) => {
      const observerOptions: IntersectionObserverInit = {
        root: null,
        rootMargin: config.rootMargin,
        threshold: config.threshold,
      };

      const observer = new IntersectionObserver(
        this.createObserverCallback(animationType),
        observerOptions
      );

      // Find and observe elements with this animation class
      const elements = document.querySelectorAll(`.${animationType}`);
      elements.forEach((el) => observer.observe(el));
      
      this.observers.set(animationType, observer);
    });

    // Initialize parallax elements
    this.parallaxElements = document.querySelectorAll('[data-parallax]');
    if (this.parallaxElements.length > 0) {
      this.handleParallax();
    }

    // Add scroll performance optimization
    this.addScrollOptimization();
    
    // Add reduced motion support
    this.handleReducedMotion();
  }

  // Performance optimization for scroll events
  private addScrollOptimization() {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Trigger any scroll-dependent effects here
          this.updateScrollDependentEffects();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // Update effects that depend on scroll position
  private updateScrollDependentEffects() {
    const scrollProgress = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
    
    // Update any elements that need scroll progress
    const progressElements = document.querySelectorAll('[data-scroll-progress]');
    progressElements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      htmlElement.style.setProperty('--scroll-progress', scrollProgress.toString());
    });
  }

  // Handle reduced motion preferences
  private handleReducedMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Disable parallax and complex animations
      this.parallaxElements = null;
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
      }
      
      // Add reduced motion class to body
      document.body.classList.add('reduced-motion');
    }
  }

  // Cleanup function
  public destroy() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
    this.animatedElements.clear();
    
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
}

// Export the initialization function
export function initScrollAnimations() {
  if (typeof window === 'undefined') return;
  
  const animationSystem = new PremiumScrollAnimationSystem();
  animationSystem.init();
  
  return () => animationSystem.destroy();
}

// Enhanced scroll animations component
export default function ScrollAnimations() {
  const cleanupRef = useRef<(() => void) | null>(null);

  const initAnimations = useCallback(() => {
    // Clean up previous instance
    if (cleanupRef.current) {
      cleanupRef.current();
    }
    
    // Initialize new animation system
    cleanupRef.current = initScrollAnimations();
  }, []);

  useEffect(() => {
    // Initial setup
    initAnimations();
    
    // Re-initialize on route changes or dynamic content
    const observer = new MutationObserver((mutations) => {
      const hasNewAnimationElements = mutations.some(mutation => 
        Array.from(mutation.addedNodes).some(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            return Object.keys(ANIMATION_CONFIG).some(className => 
              element.classList.contains(className) || 
              element.querySelector(`.${className}`)
            );
          }
          return false;
        })
      );
      
      if (hasNewAnimationElements) {
        // Debounce re-initialization
        setTimeout(initAnimations, 100);
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    
    return () => {
      observer.disconnect();
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [initAnimations]);

  return null;
}