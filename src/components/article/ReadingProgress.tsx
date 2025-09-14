"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    // Update on scroll
    window.addEventListener("scroll", updateProgress);
    
    // Initial calculation
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-0.5 z-50 bg-gray-100">
      <div
        className="h-full transition-all duration-150 ease-out"
        style={{ 
          width: `${progress}%`,
          backgroundColor: '#F7B096'
        }}
      />
    </div>
  );
}
