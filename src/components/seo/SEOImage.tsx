import Image from 'next/image';

interface SEOImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
}

export default function SEOImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85
}: SEOImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      sizes={sizes}
      quality={quality}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
    />
  );
}

// Composant spécialisé pour les images de Jonathan Anguelov
export function JonathanAnguelovImage({ 
  src, 
  className = '', 
  priority = false 
}: { 
  src: string; 
  className?: string; 
  priority?: boolean; 
}) {
  return (
    <SEOImage
      src={src}
      alt="Jonathan Anguelov - Fondateur d'Offstone et expert en investissement immobilier professionnel"
      width={400}
      height={400}
      priority={priority}
      className={className}
      quality={90}
    />
  );
}

// Composant spécialisé pour les images d'Offstone
export function OffstoneImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  priority = false 
}: { 
  src: string; 
  alt: string; 
  width: number; 
  height: number; 
  className?: string; 
  priority?: boolean; 
}) {
  return (
    <SEOImage
      src={src}
      alt={`${alt} - Offstone investissement immobilier avec Jonathan Anguelov`}
      width={width}
      height={height}
      priority={priority}
      className={className}
      quality={90}
    />
  );
}
