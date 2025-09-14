"use client";
import { useEffect } from "react";

export default function LeadOverlay({
  open,
  onClose,
  children,
  width = 960,
  heightVh = 72,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
  heightVh?: number;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className="relative w-[94vw] rounded-2xl bg-white shadow-2xl overflow-hidden"
          style={{ maxWidth: `${width}px`, height: `min(${heightVh}vh, 840px)` }}
          role="dialog"
          aria-modal="true"
          aria-label="Formulaire d'inscription"
        >
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="absolute right-3 top-3 h-9 w-9 rounded-full border text-xl"
          >
            ×
          </button>
          <div className="h-full overflow-auto p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

