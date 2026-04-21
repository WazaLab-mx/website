'use client';

import React, { useEffect, useRef, useMemo } from 'react';

interface FractalBackgroundProps {
  variant?: 'mandelbrot' | 'julia' | 'sierpinski' | 'geometric';
  intensity?: 'subtle' | 'medium' | 'strong';
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
  overlay?: boolean;
}

export const FractalBackground: React.FC<FractalBackgroundProps> = ({
  variant = 'mandelbrot',
  intensity = 'subtle',
  speed = 'slow',
  className = '',
  overlay = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef<number>(0);

  const config = useMemo(() => ({
    opacity: {
      subtle: 0.015,
      medium: 0.025,
      strong: 0.035
    }[intensity],
    breathingSpeed: {
      slow: 0.0002,
      medium: 0.0003,
      fast: 0.0004
    }[speed],
    complexity: {
      subtle: 120,
      medium: 150,
      strong: 200
    }[intensity]
  }), [intensity, speed]);

  const generateStaticDepthPattern = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number
  ) => {
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    // Subtle breathing effect - very gentle opacity change
    const breathingOpacity = config.opacity * (0.8 + Math.sin(time) * 0.2);
    
    // Static fractal-like pattern for depth
    for (let x = 0; x < width; x += 3) {
      for (let y = 0; y < height; y += 3) {
        const zx = (x - width / 2) / (width / 4);
        const zy = (y - height / 2) / (height / 4);
        
        let cx = zx;
        let cy = zy;
        let i = 0;
        
        // Static mandelbrot calculation
        while (i < config.complexity && cx * cx + cy * cy < 4) {
          const tmp = cx * cx - cy * cy + zx;
          cy = 2 * cx * cy + zy;
          cx = tmp;
          i++;
        }
        
        const intensity = i / config.complexity;
        const alpha = Math.floor(255 * breathingOpacity * intensity);
        
        const index = (y * width + x) * 4;
        data[index] = 0;     // R - Pure black
        data[index + 1] = 0; // G 
        data[index + 2] = 0; // B
        data[index + 3] = alpha; // A - Very subtle
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  };

  const generateStaticGeometricPattern = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number
  ) => {
    ctx.clearRect(0, 0, width, height);
    
    // Subtle breathing opacity
    const breathingOpacity = config.opacity * (0.9 + Math.sin(time) * 0.1);
    ctx.globalAlpha = breathingOpacity;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 0.5;
    
    const gridSize = 60;
    
    // Static geometric grid pattern for depth
    for (let x = 0; x < width + gridSize; x += gridSize) {
      for (let y = 0; y < height + gridSize; y += gridSize) {
        const centerX = x + gridSize / 2;
        const centerY = y + gridSize / 2;
        
        // Static circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
        ctx.stroke();
        
        // Static square overlay
        ctx.beginPath();
        ctx.rect(centerX - 6, centerY - 6, 12, 12);
        ctx.stroke();
      }
    }
    
    ctx.globalAlpha = 1;
  };

  const generateStaticTrianglePattern = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number
  ) => {
    ctx.clearRect(0, 0, width, height);
    
    // Subtle breathing opacity
    const breathingOpacity = config.opacity * (0.85 + Math.sin(time) * 0.15);
    
    const drawStaticTriangles = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, depth: number) => {
      if (depth === 0) {
        ctx.globalAlpha = breathingOpacity;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 0.3;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.stroke();
        return;
      }
      
      const mx1 = (x1 + x2) / 2;
      const my1 = (y1 + y2) / 2;
      const mx2 = (x2 + x3) / 2;
      const my2 = (y2 + y3) / 2;
      const mx3 = (x3 + x1) / 2;
      const my3 = (y3 + y1) / 2;
      
      drawStaticTriangles(x1, y1, mx1, my1, mx3, my3, depth - 1);
      drawStaticTriangles(mx1, my1, x2, y2, mx2, my2, depth - 1);
      drawStaticTriangles(mx3, my3, mx2, my2, x3, y3, depth - 1);
    };
    
    const centerX = width / 2;
    const centerY = height / 2;
    const size = Math.min(width, height) * 0.2;
    
    // Static triangle pattern
    drawStaticTriangles(
      centerX, centerY - size,
      centerX - size * 0.866, centerY + size * 0.5,
      centerX + size * 0.866, centerY + size * 0.5,
      4
    );
    
    ctx.globalAlpha = 1;
  };

  const generateStaticPatternGrid = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number
  ) => {
    ctx.clearRect(0, 0, width, height);
    
    // Subtle breathing opacity
    const breathingOpacity = config.opacity * (0.7 + Math.sin(time) * 0.3);
    ctx.globalAlpha = breathingOpacity;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 0.4;
    
    const gridSize = 80;
    
    // Static geometric grid pattern
    for (let x = 0; x < width + gridSize; x += gridSize) {
      for (let y = 0; y < height + gridSize; y += gridSize) {
        const centerX = x + gridSize / 2;
        const centerY = y + gridSize / 2;
        
        // Alternate between circles and squares in a pattern
        const isCircle = (Math.floor(x / gridSize) + Math.floor(y / gridSize)) % 2 === 0;
        const size = 12;
        
        if (isCircle) {
          // Static circle
          ctx.beginPath();
          ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          // Static square
          ctx.beginPath();
          ctx.rect(centerX - size / 2, centerY - size / 2, size, size);
          ctx.stroke();
        }
      }
    }
    
    ctx.globalAlpha = 1;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const animate = () => {
      resizeCanvas();
      
      const { width, height } = canvas;
      timeRef.current += config.breathingSpeed;
      
      switch (variant) {
        case 'mandelbrot':
          generateStaticDepthPattern(ctx, width, height, timeRef.current);
          break;
        case 'julia':
          generateStaticGeometricPattern(ctx, width, height, timeRef.current);
          break;
        case 'sierpinski':
          generateStaticTrianglePattern(ctx, width, height, timeRef.current);
          break;
        case 'geometric':
          generateStaticPatternGrid(ctx, width, height, timeRef.current);
          break;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [variant, config]);

  return (
    <canvas
      ref={canvasRef}
      className={`
        pointer-events-none
        ${overlay ? 'absolute inset-0 z-0' : 'fixed inset-0 -z-10'}
        ${className}
      `}
      style={{
        mixBlendMode: 'multiply'
      }}
    />
  );
};

// Static SVG patterns for subtle background depth effects
export const SVGFractalPattern: React.FC<{
  variant?: 'koch' | 'dragon' | 'fern' | 'tree';
  className?: string;
}> = ({ variant = 'koch', className = '' }) => {
  const patterns = {
    koch: (
      <svg className="w-full h-full absolute inset-0 opacity-2" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="static-koch-pattern" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M0,12 L6,2 L12,12 L18,2 L24,12" stroke="#000" strokeWidth="0.3" fill="none" opacity="0.4" />
            <path d="M2,20 L8,10 L14,20 L20,10" stroke="#000" strokeWidth="0.2" fill="none" opacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#static-koch-pattern)" />
      </svg>
    ),
    dragon: (
      <svg className="w-full h-full absolute inset-0 opacity-3" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <path d="M20,50 Q30,30 40,50 Q50,70 60,50 Q70,30 80,50" stroke="#000" strokeWidth="0.2" fill="none" opacity="0.4" />
        <path d="M10,30 Q20,10 30,30 Q40,50 50,30 Q60,10 70,30" stroke="#000" strokeWidth="0.1" fill="none" opacity="0.2" />
        <path d="M30,70 Q40,50 50,70 Q60,90 70,70 Q80,50 90,70" stroke="#000" strokeWidth="0.1" fill="none" opacity="0.2" />
      </svg>
    ),
    fern: (
      <svg className="w-full h-full absolute inset-0 opacity-2" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <g opacity="0.3">
          <path d="M50,90 Q45,70 50,50 Q55,30 50,10" stroke="#000" strokeWidth="0.3" fill="none" />
          <path d="M50,30 Q40,25 45,35" stroke="#000" strokeWidth="0.15" fill="none" />
          <path d="M50,40 Q60,35 55,45" stroke="#000" strokeWidth="0.15" fill="none" />
          <path d="M50,50 Q40,45 45,55" stroke="#000" strokeWidth="0.15" fill="none" />
          <path d="M50,60 Q60,55 55,65" stroke="#000" strokeWidth="0.15" fill="none" />
          
          {/* Additional static fern branches */}
          <path d="M25,85 Q20,65 25,45 Q30,25 25,5" stroke="#000" strokeWidth="0.2" fill="none" opacity="0.5" />
          <path d="M75,85 Q80,65 75,45 Q70,25 75,5" stroke="#000" strokeWidth="0.2" fill="none" opacity="0.5" />
        </g>
      </svg>
    ),
    tree: (
      <svg className="w-full h-full absolute inset-0 opacity-3" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <g opacity="0.4">
          <line x1="50" y1="90" x2="50" y2="60" stroke="#000" strokeWidth="0.4" />
          <line x1="50" y1="70" x2="40" y2="50" stroke="#000" strokeWidth="0.3" />
          <line x1="50" y1="70" x2="60" y2="50" stroke="#000" strokeWidth="0.3" />
          <line x1="40" y1="60" x2="30" y2="40" stroke="#000" strokeWidth="0.2" />
          <line x1="40" y1="60" x2="50" y2="40" stroke="#000" strokeWidth="0.2" />
          <line x1="60" y1="60" x2="50" y2="40" stroke="#000" strokeWidth="0.2" />
          <line x1="60" y1="60" x2="70" y2="40" stroke="#000" strokeWidth="0.2" />
          
          {/* Additional static tree branches for depth */}
          <line x1="30" y1="40" x2="20" y2="25" stroke="#000" strokeWidth="0.15" opacity="0.6" />
          <line x1="70" y1="40" x2="80" y2="25" stroke="#000" strokeWidth="0.15" opacity="0.6" />
          <line x1="25" y1="80" x2="25" y2="50" stroke="#000" strokeWidth="0.25" opacity="0.3" />
          <line x1="75" y1="80" x2="75" y2="50" stroke="#000" strokeWidth="0.25" opacity="0.3" />
        </g>
      </svg>
    )
  };

  return (
    <div className={`pointer-events-none ${className}`}>
      {patterns[variant]}
    </div>
  );
};

export default FractalBackground;