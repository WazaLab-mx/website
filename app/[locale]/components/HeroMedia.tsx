'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface HeroMediaProps {
  src: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
}

export default function HeroMedia({ src, width, height, alt, className }: HeroMediaProps) {
  const isVideo = src.endsWith('.mp4');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const t = useTranslations('common.heroMedia');

  useEffect(() => {
    if (isVideo && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error);
      });
    }
  }, [isVideo]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (isVideo) {
    return (
      <div className="w-full h-full relative group">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          controls
          className={`${className} w-full h-full opacity-100 group-hover:opacity-90 transition-opacity duration-200`}
          style={{
            objectFit: 'cover',
          }}
          onError={(e) => console.error('Video error:', e)}
        >
          <source src={src} type="video/mp4" />
          {t('browserNotSupported')}
        </video>
        <Button
          onClick={toggleMute}
          variant="secondary"
          size="icon"
          className={`absolute top-4 right-4 z-20 bg-black/70 hover:bg-black/90 text-white border-2 border-white/20 hover:border-white/40 backdrop-blur-md shadow-xl transition-all duration-300 rounded-full h-12 w-12 ${
            isMuted ? 'animate-pulse hover:animate-none' : ''
          }`}
          aria-label={isMuted ? t('enableAudio') : t('disableAudio')}
          title={isMuted ? t('clickToEnable') : t('clickToMute')}
        >
          {isMuted ? (
            <VolumeX className="h-6 w-6 transition-transform duration-300 hover:scale-110" />
          ) : (
            <Volume2 className="h-6 w-6 transition-transform duration-300 hover:scale-110" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <Image
        src={src}
        fill
        alt={alt}
        className={`${className} object-cover`}
      />
    </div>
  );
}