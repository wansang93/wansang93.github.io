'use client';

import { useMemo } from 'react';

const COLORS = ['#fb923c', '#ec4899', '#a855f7', '#22c55e', '#facc15', '#3b82f6', '#06b6d4'];

type Origin = { x: number | string; y: number | string };

type Props = {
  origin?: Origin;
  pieceCount?: number;
  scale?: number;
};

export function ConfettiBurst({ origin, pieceCount = 90, scale = 1 }: Props = {}) {
  const pieces = useMemo(() => {
    return Array.from({ length: pieceCount }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const dist = (180 + Math.random() * 320) * scale;
      return {
        i,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist - 80 * scale,
        color: COLORS[i % COLORS.length],
        w: 6 + Math.random() * 6,
        h: 3 + Math.random() * 5,
        delay: Math.random() * 0.18,
        duration: 1.6 + Math.random() * 1.2,
      };
    });
  }, [pieceCount, scale]);

  const top = typeof origin?.y === 'number' ? `${origin.y}px` : origin?.y ?? '50%';
  const left = typeof origin?.x === 'number' ? `${origin.x}px` : origin?.x ?? '50%';

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden" aria-hidden>
      <div className="absolute" style={{ top, left, width: 0, height: 0 }}>
        {pieces.map((p) => (
          <span
            key={p.i}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${p.w}px`,
              height: `${p.h}px`,
              backgroundColor: p.color,
              borderRadius: '1px',
              ['--dx' as string]: `${p.dx}px`,
              ['--dy' as string]: `${p.dy}px`,
              animation: `confetti-burst ${p.duration}s cubic-bezier(0.16, 1, 0.3, 1) ${p.delay}s forwards`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
