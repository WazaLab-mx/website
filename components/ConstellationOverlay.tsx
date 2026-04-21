'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ConstellationPoint {
  x: number;
  y: number;
  connections: number[];
  brightness: number;
  twinklePhase: number;
}

interface ConstellationOverlayProps {
  className?: string;
  pointCount?: number;
  connectionDistance?: number;
  intensity?: 'subtle' | 'medium' | 'visible';
}

export const ConstellationOverlay: React.FC<ConstellationOverlayProps> = ({
  className = '',
  pointCount = 25,
  connectionDistance = 150,
  intensity = 'subtle'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const pointsRef = useRef<ConstellationPoint[]>([]);
  const [isClient, setIsClient] = useState(false);

  const config = {
    subtle: {
      pointOpacity: 0.2,
      lineOpacity: 0.1,
      maxConnections: 2
    },
    medium: {
      pointOpacity: 0.3,
      lineOpacity: 0.15,
      maxConnections: 3
    },
    visible: {
      pointOpacity: 0.4,
      lineOpacity: 0.2,
      maxConnections: 4
    }
  }[intensity];

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize constellation points
  const initializePoints = (canvas: HTMLCanvasElement) => {
    const points: ConstellationPoint[] = [];
    const { width, height } = canvas;

    // Create random points
    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        connections: [],
        brightness: 0.5 + Math.random() * 0.5,
        twinklePhase: Math.random() * Math.PI * 2
      });
    }

    // Calculate connections between nearby points
    points.forEach((point, index) => {
      const nearbyPoints: number[] = [];
      
      points.forEach((otherPoint, otherIndex) => {
        if (index !== otherIndex) {
          const distance = Math.sqrt(
            Math.pow(point.x - otherPoint.x, 2) + 
            Math.pow(point.y - otherPoint.y, 2)
          );
          
          if (distance < connectionDistance && nearbyPoints.length < config.maxConnections) {
            nearbyPoints.push(otherIndex);
          }
        }
      });

      point.connections = nearbyPoints;
    });

    pointsRef.current = points;
  };

  // Animation loop
  const animate = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const points = pointsRef.current;
    const time = Date.now() * 0.001;

    // Update and draw points
    points.forEach((point, index) => {
      // Update twinkle
      point.twinklePhase += 0.02;
      const twinkle = Math.sin(point.twinklePhase) * 0.3;
      const currentBrightness = Math.max(0.2, point.brightness + twinkle);

      // Draw connections first (so they appear behind points)
      point.connections.forEach(connectionIndex => {
        const connectedPoint = points[connectionIndex];
        if (connectedPoint) {
          ctx.save();
          
          // Calculate line opacity based on distance
          const distance = Math.sqrt(
            Math.pow(point.x - connectedPoint.x, 2) + 
            Math.pow(point.y - connectedPoint.y, 2)
          );
          const lineAlpha = config.lineOpacity * (1 - distance / connectionDistance);

          ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(connectedPoint.x, connectedPoint.y);
          ctx.stroke();
          
          ctx.restore();
        }
      });

      // Draw point
      ctx.save();
      
      const pointAlpha = config.pointOpacity * currentBrightness;
      
      // Create subtle glow
      const gradient = ctx.createRadialGradient(
        point.x, point.y, 0,
        point.x, point.y, 3
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${pointAlpha})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
      ctx.fill();

      // Add small central point
      ctx.fillStyle = `rgba(255, 255, 255, ${pointAlpha * 0.8})`;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 0.5, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    });

    animationRef.current = requestAnimationFrame(() => animate(canvas, ctx));
  };

  // Setup canvas and start animation
  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const { devicePixelRatio = 1 } = window;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      canvas.width = displayWidth * devicePixelRatio;
      canvas.height = displayHeight * devicePixelRatio;

      ctx.scale(devicePixelRatio, devicePixelRatio);
      canvas.style.width = displayWidth + 'px';
      canvas.style.height = displayHeight + 'px';

      initializePoints(canvas);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    animate(canvas, ctx);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isClient, pointCount, connectionDistance, intensity]);

  // Respect reduced motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = () => {
      if (mediaQuery.matches && animationRef.current) {
        cancelAnimationFrame(animationRef.current);
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
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{
        background: 'transparent',
        mixBlendMode: 'screen'
      }}
      aria-hidden="true"
      role="presentation"
    />
  );
};

export default ConstellationOverlay;