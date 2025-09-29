import Link from 'next/link';

interface InternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
  rel?: string;
  target?: string;
}

export default function InternalLink({
  href,
  children,
  className = '',
  title,
  rel,
  target
}: InternalLinkProps) {
  // Liens internes optimisés pour le SEO
  const isInternal = href.startsWith('/') || href.includes('offstone.fr');
  
  if (isInternal) {
    return (
      <Link 
        href={href} 
        className={className}
        title={title}
        rel={rel}
      >
        {children}
      </Link>
    );
  }

  // Liens externes avec rel="noopener noreferrer"
  return (
    <a 
      href={href} 
      className={className}
      title={title}
      rel={rel || "noopener noreferrer"}
      target={target || "_blank"}
    >
      {children}
    </a>
  );
}

// Composant spécialisé pour les liens vers les ressources Jonathan Anguelov
export function JonathanAnguelovLink({ 
  href, 
  children, 
  className = '' 
}: { 
  href: string; 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <InternalLink 
      href={href} 
      className={className}
      title={`${children} - Ressources Jonathan Anguelov Offstone`}
    >
      {children}
    </InternalLink>
  );
}

// Composant spécialisé pour les liens vers les deals
export function DealsLink({ 
  href, 
  children, 
  className = '' 
}: { 
  href: string; 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <InternalLink 
      href={href} 
      className={className}
      title={`${children} - Club de deals immobiliers Offstone`}
    >
      {children}
    </InternalLink>
  );
}
