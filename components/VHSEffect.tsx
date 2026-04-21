"use client"

import React from 'react'

interface VHSEffectProps {
  children: React.ReactNode;
}

export const VHSEffect: React.FC<VHSEffectProps> = ({ children }) => {
  return (
    <div className="relative w-full h-full min-h-screen">
      {/* VHS Effect Layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Color channels */}
        <div
          className="absolute inset-0 mix-blend-screen opacity-50 animate-vhs-r pointer-events-none"
          style={{ backgroundColor: 'rgba(255,0,0,0.5)' }}
        />
        <div
          className="absolute inset-0 mix-blend-screen opacity-50 animate-vhs-g pointer-events-none"
          style={{ backgroundColor: 'rgba(0,255,0,0.5)' }}
        />
        <div
          className="absolute inset-0 mix-blend-screen opacity-50 animate-vhs-b pointer-events-none"
          style={{ backgroundColor: 'rgba(0,0,255,0.5)' }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 mix-blend-overlay animate-vhs-noise pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.15
          }}
        />

        {/* Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.2) 0px, rgba(0,0,0,0.2) 1px, transparent 1px, transparent 2px)',
            backgroundSize: '100% 4px',
            opacity: 0.3
          }}
        />

        {/* Moving scanline */}
        <div
          className="absolute inset-0 animate-vhs-scan pointer-events-none"
          style={{
            background: 'linear-gradient(transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
            height: '10px'
          }}
        />

        {/* Vignette effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default VHSEffect