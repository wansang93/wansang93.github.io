'use client';

import { useMemo } from 'react';

const COLORS = ['#fde047', '#fb923c', '#f43f5e', '#a78bfa', '#22d3ee', '#ffffff'];

type Origin = { x: number | string; y: number | string };

type Props = {
  origin?: Origin;
  pieceCount?: number;
  scale?: number;
};

export function SparkBurst({ origin, pieceCount = 80, scale = 1 }: Props = {}) {
  const pieces = useMemo(() => {
    return Array.from({ length: pieceCount }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const dist = (130 + Math.random() * 220) * scale;
      return {
        i,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        color: COLORS[i % COLORS.length],
        size: 3 + Math.random() * 3,
        delay: Math.random() * 0.08,
        duration: 0.7 + Math.random() * 0.5,
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
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              borderRadius: '50%',
              boxShadow: `0 0 6px ${p.color}`,
              ['--dx' as string]: `${p.dx}px`,
              ['--dy' as string]: `${p.dy}px`,
              animation: `spark-burst ${p.duration}s cubic-bezier(0.22, 1, 0.36, 1) ${p.delay}s forwards`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
