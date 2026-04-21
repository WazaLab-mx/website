'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { EnhancedAnimationSystem } from './EnhancedAnimationSystem';
import { OptimizedCanvasBackground } from './OptimizedCanvasBackground';
import ScrollAnimations from '../app/components/ui/scroll-animations';

interface AnimationConfig {
  enableScrollAnimations: boolean;
  enableCanvasBackground: boolean;
  enableMicroInteractions: boolean;
  enableParallax: boolean;
  performanceTier: 'auto' | 'high' | 'medium' | 'low';
  canvasType: 'galaxy' | 'constellation' | 'fractal' | 'particles';
  canvasIntensity: 'minimal' | 'subtle' | 'medium' | 'high';
  debugMode: boolean;
}

interface AnimationContextType {
  config: AnimationConfig;
  updateConfig: (updates: Partial<AnimationConfig>) => void;
  stats: {
    fps: number;
    animationsActive: number;
    performanceMode: string;
  };
}

const defaultConfig: AnimationConfig = {
  enableScrollAnimations: true,
  enableCanvasBackground: true,
  enableMicroInteractions: true,
  enableParallax: true,
  performanceTier: 'auto',
  canvasType: 'galaxy',
  canvasIntensity: 'subtle',
  debugMode: false
};

const AnimationContext = createContext<AnimationContextType | null>(null);

export const useAnimations = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimations must be used within AnimationProvider');
  }
  return context;
};

interface AnimationProviderProps {
  children: React.ReactNode;
  initialConfig?: Partial<AnimationConfig>;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({
  children,
  initialConfig = {}
}) => {
  const [config, setConfig] = useState<AnimationConfig>({
    ...defaultConfig,
    ...initialConfig
  });
  
  const [stats, setStats] = useState({
    fps: 60,
    animationsActive: 0,
    performanceMode: 'balanced'
  });

  const updateConfig = (updates: Partial<AnimationConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  // Auto-detect user preferences
  useEffect(() => {
    const detectPreferences = () => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        updateConfig({
          enableCanvasBackground: false,
          enableMicroInteractions: false,
          enableParallax: false,
          performanceTier: 'low'
        });
      }

      // Detect low-end devices
      const isLowEndDevice = 
        navigator.hardwareConcurrency <= 2 ||
        navigator.deviceMemory <= 2 ||
        /Mobile|Android|iPhone|iPad/.test(navigator.userAgent);
      
      if (isLowEndDevice && config.performanceTier === 'auto') {
        updateConfig({
          performanceTier: 'low',
          canvasIntensity: 'minimal'
        });
      }

      // Battery optimization
      if ('getBattery' in navigator) {
        (navigator as any).getBattery().then((battery: any) => {
          if (battery.level < 0.2 || !battery.charging) {
            updateConfig({
              performanceTier: 'low',
              enableCanvasBackground: false
            });
          }
        });
      }
    };

    detectPreferences();
  }, []);

  // Performance monitoring
  useEffect(() => {
    const monitorPerformance = () => {
      // Simple FPS counter
      let frameCount = 0;
      let lastTime = performance.now();
      
      const countFrame = () => {
        frameCount++;
        const now = performance.now();
        
        if (now - lastTime >= 1000) {
          const fps = Math.round(frameCount * 1000 / (now - lastTime));
          frameCount = 0;
          lastTime = now;
          
          setStats(prev => ({ 
            ...prev, 
            fps,
            performanceMode: fps > 45 ? 'high' : fps > 25 ? 'medium' : 'low'
          }));

          // Auto-adjust settings based on performance
          if (fps < 20 && config.performanceTier === 'auto') {
            updateConfig({ 
              performanceTier: 'low',
              canvasIntensity: 'minimal'
            });
          }
        }
        
        requestAnimationFrame(countFrame);
      };
      
      countFrame();
    };

    const timeoutId = setTimeout(monitorPerformance, 1000);
    return () => clearTimeout(timeoutId);
  }, [config.performanceTier]);

  const contextValue: AnimationContextType = {
    config,
    updateConfig,
    stats
  };

  return (
    <AnimationContext.Provider value={contextValue}>
      {/* Canvas Background */}
      {config.enableCanvasBackground && (
        <OptimizedCanvasBackground
          type={config.canvasType}
          intensity={config.canvasIntensity}
          enableInteraction={config.enableMicroInteractions}
          performanceMode={config.performanceTier}
        />
      )}

      {/* Enhanced Animation System */}
      {config.enableScrollAnimations && (
        <>
          <EnhancedAnimationSystem
            performanceTier={config.performanceTier}
            enableParallax={config.enableParallax}
            enableMicroInteractions={config.enableMicroInteractions}
            debugMode={config.debugMode}
          />
          <ScrollAnimations />
        </>
      )}

      {children}

      {/* Debug Panel */}
      {config.debugMode && (
        <DebugPanel stats={stats} config={config} updateConfig={updateConfig} />
      )}
    </AnimationContext.Provider>
  );
};

// Debug Panel Component
const DebugPanel: React.FC<{
  stats: AnimationContextType['stats'];
  config: AnimationConfig;
  updateConfig: (updates: Partial<AnimationConfig>) => void;
}> = ({ stats, config, updateConfig }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-50 font-mono text-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/80 text-white px-3 py-2 rounded-lg hover:bg-black/90 transition-colors"
      >
        🎭 Animations {isOpen ? '▼' : '▶'}
      </button>
      
      {isOpen && (
        <div className="mt-2 bg-black/90 text-white p-4 rounded-lg space-y-3 min-w-[300px]">
          <div className="border-b border-gray-600 pb-2">
            <h3 className="font-bold text-green-400">Performance Stats</h3>
            <div>FPS: {stats.fps}</div>
            <div>Mode: {stats.performanceMode}</div>
            <div>Active: {stats.animationsActive}</div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-bold text-blue-400">Settings</h3>
            
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config.enableScrollAnimations}
                onChange={(e) => updateConfig({ enableScrollAnimations: e.target.checked })}
                className="rounded"
              />
              Scroll Animations
            </label>
            
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config.enableCanvasBackground}
                onChange={(e) => updateConfig({ enableCanvasBackground: e.target.checked })}
                className="rounded"
              />
              Canvas Background
            </label>
            
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config.enableMicroInteractions}
                onChange={(e) => updateConfig({ enableMicroInteractions: e.target.checked })}
                className="rounded"
              />
              Micro Interactions
            </label>
            
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config.enableParallax}
                onChange={(e) => updateConfig({ enableParallax: e.target.checked })}
                className="rounded"
              />
              Parallax Effects
            </label>
            
            <div>
              <label className="block mb-1">Performance Tier:</label>
              <select
                value={config.performanceTier}
                onChange={(e) => updateConfig({ performanceTier: e.target.value as any })}
                className="bg-gray-800 text-white p-1 rounded text-xs w-full"
              >
                <option value="auto">Auto</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            
            <div>
              <label className="block mb-1">Canvas Type:</label>
              <select
                value={config.canvasType}
                onChange={(e) => updateConfig({ canvasType: e.target.value as any })}
                className="bg-gray-800 text-white p-1 rounded text-xs w-full"
              >
                <option value="galaxy">Galaxy</option>
                <option value="constellation">Constellation</option>
                <option value="fractal">Fractal</option>
                <option value="particles">Particles</option>
              </select>
            </div>
            
            <div>
              <label className="block mb-1">Canvas Intensity:</label>
              <select
                value={config.canvasIntensity}
                onChange={(e) => updateConfig({ canvasIntensity: e.target.value as any })}
                className="bg-gray-800 text-white p-1 rounded text-xs w-full"
              >
                <option value="minimal">Minimal</option>
                <option value="subtle">Subtle</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimationProvider;
