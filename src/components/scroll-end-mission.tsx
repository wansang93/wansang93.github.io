'use client';

import { useEffect } from 'react';
import { completeMission } from '@/lib/missions';

const TOLERANCE = 4;

export function ScrollEndMission() {
  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - TOLERANCE) {
        if (completeMission('scroll-to-bottom')) {
          window.removeEventListener('scroll', onScroll);
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return null;
}