'use client';

import React from 'react';
import { useAnimations } from './AnimationProvider';

export const AnimationExamples: React.FC = () => {
  const { config } = useAnimations();

  return (
    <div className="space-y-16 p-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 smooth-reveal">
          Enhanced Animation System
        </h1>
        <p className="text-lg text-muted-foreground fade-in-up stagger-1">
          Experience next-level web animations with performance optimization
        </p>
      </section>

      {/* Basic Animations */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold elastic-scale">Basic Animations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="scale-on-scroll stagger-1 p-6 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Scale on Scroll</h3>
            <p className="text-sm text-muted-foreground">
              Smooth scaling animation triggered by scroll position
            </p>
          </div>
          
          <div className="fade-in-up stagger-2 p-6 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Fade In Up</h3>
            <p className="text-sm text-muted-foreground">
              Classic fade and slide animation from bottom
            </p>
          </div>
          
          <div className="slide-in-right stagger-3 p-6 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Slide In Right</h3>
            <p className="text-sm text-muted-foreground">
              Smooth slide animation from the right side
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Animations */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold wave-entrance">Enhanced Animations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="smooth-reveal p-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border">
            <h3 className="font-semibold mb-4">Smooth Reveal</h3>
            <p className="text-muted-foreground mb-4">
              Advanced reveal animation with scale and position transitions
            </p>
            <div className="space-y-2">
              <div className="h-2 bg-primary/20 rounded stagger-1"></div>
              <div className="h-2 bg-primary/15 rounded stagger-2"></div>
              <div className="h-2 bg-primary/10 rounded stagger-3"></div>
            </div>
          </div>
          
          <div className="depth-reveal p-8 bg-gradient-to-br from-accent/5 to-muted/5 rounded-xl border">
            <h3 className="font-semibold mb-4">Depth Reveal</h3>
            <p className="text-muted-foreground mb-4">
              3D perspective animation creating depth illusion
            </p>
            <div className="w-full h-32 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Interactive Elements */}
      {config.enableMicroInteractions && (
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold elastic-scale">Interactive Elements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="magnetic-hover micro-bounce p-4 bg-primary text-primary-foreground rounded-lg transition-all hover:shadow-lg">
              Magnetic Hover
            </button>
            
            <button className="smooth-interaction subtle-glow p-4 bg-secondary text-secondary-foreground rounded-lg">
              Smooth Interaction
            </button>
            
            <div className="premium-hover gpu-accelerated p-4 bg-accent text-accent-foreground rounded-lg cursor-pointer">
              Premium Hover
            </div>
            
            <div className="floating gentle-pulse p-4 bg-muted text-muted-foreground rounded-lg text-center">
              Floating & Pulse
            </div>
          </div>
        </section>
      )}

      {/* Parallax Elements */}
      {config.enableParallax && (
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold slide-in-left">Parallax Effects</h2>
          
          <div className="relative h-96 overflow-hidden rounded-xl bg-gradient-to-b from-primary/10 to-secondary/10">
            <div className="parallax-float absolute inset-0 flex items-center justify-center" data-parallax-speed="0.5">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-4">Parallax Background</h3>
                <p className="text-lg text-muted-foreground">Moves at different speed than scroll</p>
              </div>
            </div>
            
            <div className="parallax-float absolute top-10 left-10 w-16 h-16 bg-primary/30 rounded-full" data-parallax-speed="0.8"></div>
            <div className="parallax-float absolute bottom-10 right-10 w-12 h-12 bg-secondary/30 rounded-full" data-parallax-speed="0.3"></div>
            <div className="parallax-float absolute top-1/2 left-1/4 w-8 h-8 bg-accent/30 rounded-full" data-parallax-speed="0.6"></div>
          </div>
        </section>
      )}

      {/* Wave Entrance */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold wave-entrance">Wave Entrance</h2>
        
        <div className="wave-entrance space-y-4">
          <div className="p-4 bg-card rounded-lg border">Child Element 1</div>
          <div className="p-4 bg-card rounded-lg border">Child Element 2</div>
          <div className="p-4 bg-card rounded-lg border">Child Element 3</div>
          <div className="p-4 bg-card rounded-lg border">Child Element 4</div>
        </div>
      </section>

      {/* Performance Info */}
      <section className="stagger-fade-in text-center py-16">
        <h2 className="text-2xl font-semibold mb-4 stagger-1">Performance Optimized</h2>
        <p className="text-muted-foreground mb-8 stagger-2">
          All animations are GPU-accelerated and respect user preferences
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="scale-on-scroll stagger-1 p-6 bg-card rounded-lg border text-center">
            <div className="text-2xl font-bold text-green-500 mb-2">60 FPS</div>
            <div className="text-sm text-muted-foreground">Target Frame Rate</div>
          </div>
          
          <div className="scale-on-scroll stagger-2 p-6 bg-card rounded-lg border text-center">
            <div className="text-2xl font-bold text-blue-500 mb-2">GPU</div>
            <div className="text-sm text-muted-foreground">Hardware Accelerated</div>
          </div>
          
          <div className="scale-on-scroll stagger-3 p-6 bg-card rounded-lg border text-center">
            <div className="text-2xl font-bold text-purple-500 mb-2">Auto</div>
            <div className="text-sm text-muted-foreground">Performance Scaling</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnimationExamples;
