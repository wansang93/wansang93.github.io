'use client';

import { useEffect } from 'react';
import { completeMission, type MissionId } from '@/lib/missions';

export function MissionPing({ id }: { id: MissionId }) {
  useEffect(() => {
    completeMission(id);
  }, [id]);
  return null;
}