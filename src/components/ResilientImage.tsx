import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle = 'Matvac Mobile Detailing',
  fallbackSubtitle = 'On-site Automotive Restoration · Seremban',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 text-slate-200 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Sparkles className="w-8 h-8 text-sky-400 mb-3 opacity-80" />
        <p className="font-display font-semibold text-sm text-white tracking-tight">
          {fallbackTitle}
        </p>
        <p className="text-xs text-slate-400 mt-1">{fallbackSubtitle}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
};
