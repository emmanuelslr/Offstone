"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function SearchInput({
  placeholder = "Rechercher un sujet, ex. bureaux repositionnement…",
  size = "lg", // "lg" | "sm"
  className = "",
}: { placeholder?: string; size?: "lg" | "sm"; className?: string }) {
  const router = useRouter();
  const sp = useSearchParams();
  const pathname = usePathname();
  const [value, setValue] = useState(sp.get("q") || "");
  const ref = useRef<HTMLInputElement>(null);

  // Debounce
  const debouncedPush = useMemo(() => {
    let t: any;
    return (val: string) => {
      clearTimeout(t);
      t = setTimeout(() => {
        const params = new URLSearchParams(sp.toString());
        if (val) params.set("q", val); else params.delete("q");
        params.delete("page");
        router.replace(`${pathname}?${params.toString()}`);
      }, 300);
    };
  }, [router, sp, pathname]);

  // Raccourci "/" pour focus
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // éviter en input/textarea
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || (e as any).isComposing) return;
      if (e.key === "/") {
        e.preventDefault();
        ref.current?.focus();
      }
      if (e.key === "Escape") {
        setValue("");
        const params = new URLSearchParams(sp.toString());
        params.delete("q"); params.delete("page");
        router.replace(`${pathname}?${params.toString()}`);
        ref.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, sp, pathname]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    debouncedPush(v);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(sp.toString());
    if (value) params.set("q", value); else params.delete("q");
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const sizes = size === "lg"
    ? "px-8 py-6 text-xl rounded-2xl"
    : "px-4 py-3 text-base rounded-xl";

  return (
    <form onSubmit={onSubmit} role="search" aria-label="Rechercher dans les ressources" className={`relative ${className}`}>
      <input
        ref={ref}
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border border-gray-200 outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent shadow-lg bg-white transition-all ${sizes}`}
      />
      
      {/* Search Icon */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
        {!value && (
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
      </div>

      {/* Clear Button */}
      {value && (
        <button
          type="button"
          onClick={() => {
            setValue("");
            const params = new URLSearchParams(sp.toString());
            params.delete("q"); params.delete("page");
            router.replace(`${pathname}?${params.toString()}`);
            ref.current?.focus();
          }}
          aria-label="Effacer la recherche"
          className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </form>
  );
}
