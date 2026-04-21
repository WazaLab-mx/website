'use client';

import React, { useEffect, useCallback, useRef, useState, useMemo } from 'react';

// Enhanced Animation Configuration with Performance Tiers
interface AnimationTier {
  threshold: number;
  rootMargin: string;
  debounceMs: number;
  rafThrottle: boolean;
}

const PERFORMANCE_TIERS: Record<'high' | 'medium' | 'low', AnimationTier> = {
  high: { threshold: 0.1, rootMargin: '100px', debounceMs: 16, rafThrottle: false },
  medium: { threshold: 0.15, rootMargin: '50px', debounceMs: 32, rafThrottle: true },
  low: { threshold: 0.25, rootMargin: '20px', debounceMs: 64, rafThrottle: true }
};

const ENHANCED_ANIMATIONS = {
  // Existing animations - optimized
  'scale-on-scroll': { tier: 'high' as const, duration: 800, easing: 'cubic-bezier(0.25, 1, 0.5, 1)' },
  'fade-in-up': { tier: 'high' as const, duration: 600, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  'slide-in-left': { tier: 'medium' as const, duration: 700, easing: 'cubic-bezier(0.25, 1, 0.5, 1)' },
  'slide-in-right': { tier: 'medium' as const, duration: 700, easing: 'cubic-bezier(0.25, 1, 0.5, 1)' },
  'stagger-fade-in': { tier: 'high' as const, duration: 500, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  
  // New enhanced animations
  'smooth-reveal': { tier: 'high' as const, duration: 900, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  'elastic-scale': { tier: 'medium' as const, duration: 1200, easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
  'parallax-float': { tier: 'low' as const, duration: 2000, easing: 'linear' },
  'magnetic-hover': { tier: 'high' as const, duration: 300, easing: 'cubic-bezier(0.25, 1, 0.5, 1)' },
  'depth-reveal': { tier: 'medium' as const, duration: 1000, easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)' },
  'wave-entrance': { tier: 'medium' as const, duration: 800, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }
} as const;

interface EnhancedAnimationSystemProps {
  performanceTier?: 'auto' | 'high' | 'medium' | 'low';
  enableParallax?: boolean;
  enableMicroInteractions?: boolean;
  debugMode?: boolean;
}

class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 60;
  private performanceTier: 'high' | 'medium' | 'low' = 'high';

  updateFPS() {
    this.frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - this.lastTime >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastTime = currentTime;
      
      // Adjust performance tier based on FPS
      if (this.fps >= 50) {
        this.performanceTier = 'high';
      } else if (this.fps >= 30) {
        this.performanceTier = 'medium';
      } else {
        this.performanceTier = 'low';
      }
    }
  }

  getPerformanceTier(): 'high' | 'medium' | 'low' {
    return this.performanceTier;
  }

  getFPS(): number {
    return this.fps;
  }
}

class EnhancedAnimationController {
  private observers: Map<string, IntersectionObserver> = new Map();
  private animatedElements: Set<Element> = new Set();
  private parallelElements: Set<HTMLElement> = new Set();
  private performanceMonitor = new PerformanceMonitor();
  private rafId: number | null = null;
  private mousePosition = { x: 0, y: 0 };
  private enableParallax: boolean;
  private enableMicroInteractions: boolean;
  private debugMode: boolean;
  private performanceTier: 'high' | 'medium' | 'low';

  constructor(
    enableParallax = true, 
    enableMicroInteractions = true, 
    debugMode = false,
    performanceTier: 'auto' | 'high' | 'medium' | 'low' = 'auto'
  ) {
    this.enableParallax = enableParallax;
    this.enableMicroInteractions = enableMicroInteractions;
    this.debugMode = debugMode;
    this.performanceTier = performanceTier === 'auto' ? 'high' : performanceTier;
    
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.animationLoop = this.animationLoop.bind(this);
  }

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.enableMicroInteractions) return;
    
    this.mousePosition.x = e.clientX / window.innerWidth;
    this.mousePosition.y = e.clientY / window.innerHeight;
  };

  private animationLoop = () => {
    this.performanceMonitor.updateFPS();
    
    // Auto-adjust performance tier
    if (this.performanceTier === 'high') {
      const currentTier = this.performanceMonitor.getPerformanceTier();
      if (currentTier !== this.performanceTier) {
        this.performanceTier = currentTier;
        this.reinitializeWithNewTier();
      }
    }

    // Handle parallax elements
    if (this.enableParallax && this.parallelElements.size > 0) {
      this.parallelElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallaxSpeed || '0.5');
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        if (rect.top < viewportHeight && rect.bottom > 0) {
          const scrollProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
          const transform = `translateY(${scrollProgress * speed * 100 - 50}px)`;
          element.style.transform = transform;
        }
      });
    }

    // Handle magnetic hover effects
    if (this.enableMicroInteractions) {
      document.querySelectorAll('.magnetic-hover').forEach(element => {
        const htmlElement = element as HTMLElement;
        const rect = htmlElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = this.mousePosition.x * window.innerWidth;
        const mouseY = this.mousePosition.y * window.innerHeight;
        
        const distance = Math.sqrt(
          Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
        );
        
        const maxDistance = 150;
        if (distance < maxDistance) {
          const strength = (maxDistance - distance) / maxDistance;
          const pullX = (mouseX - centerX) * strength * 0.3;
          const pullY = (mouseY - centerY) * strength * 0.3;
          
          htmlElement.style.transform = `translate(${pullX}px, ${pullY}px)`;
        } else {
          htmlElement.style.transform = 'translate(0, 0)';
        }
      });
    }

    if (this.debugMode) {
      this.updateDebugInfo();
    }

    this.rafId = requestAnimationFrame(this.animationLoop);
  };

  private reinitializeWithNewTier() {
    if (this.debugMode) {
      console.log(`🎯 Performance tier adjusted to: ${this.performanceTier}`);
    }
    
    // Cleanup and reinitialize with new settings
    this.destroy();
    setTimeout(() => this.init(), 100);
  }

  private updateDebugInfo() {
    let debugElement = document.getElementById('animation-debug');
    if (!debugElement) {
      debugElement = document.createElement('div');
      debugElement.id = 'animation-debug';
      debugElement.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 12px;
        z-index: 10000;
        pointer-events: none;
      `;
      document.body.appendChild(debugElement);
    }
    
    debugElement.innerHTML = `
      FPS: ${this.performanceMonitor.getFPS()}<br>
      Tier: ${this.performanceTier}<br>
      Animated: ${this.animatedElements.size}<br>
      Parallax: ${this.parallelElements.size}<br>
      Mouse: ${Math.round(this.mousePosition.x * 100)}, ${Math.round(this.mousePosition.y * 100)}
    `;
  }

  private createObserver(animationType: string): IntersectionObserver {
    const animConfig = ENHANCED_ANIMATIONS[animationType as keyof typeof ENHANCED_ANIMATIONS];
    const tierConfig = PERFORMANCE_TIERS[animConfig?.tier || this.performanceTier];
    
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: tierConfig.rootMargin,
      threshold: tierConfig.threshold,
    };

    return new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          this.animatedElements.add(entry.target);
          this.triggerAnimation(entry.target as HTMLElement, animationType);
        }
      });
    }, options);
  }

  private triggerAnimation(element: HTMLElement, animationType: string) {
    const animConfig = ENHANCED_ANIMATIONS[animationType as keyof typeof ENHANCED_ANIMATIONS];
    
    // Apply custom properties for enhanced animations
    if (animConfig) {
      element.style.setProperty('--animation-duration', `${animConfig.duration}ms`);
      element.style.setProperty('--animation-easing', animConfig.easing);
    }

    // Handle stagger delays
    const staggerClasses = Array.from(element.classList)
      .filter(cls => cls.startsWith('stagger-'))
      .map(cls => parseInt(cls.split('-')[1]) * 100);
    
    const delay = Math.max(...staggerClasses, 0);
    
    setTimeout(() => {
      element.classList.add('visible');
      this.applyEnhancedAnimation(element, animationType);
    }, delay);
  }

  private applyEnhancedAnimation(element: HTMLElement, animationType: string) {
    switch (animationType) {
      case 'magnetic-hover':
        element.classList.add('magnetic-hover');
        break;
      case 'parallax-float':
        this.parallelElements.add(element);
        element.dataset.parallaxSpeed = element.dataset.parallaxSpeed || '0.5';
        break;
      case 'wave-entrance':
        this.addWaveEffect(element);
        break;
      case 'depth-reveal':
        this.addDepthEffect(element);
        break;
    }
  }

  private addWaveEffect(element: HTMLElement) {
    const children = element.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      child.style.animationDelay = `${i * 100}ms`;
      child.classList.add('wave-child');
    }
  }

  private addDepthEffect(element: HTMLElement) {
    element.style.transform = 'perspective(1000px) rotateX(45deg) scale(0.8)';
    element.style.opacity = '0';
    
    setTimeout(() => {
      element.style.transition = 'all 1s cubic-bezier(0.215, 0.61, 0.355, 1)';
      element.style.transform = 'perspective(1000px) rotateX(0deg) scale(1)';
      element.style.opacity = '1';
    }, 50);
  }

  public init() {
    if (typeof window === 'undefined') return;

    // Initialize mouse tracking
    if (this.enableMicroInteractions) {
      window.addEventListener('mousemove', this.handleMouseMove, { passive: true });
    }

    // Create observers for each animation type
    Object.keys(ENHANCED_ANIMATIONS).forEach(animationType => {
      const observer = this.createObserver(animationType);
      const elements = document.querySelectorAll(`.${animationType}`);
      
      elements.forEach(el => observer.observe(el));
      this.observers.set(animationType, observer);
    });

    // Start animation loop
    this.animationLoop();

    // Handle reduced motion
    this.handleReducedMotion();
  }

  private handleReducedMotion() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = () => {
      if (mediaQuery.matches) {
        this.destroy();
        document.body.classList.add('reduced-motion');
      } else {
        document.body.classList.remove('reduced-motion');
        if (!this.rafId) {
          this.init();
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    handleChange();
  }

  public destroy() {
    // Cleanup observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    
    // Cleanup sets
    this.animatedElements.clear();
    this.parallelElements.clear();
    
    // Cleanup animation loop
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    // Cleanup event listeners
    window.removeEventListener('mousemove', this.handleMouseMove);
    
    // Cleanup debug info
    const debugElement = document.getElementById('animation-debug');
    if (debugElement) {
      debugElement.remove();
    }
  }
}

export const EnhancedAnimationSystem: React.FC<EnhancedAnimationSystemProps> = ({
  performanceTier = 'auto',
  enableParallax = true,
  enableMicroInteractions = true,
  debugMode = false
}) => {
  const controllerRef = useRef<EnhancedAnimationController | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const initController = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.destroy();
    }
    
    controllerRef.current = new EnhancedAnimationController(
      enableParallax,
      enableMicroInteractions,
      debugMode,
      performanceTier
    );
    
    controllerRef.current.init();
  }, [performanceTier, enableParallax, enableMicroInteractions, debugMode]);

  useEffect(() => {
    if (!isClient) return;
    
    initController();
    
    // Re-initialize on route changes
    const observer = new MutationObserver((mutations) => {
      const hasNewElements = mutations.some(mutation =>
        Array.from(mutation.addedNodes).some(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            return Object.keys(ENHANCED_ANIMATIONS).some(className =>
              element.classList.contains(className) ||
              element.querySelector(`.${className}`)
            );
          }
          return false;
        })
      );

      if (hasNewElements) {
        setTimeout(initController, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      if (controllerRef.current) {
        controllerRef.current.destroy();
      }
    };
  }, [isClient, initController]);

  return null;
};

// Utility hook for animation states
export const useAnimationState = () => {
  const [animationCount, setAnimationCount] = useState(0);
  const [fps, setFPS] = useState(60);

  useEffect(() => {
    const updateStats = () => {
      const debugElement = document.getElementById('animation-debug');
      if (debugElement) {
        const content = debugElement.innerHTML;
        const animatedMatch = content.match(/Animated: (\d+)/);
        const fpsMatch = content.match(/FPS: (\d+)/);
        
        if (animatedMatch) setAnimationCount(parseInt(animatedMatch[1]));
        if (fpsMatch) setFPS(parseInt(fpsMatch[1]));
      }
    };

    const interval = setInterval(updateStats, 1000);
    return () => clearInterval(interval);
  }, []);

  return { animationCount, fps };
};

export default EnhancedAnimationSystem;
