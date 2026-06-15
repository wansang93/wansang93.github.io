'use client';

import { useEffect } from 'react';
import { completeMission } from '@/lib/missions';

const TOLERANCE = 4;

export function ScrollEndMission() {
  useEffect(() => {
    function atBottom() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return true;
      return window.scrollY + window.innerHeight >= doc.scrollHeight - TOLERANCE;
    }
    function check() {
      if (atBottom()) completeMission('scroll-to-bottom');
    }
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    window.addEventListener('missions:change', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
      window.removeEventListener('missions:change', check);
    };
  }, []);
  return null;
}
