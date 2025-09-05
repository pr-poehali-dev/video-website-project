import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface CarouselProps {
  children: React.ReactNode[];
  title?: string;
  showNavigation?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  itemsPerView?: number;
  gap?: number;
  className?: string;
}

export default function Carousel({
  children,
  title,
  showNavigation = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  itemsPerView = 4,
  gap = 24,
  className
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const totalItems = children.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const updateScrollState = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const itemWidth = (scrollRef.current.scrollWidth - gap * (totalItems - 1)) / totalItems;
      const scrollLeft = index * (itemWidth + gap);
      scrollRef.current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const scrollLeft = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  useEffect(() => {
    updateScrollState();
  }, [currentIndex, children.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', updateScrollState);
      return () => scrollRef.current?.removeEventListener('scroll', updateScrollState);
    }
  }, []);

  useEffect(() => {
    if (autoPlay && totalItems > itemsPerView) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          const next = prev >= maxIndex ? 0 : prev + 1;
          scrollToIndex(next);
          return next;
        });
      }, autoPlayInterval);

      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
  }, [autoPlay, autoPlayInterval, maxIndex, totalItems, itemsPerView]);

  const handleMouseEnter = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (autoPlay && totalItems > itemsPerView) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          const next = prev >= maxIndex ? 0 : prev + 1;
          scrollToIndex(next);
          return next;
        });
      }, autoPlayInterval);
    }
  };

  if (totalItems === 0) {
    return null;
  }

  return (
    <div 
      className={cn('relative', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'Montserrat'}}>
            {title}
          </h2>
          {showNavigation && totalItems > itemsPerView && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className="h-8 w-8 p-0"
              >
                <Icon name="ChevronLeft" size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={scrollRight}
                disabled={!canScrollRight}
                className="h-8 w-8 p-0"
              >
                <Icon name="ChevronRight" size={16} />
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="relative overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: { display: 'none' }
          }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className="flex-none"
              style={{ width: `calc((100% - ${gap * (itemsPerView - 1)}px) / ${itemsPerView})` }}
            >
              {child}
            </div>
          ))}
        </div>

        {/* Navigation arrows overlay */}
        {showNavigation && totalItems > itemsPerView && (
          <>
            {canScrollLeft && (
              <Button
                variant="outline"
                size="sm"
                onClick={scrollLeft}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white z-10 shadow-lg"
              >
                <Icon name="ChevronLeft" size={20} />
              </Button>
            )}
            
            {canScrollRight && (
              <Button
                variant="outline"
                size="sm"
                onClick={scrollRight}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white z-10 shadow-lg"
              >
                <Icon name="ChevronRight" size={20} />
              </Button>
            )}
          </>
        )}
      </div>

      {/* Dots indicator */}
      {totalItems > itemsPerView && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                index === currentIndex ? "bg-game-blue" : "bg-gray-300"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}