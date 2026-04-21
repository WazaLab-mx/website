'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';

interface OptimizedCanvasBackgroundProps {
  type?: 'galaxy' | 'constellation' | 'fractal' | 'particles';
  intensity?: 'minimal' | 'subtle' | 'medium' | 'high';
  enableInteraction?: boolean;
  performanceMode?: 'auto' | 'high' | 'balanced' | 'eco';
  className?: string;
}

interface ParticleSystem {
  particles: Particle[];
  lastUpdate: number;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  settings: ParticleSettings;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  type: number;
}

interface ParticleSettings {
  count: number;
  speed: number;
  size: { min: number; max: number };
  opacity: { min: number; max: number };
  life: { min: number; max: number };
  updateFrequency: number;
  interactionRadius: number;
}

const PERFORMANCE_CONFIGS = {
  high: { fps: 60, particles: 150, quality: 1.0, features: ['interaction', 'trails', 'glow'] },
  balanced: { fps: 30, particles: 100, quality: 0.8, features: ['interaction', 'glow'] },
  eco: { fps: 15, particles: 50, quality: 0.6, features: ['basic'] }
} as const;

class PerformanceManager {
  private frameCount = 0;
  private lastTime = performance.now();
  private avgFPS = 60;
  private targetFPS: number;
  private currentMode: keyof typeof PERFORMANCE_CONFIGS;

  constructor(initialMode: keyof typeof PERFORMANCE_CONFIGS = 'balanced') {
    this.currentMode = initialMode;
    this.targetFPS = PERFORMANCE_CONFIGS[initialMode].fps;
  }

  update(): boolean {
    const now = performance.now();
    this.frameCount++;

    if (now - this.lastTime >= 1000) {
      this.avgFPS = this.frameCount * 1000 / (now - this.lastTime);
      this.frameCount = 0;
      this.lastTime = now;

      // Auto-adjust performance mode
      if (this.avgFPS < this.targetFPS * 0.7) {
        this.downgradePerformance();
      } else if (this.avgFPS > this.targetFPS * 1.2 && this.currentMode !== 'high') {
        this.upgradePerformance();
      }
    }

    return this.avgFPS > this.targetFPS * 0.8;
  }

  private downgradePerformance() {
    const modes: (keyof typeof PERFORMANCE_CONFIGS)[] = ['high', 'balanced', 'eco'];
    const currentIndex = modes.indexOf(this.currentMode);
    if (currentIndex < modes.length - 1) {
      this.currentMode = modes[currentIndex + 1];
      this.targetFPS = PERFORMANCE_CONFIGS[this.currentMode].fps;
    }
  }

  private upgradePerformance() {
    const modes: (keyof typeof PERFORMANCE_CONFIGS)[] = ['high', 'balanced', 'eco'];
    const currentIndex = modes.indexOf(this.currentMode);
    if (currentIndex > 0) {
      this.currentMode = modes[currentIndex - 1];
      this.targetFPS = PERFORMANCE_CONFIGS[this.currentMode].fps;
    }
  }

  getConfig() {
    return { mode: this.currentMode, ...PERFORMANCE_CONFIGS[this.currentMode] };
  }

  getFPS() {
    return Math.round(this.avgFPS);
  }
}

class OptimizedParticleSystem {
  private system: ParticleSystem;
  private perfManager: PerformanceManager;
  private animationId: number | null = null;
  private mousePos = { x: 0, y: 0 };
  private enableInteraction: boolean;
  private lastMouseUpdate = 0;
  private particlePool: Particle[] = [];
  private activeParticles = 0;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    type: string,
    intensity: string,
    enableInteraction: boolean,
    performanceMode: string
  ) {
    this.enableInteraction = enableInteraction;
    this.perfManager = new PerformanceManager(
      performanceMode === 'auto' ? 'balanced' : performanceMode as keyof typeof PERFORMANCE_CONFIGS
    );

    this.system = {
      particles: [],
      lastUpdate: performance.now(),
      ctx,
      canvas,
      settings: this.getParticleSettings(type, intensity)
    };

    this.initializeParticlePool();
    this.setupEventListeners();
  }

  private getParticleSettings(type: string, intensity: string): ParticleSettings {
    const intensityMultiplier = {
      minimal: 0.3,
      subtle: 0.6,
      medium: 1.0,
      high: 1.5
    }[intensity] || 1.0;

    const baseSettings = {
      galaxy: {
        count: Math.floor(100 * intensityMultiplier),
        speed: 0.5,
        size: { min: 0.5, max: 2.5 },
        opacity: { min: 0.2, max: 0.8 },
        life: { min: 3000, max: 8000 },
        updateFrequency: 16,
        interactionRadius: 100
      },
      constellation: {
        count: Math.floor(80 * intensityMultiplier),
        speed: 0.3,
        size: { min: 1, max: 3 },
        opacity: { min: 0.3, max: 0.9 },
        life: { min: 5000, max: 12000 },
        updateFrequency: 32,
        interactionRadius: 150
      },
      fractal: {
        count: Math.floor(60 * intensityMultiplier),
        speed: 0.2,
        size: { min: 0.8, max: 2 },
        opacity: { min: 0.1, max: 0.6 },
        life: { min: 4000, max: 10000 },
        updateFrequency: 24,
        interactionRadius: 80
      },
      particles: {
        count: Math.floor(120 * intensityMultiplier),
        speed: 1.0,
        size: { min: 0.5, max: 1.5 },
        opacity: { min: 0.4, max: 1.0 },
        life: { min: 2000, max: 6000 },
        updateFrequency: 16,
        interactionRadius: 120
      }
    };

    return baseSettings[type as keyof typeof baseSettings] || baseSettings.particles;
  }

  private initializeParticlePool() {
    const config = this.perfManager.getConfig();
    const maxParticles = Math.min(this.system.settings.count, config.particles);
    
    this.particlePool = Array.from({ length: maxParticles }, () => this.createParticle());
    this.activeParticles = maxParticles;
  }

  private createParticle(): Particle {
    const { canvas, settings } = this.system;
    const life = settings.life.min + Math.random() * (settings.life.max - settings.life.min);
    
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * settings.speed,
      vy: (Math.random() - 0.5) * settings.speed,
      size: settings.size.min + Math.random() * (settings.size.max - settings.size.min),
      opacity: settings.opacity.min + Math.random() * (settings.opacity.max - settings.opacity.min),
      life: life,
      maxLife: life,
      type: Math.floor(Math.random() * 3)
    };
  }

  private setupEventListeners() {
    if (!this.enableInteraction) return;

    const updateMouse = (e: MouseEvent) => {
      const rect = this.system.canvas.getBoundingClientRect();
      this.mousePos.x = e.clientX - rect.left;
      this.mousePos.y = e.clientY - rect.top;
      this.lastMouseUpdate = performance.now();
    };

    this.system.canvas.addEventListener('mousemove', updateMouse, { passive: true });
  }

  private updateParticle(particle: Particle, deltaTime: number) {
    // Update position
    particle.x += particle.vx * deltaTime * 0.1;
    particle.y += particle.vy * deltaTime * 0.1;
    
    // Update life
    particle.life -= deltaTime;
    
    // Handle boundaries with wrapping
    if (particle.x < 0) particle.x = this.system.canvas.width;
    if (particle.x > this.system.canvas.width) particle.x = 0;
    if (particle.y < 0) particle.y = this.system.canvas.height;
    if (particle.y > this.system.canvas.height) particle.y = 0;

    // Mouse interaction
    if (this.enableInteraction && performance.now() - this.lastMouseUpdate < 1000) {
      const dx = this.mousePos.x - particle.x;
      const dy = this.mousePos.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < this.system.settings.interactionRadius) {
        const force = (this.system.settings.interactionRadius - distance) / this.system.settings.interactionRadius;
        particle.vx -= dx * force * 0.001;
        particle.vy -= dy * force * 0.001;
      }
    }

    // Respawn if dead
    if (particle.life <= 0) {
      Object.assign(particle, this.createParticle());
    }
  }

  private drawParticle(particle: Particle) {
    const { ctx } = this.system;
    const lifeRatio = particle.life / particle.maxLife;
    const alpha = particle.opacity * lifeRatio;
    
    if (alpha < 0.01) return;

    ctx.save();
    ctx.globalAlpha = alpha;
    
    // Create gradient for glow effect
    const gradient = ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, particle.size * 2
    );
    
    gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
    gradient.addColorStop(0.6, `rgba(255, 255, 255, ${alpha * 0.3})`);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Add sparkle effect for some particles
    if (particle.type === 0 && particle.size > 1.5) {
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(particle.x - particle.size, particle.y);
      ctx.lineTo(particle.x + particle.size, particle.y);
      ctx.moveTo(particle.x, particle.y - particle.size);
      ctx.lineTo(particle.x, particle.y + particle.size);
      ctx.stroke();
    }
    
    ctx.restore();
  }

  animate() {
    const now = performance.now();
    const deltaTime = now - this.system.lastUpdate;
    
    // Performance check
    const shouldContinue = this.perfManager.update();
    if (!shouldContinue && deltaTime < this.system.settings.updateFrequency) {
      this.animationId = requestAnimationFrame(() => this.animate());
      return;
    }

    this.system.lastUpdate = now;
    
    // Clear canvas
    this.system.ctx.clearRect(0, 0, this.system.canvas.width, this.system.canvas.height);
    
    // Update performance-based particle count
    const config = this.perfManager.getConfig();
    const targetParticles = Math.min(this.system.settings.count, config.particles);
    
    if (targetParticles !== this.activeParticles) {
      this.activeParticles = targetParticles;
    }

    // Update and draw particles
    for (let i = 0; i < this.activeParticles; i++) {
      const particle = this.particlePool[i];
      if (particle) {
        this.updateParticle(particle, deltaTime);
        this.drawParticle(particle);
      }
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  start() {
    if (!this.animationId) {
      this.animate();
    }
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  resize(width: number, height: number) {
    this.system.canvas.width = width;
    this.system.canvas.height = height;
    
    // Reset particles to new bounds
    this.particlePool.forEach(particle => {
      if (particle.x > width) particle.x = width - 10;
      if (particle.y > height) particle.y = height - 10;
    });
  }

  getStats() {
    return {
      fps: this.perfManager.getFPS(),
      mode: this.perfManager.getConfig().mode,
      particles: this.activeParticles
    };
  }
}

export const OptimizedCanvasBackground: React.FC<OptimizedCanvasBackgroundProps> = ({
  type = 'galaxy',
  intensity = 'subtle',
  enableInteraction = true,
  performanceMode = 'auto',
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const systemRef = useRef<OptimizedParticleSystem | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [stats, setStats] = useState({ fps: 60, mode: 'balanced', particles: 0 });

  // Memoize settings to prevent unnecessary recreations
  const settings = useMemo(() => ({
    type, intensity, enableInteraction, performanceMode
  }), [type, intensity, enableInteraction, performanceMode]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Setup canvas
    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    setupCanvas();

    // Create particle system
    systemRef.current = new OptimizedParticleSystem(
      canvas,
      ctx,
      settings.type,
      settings.intensity,
      settings.enableInteraction,
      settings.performanceMode
    );

    systemRef.current.start();

    // Handle resize
    const handleResize = () => {
      setupCanvas();
      if (systemRef.current) {
        systemRef.current.resize(canvas.clientWidth, canvas.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Stats update interval
    const statsInterval = setInterval(() => {
      if (systemRef.current) {
        setStats(systemRef.current.getStats());
      }
    }, 1000);

    // Handle reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => {
      if (systemRef.current) {
        if (mediaQuery.matches) {
          systemRef.current.stop();
        } else {
          systemRef.current.start();
        }
      }
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    handleMotionChange();

    return () => {
      if (systemRef.current) {
        systemRef.current.stop();
      }
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMotionChange);
      clearInterval(statsInterval);
    };
  }, [isClient, settings]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none w-full h-full -z-10 ${className}`}
        style={{
          background: 'transparent',
          mixBlendMode: 'screen'
        }}
        aria-hidden="true"
        role="presentation"
      />
      
      {/* Performance indicator (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-black/50 text-white text-xs p-2 rounded font-mono">
          FPS: {stats.fps} | Mode: {stats.mode} | Particles: {stats.particles}
        </div>
      )}
    </>
  );
};

export default OptimizedCanvasBackground;
