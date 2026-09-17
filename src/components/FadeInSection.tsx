import React, { ReactNode } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number; // Milliseconds
  duration?: number; // Milliseconds
  distance?: number; // Displacement in pixels
  scale?: boolean; // Subtle scale-in effect
  threshold?: number;
  rootMargin?: string;
  id?: string;
  triggerOnce?: boolean;
}

/**
 * FadeInSection component powered by native IntersectionObserver.
 * Fades in and slides smoothly when scrolled into the browser viewport.
 */
export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 650,
  distance = 32,
  scale = false,
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  id,
  triggerOnce = true,
}) => {
  const { elementRef, isVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin,
    triggerOnce,
  });

  const getTransform = () => {
    if (isVisible) {
      return 'translate3d(0, 0, 0) scale(1)';
    }

    const scaleStyle = scale ? ' scale(0.97)' : '';

    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)${scaleStyle}`;
      case 'down':
        return `translate3d(0, -${distance}px, 0)${scaleStyle}`;
      case 'left':
        return `translate3d(${distance}px, 0, 0)${scaleStyle}`;
      case 'right':
        return `translate3d(-${distance}px, 0, 0)${scaleStyle}`;
      case 'none':
        return scale ? 'scale(0.96)' : 'none';
      default:
        return `translate3d(0, ${distance}px, 0)${scaleStyle}`;
    }
  };

  return (
    <div
      ref={elementRef}
      id={id}
      className={`transition-all ease-out will-change-[opacity,transform] ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
};
