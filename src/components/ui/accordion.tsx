'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

type AccordionType = 'single' | 'multiple';

interface AccordionContextValue {
  type: AccordionType;
  openItems: Set<string>;
  toggleItem: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: AccordionType;
  collapsible?: boolean;
  children: React.ReactNode;
}

export function Accordion({ type = 'single', collapsible = true, children, className, ...rest }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = useCallback(
    (id: string) => {
      setOpenItems(prev => {
        const next = new Set(prev);
        const isOpen = next.has(id);
        if (type === 'single') {
          next.clear();
          if (!isOpen || !collapsible) {
            next.add(id);
          }
        } else {
          if (isOpen) {
            next.delete(id);
          } else {
            next.add(id);
          }
        }
        return next;
      });
    },
    [type, collapsible]
  );

  const value = useMemo<AccordionContextValue>(() => ({ type, openItems, toggleItem }), [type, openItems, toggleItem]);

  return (
    <div className={className} {...rest}>
      <AccordionContext.Provider value={value}>{children}</AccordionContext.Provider>
    </div>
  );
}

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

export function AccordionItem({ value, children, className, ...rest }: AccordionItemProps) {
  return (
    <div data-accordion-item={value} className={className} {...rest}>
      {children}
    </div>
  );
}

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function AccordionTrigger({ children, className, ...rest }: AccordionTriggerProps) {
  const ctx = useContext(AccordionContext);
  const itemValue = (rest as { 'data-item'?: string })['data-item'] as string;
  
  if (!ctx) return null;

  const isOpen = ctx.openItems.has(itemValue);

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      onClick={() => ctx.toggleItem(itemValue)}
      className={[
        'flex w-full items-center justify-between transition-colors px-3 py-5 pr-4',
        className || ''
      ].join(' ').trim()}
      {...rest}
    >
      <span>{children}</span>
      <span aria-hidden className="ml-4 mr-1 text-[#111] select-none text-[22px] md:text-[24px]">{isOpen ? '−' : '+'}</span>
    </button>
  );
}

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function AccordionContent({ children, className, ...rest }: AccordionContentProps) {
  const ctx = useContext(AccordionContext);
  const itemValue = (rest as { 'data-item'?: string })['data-item'] as string;
  
  const innerRef = React.useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = React.useState<number>(0);

  React.useEffect(() => {
    if (!ctx) return;
    
    const measure = () => {
      if (innerRef.current) {
        const h = innerRef.current.scrollHeight;
        const isOpen = ctx.openItems.has(itemValue);
        setMaxHeight(isOpen ? h : 0);
      }
    };
    measure();
    // Re-measure on resize
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [ctx, itemValue, children]);

  if (!ctx) return null;
  
  const isOpen = ctx.openItems.has(itemValue);
  
  return (
    <div
      className={[
        'overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.2,0.65,0.3,0.9)]',
      ].join(' ').trim()}
      style={{ maxHeight: maxHeight, opacity: isOpen ? 1 : 0 }}
      {...rest}
      data-open={isOpen ? 'true' : 'false'}
      aria-hidden={isOpen ? 'false' : 'true'}
    >
      <div ref={innerRef} className={className}>
        {children}
      </div>
    </div>
  );
}


