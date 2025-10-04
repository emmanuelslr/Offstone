'use client';

import Image from 'next/image';
import { useState, useRef, useEffect, useMemo } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  style,
  onLoad,
  onError,
  placeholder = 'blur',
  blurDataURL,
  loading = 'lazy',
  decoding = 'async',
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Optimiser les formats d'image
  const optimizedSrc = useMemo(() => {
    if (!src) return src;
    
    // Si c'est une image Prismic, optimiser l'URL
    if (src.includes('images.prismic.io')) {
      const url = new URL(src);
      // Ajouter des paramètres d'optimisation
      url.searchParams.set('auto', 'format,compress');
      url.searchParams.set('q', quality.toString());
      return url.toString();
    }
    
    return src;
  }, [src, quality]);

  // Générer un placeholder optimisé
  const optimizedBlurDataURL = useMemo(() => {
    if (blurDataURL) return blurDataURL;
    
    // Placeholder SVG optimisé
    const svg = `
      <svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)"/>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#e5e7eb;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#d1d5db;stop-opacity:1" />
          </linearGradient>
        </defs>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }, [width, height, blurDataURL]);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px', // Augmenter la marge pour un chargement plus précoce
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Calculer les tailles optimisées
  const optimizedSizes = useMemo(() => {
    if (sizes) return sizes;
    
    // Tailles par défaut optimisées
    return '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw';
  }, [sizes]);

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      {isInView && !hasError ? (
        <Image
          src={optimizedSrc}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          priority={priority}
          quality={quality}
          sizes={optimizedSizes}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          placeholder={placeholder}
          blurDataURL={optimizedBlurDataURL}
          loading={loading}
          decoding={decoding}
          // Optimisations avancées
          unoptimized={false}
          draggable={false}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      ) : hasError ? (
        <div
          className="bg-gray-200 flex items-center justify-center text-gray-500"
          style={{
            width: fill ? '100%' : width,
            height: fill ? '100%' : height,
          }}
        >
          <span className="text-sm">Image non disponible</span>
        </div>
      ) : (
        <div
          className="bg-gray-200 animate-pulse"
          style={{
            width: fill ? '100%' : width,
            height: fill ? '100%' : height,
          }}
        />
      )}
    </div>
  );
}
