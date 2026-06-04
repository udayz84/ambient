"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";

type TechnologyVisualFadeInProps = ComponentProps<"div"> & {
  children: ReactNode;
};

export function TechnologyVisualFadeIn({
  children,
  className,
  ...rest
}: TechnologyVisualFadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      {...rest}
      className={`${className ?? ""} ${
        isVisible
          ? "animate-technology-visual-fade-in opacity-0"
          : "translate-y-[25px] opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
