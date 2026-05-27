'use client';
import { useEffect, useRef } from 'react';

export default function MouseGlow() {
  const ref = useRef(null);

  useEffect(() => {
    let raf, tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    const tick   = () => {
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      if (ref.current) {
        ref.current.style.left = `${cx}px`;
        ref.current.style.top  = `${cy}px`;
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={ref}
         className="fixed pointer-events-none z-0 rounded-full -translate-x-1/2 -translate-y-1/2 will-change-auto"
         style={{
           width: '480px',
           height: '480px',
           background: 'radial-gradient(circle, rgba(124,58,237,.06) 0%, transparent 70%)',
           mixBlendMode: 'multiply',
         }} />
  );
}
