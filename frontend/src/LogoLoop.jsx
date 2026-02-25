import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };

const useResizeObserver = (callback, elements, dependencies) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener('resize', handleResize);
      callback();
      return () => window.removeEventListener('resize', handleResize);
    }
    const observers = elements.map(ref => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });
    callback();
    return () => { observers.forEach(observer => observer?.disconnect()); };
  }, [callback, ...dependencies]);
};

const useAnimationLoop = (trackRef, targetVelocity, seqWidth, isHovered, hoverSpeed) => {
  const rafRef = useRef(null);
  const lastTimestampRef = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = timestamp => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;
      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;
      if (seqWidth > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;
        offsetRef.current = nextOffset;
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, isHovered, hoverSpeed, trackRef]);
};

export const LogoLoop = memo(({ logos, speed = 80, direction = 'left', gap = 16, pauseOnHover = true, fadeOut = true, fadeOutColor, className, style, renderItem }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const seqRef = useRef(null);
  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const effectiveHoverSpeed = pauseOnHover ? 0 : undefined;
  const targetVelocity = direction === 'left' ? Math.abs(speed) : -Math.abs(speed);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceWidth = seqRef.current?.getBoundingClientRect?.()?.width ?? 0;
    if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
    }
  }, []);

  useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap]);
  useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, effectiveHoverSpeed);

  const cssVars = { '--ll-gap': `${gap}px`, ...(fadeOutColor && { '--ll-fade': fadeOutColor }), ...style };

  const logoLists = useMemo(() =>
    Array.from({ length: copyCount }, (_, copyIndex) => (
      <ul key={`copy-${copyIndex}`} ref={copyIndex === 0 ? seqRef : undefined}
        style={{ display: 'flex', alignItems: 'center', listStyle: 'none', margin: 0, padding: 0 }}
        aria-hidden={copyIndex > 0}
      >
        {logos.map((item, itemIndex) => (
          <li key={`${copyIndex}-${itemIndex}`} style={{ flexShrink: 0, marginRight: `${gap}px` }}>
            {renderItem ? renderItem(item) : item.node}
          </li>
        ))}
      </ul>
    )), [copyCount, logos, gap, renderItem]);

  return (
    <div ref={containerRef} className={className}
      style={{ position: 'relative', overflow: 'hidden', width: '100%', ...cssVars }}
    >
      {fadeOut && (
        <>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', zIndex: 10, background: `linear-gradient(to right, ${fadeOutColor || 'var(--bg)'}, transparent)`, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', zIndex: 10, background: `linear-gradient(to left, ${fadeOutColor || 'var(--bg)'}, transparent)`, pointerEvents: 'none' }} />
        </>
      )}
      <div ref={trackRef} style={{ display: 'flex', width: 'max-content', willChange: 'transform', userSelect: 'none' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {logoLists}
      </div>
    </div>
  );
});

LogoLoop.displayName = 'LogoLoop';
export default LogoLoop;