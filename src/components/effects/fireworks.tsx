'use client';

import { useEffect, useState } from 'react';
import { MISSIONS, getMissionState } from '@/lib/missions';
import { ConfettiBurst } from './confetti-burst';
import { SparkBurst } from './spark-burst';

const BURST_LIFETIME = 3800;

type Burst = {
  id: number;
  kind: 'confetti' | 'spark';
  origin: { x: string | number; y: string | number };
  pieceCount: number;
  scale: number;
};

const BIG_POSITIONS: { x: string; y: string }[] = [
  { x: '50%', y: '45%' },
  { x: '28%', y: '36%' },
  { x: '72%', y: '40%' },
  { x: '22%', y: '60%' },
  { x: '78%', y: '62%' },
];

export function Fireworks() {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    const timers: number[] = [];

    function pushBurst(b: Omit<Burst, 'id'>) {
      const id = Date.now() + Math.floor(Math.random() * 10000);
      setBursts((bs) => [...bs, { id, ...b }]);
      const cleanup = window.setTimeout(() => {
        setBursts((bs) => bs.filter((x) => x.id !== id));
      }, BURST_LIFETIME);
      timers.push(cleanup);
    }

    function fireTiny() {
      pushBurst({
        kind: 'confetti',
        origin: { x: '50%', y: '45%' },
        pieceCount: 50,
        scale: 0.7,
      });
      pushBurst({
        kind: 'spark',
        origin: { x: '50%', y: '45%' },
        pieceCount: 30,
        scale: 0.65,
      });
    }

    function fireSmall() {
      pushBurst({
        kind: 'confetti',
        origin: { x: '50%', y: '45%' },
        pieceCount: 50,
        scale: 0.7,
      });
      pushBurst({
        kind: 'spark',
        origin: { x: '50%', y: '45%' },
        pieceCount: 50,
        scale: 0.7,
      });
    }

    function fireBig() {
      BIG_POSITIONS.forEach((origin, i) => {
        const launch = window.setTimeout(() => {
          pushBurst({ kind: 'spark', origin, pieceCount: 70, scale: 1 });
          pushBurst({ kind: 'confetti', origin, pieceCount: 70, scale: 1 });
        }, i * 260);
        timers.push(launch);
      });
    }

    function onMissionsUnlocked(e: Event) {
      const detail = (e as CustomEvent<{ id?: string }>).detail;
      const state = getMissionState();
      const done = MISSIONS.filter((m) => state[m.id]).length;
      if (done === MISSIONS.length) {
        fireBig();
        return;
      }
      const justUnlocked = MISSIONS.find((m) => m.id === detail?.id);
      if (justUnlocked?.hidden) {
        fireSmall();
      } else {
        fireTiny();
      }
    }

    function onManualTrigger() {
      fireBig();
    }

    window.addEventListener('missions:unlocked', onMissionsUnlocked);
    window.addEventListener('fireworks:trigger', onManualTrigger);
    return () => {
      window.removeEventListener('missions:unlocked', onMissionsUnlocked);
      window.removeEventListener('fireworks:trigger', onManualTrigger);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <>
      {bursts.map((b) =>
        b.kind === 'spark' ? (
          <SparkBurst key={b.id} origin={b.origin} pieceCount={b.pieceCount} scale={b.scale} />
        ) : (
          <ConfettiBurst key={b.id} origin={b.origin} pieceCount={b.pieceCount} scale={b.scale} />
        )
      )}
    </>
  );
}
