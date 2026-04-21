'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinklePhase: number;
  twinkleSpeed: number;
  layer: number;
}

interface GalaxyBackgroundProps {
  className?: string;
  starCount?: number;
  enableParallax?: boolean;
  intensity?: 'subtle' | 'medium' | 'high';
}

export const GalaxyBackground: React.FC<GalaxyBackgroundProps> = ({
  className = '',
  starCount = 150,
  enableParallax = true,
  intensity = 'subtle'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  // Configuration based on intensity
  const config = {
    subtle: {
      maxStarSize: 2,
      minStarSize: 0.5,
      parallaxStrength: 0.02,
      twinkleIntensity: 0.3,
      flowSpeed: 0.2
    },
    medium: {
      maxStarSize: 2.5,
      minStarSize: 0.8,
      parallaxStrength: 0.04,
      twinkleIntensity: 0.5,
      flowSpeed: 0.3
    },
    high: {
      maxStarSize: 3,
      minStarSize: 1,
      parallaxStrength: 0.06,
      twinkleIntensity: 0.7,
      flowSpeed: 0.5
    }
  }[intensity];

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize stars
  const initializeStars = (canvas: HTMLCanvasElement) => {
    const stars: Star[] = [];
    const { width, height } = canvas;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: config.minStarSize + Math.random() * (config.maxStarSize - config.minStarSize),
        opacity: 0.3 + Math.random() * 0.7,
        speed: 0.1 + Math.random() * 0.3,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.5 + Math.random() * 1.5,
        layer: Math.floor(Math.random() * 3) + 1 // 1-3 layers for parallax
      });
    }

    starsRef.current = stars;
  };

  // Handle mouse movement for parallax
  useEffect(() => {
    if (!enableParallax) return;

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enableParallax]);

  // Animation loop
  const animate = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const { width, height } = canvas;
    
    // Clear canvas with transparent background
    ctx.clearRect(0, 0, width, height);

    const stars = starsRef.current;
    const time = Date.now() * 0.001;

    stars.forEach((star) => {
      // Update star position with subtle flow
      star.x += star.speed * config.flowSpeed;
      star.y += Math.sin(time + star.id * 0.1) * 0.1;

      // Wrap around screen
      if (star.x > width + 10) {
        star.x = -10;
        star.y = Math.random() * height;
      }

      // Apply parallax effect based on mouse position
      let parallaxX = 0;
      let parallaxY = 0;
      
      if (enableParallax) {
        const parallaxFactor = config.parallaxStrength * star.layer;
        parallaxX = (mouseRef.current.x - 0.5) * width * parallaxFactor;
        parallaxY = (mouseRef.current.y - 0.5) * height * parallaxFactor;
      }

      // Calculate twinkle effect
      star.twinklePhase += star.twinkleSpeed * 0.02;
      const twinkle = Math.sin(star.twinklePhase) * config.twinkleIntensity;
      const currentOpacity = Math.max(0.1, star.opacity + twinkle);

      // Calculate final position
      const finalX = star.x + parallaxX;
      const finalY = star.y + parallaxY;

      // Draw star with film noir colors
      ctx.save();
      
      // Create radial gradient for star glow
      const gradient = ctx.createRadialGradient(
        finalX, finalY, 0,
        finalX, finalY, star.size * 2
      );
      
      // Use monochrome colors that fit the film noir theme
      const alpha = currentOpacity * 0.8;
      gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
      gradient.addColorStop(0.4, `rgba(220, 220, 220, ${alpha * 0.6})`);
      gradient.addColorStop(1, `rgba(180, 180, 180, 0)`);

      ctx.fillStyle = gradient;
      
      // Draw main star
      ctx.beginPath();
      ctx.arc(finalX, finalY, star.size, 0, Math.PI * 2);
      ctx.fill();

      // Add subtle cross pattern for larger stars
      if (star.size > 1.5) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        
        // Vertical line
        ctx.moveTo(finalX, finalY - star.size * 1.5);
        ctx.lineTo(finalX, finalY + star.size * 1.5);
        
        // Horizontal line
        ctx.moveTo(finalX - star.size * 1.5, finalY);
        ctx.lineTo(finalX + star.size * 1.5, finalY);
        
        ctx.stroke();
      }

      ctx.restore();
    });

    // Continue animation
    animationRef.current = requestAnimationFrame(() => animate(canvas, ctx));
  };

  // Setup canvas and start animation
  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const { devicePixelRatio = 1 } = window;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      canvas.width = displayWidth * devicePixelRatio;
      canvas.height = displayHeight * devicePixelRatio;

      ctx.scale(devicePixelRatio, devicePixelRatio);
      canvas.style.width = displayWidth + 'px';
      canvas.style.height = displayHeight + 'px';

      // Reinitialize stars when canvas resizes
      initializeStars(canvas);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Start animation
    animate(canvas, ctx);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isClient, starCount, intensity, enableParallax]);

  // Respect reduced motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = () => {
      if (mediaQuery.matches && animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      } else if (!mediaQuery.matches && canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) animate(canvasRef.current, ctx);
      }
    };

    if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(handleChange);
    } else {
      mediaQuery.addEventListener('change', handleChange);
    }
    handleChange();

    return () => {
      if (typeof mediaQuery.removeListener === 'function') {
        mediaQuery.removeListener(handleChange);
      } else {
        mediaQuery.removeEventListener('change', handleChange);
      }
    };
  }, []);

  if (!isClient) {
    return null; // Prevent SSR mismatch
  }

  return (
    <div className={`galaxy-background ${className}`}>
      {/* Main animated starfield */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none w-full h-full"
        style={{
          background: 'transparent',
          mixBlendMode: 'screen'
        }}
        aria-hidden="true"
        role="presentation"
      />
      
      {/* Static starfield overlay for additional depth */}
      <div className="fixed inset-0 starfield-overlay pointer-events-none" />
      
      {/* Cosmic depth overlay */}
      <div className="fixed inset-0 cosmic-depth pointer-events-none" />
    </div>
  );
};

export default GalaxyBackground;