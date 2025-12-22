import { h, render } from 'preact';
import type { Exercise } from '@/core/types';
import { InteractiveMascot } from './InteractiveMascot';
import { getMascotForPath } from './mascotMood';

export function renderMobileHeaderMascot(
  container: HTMLElement,
  currentPath: string,
  exercises: Exercise[]
): void {
  const mood = getMascotForPath(currentPath, exercises);

  render(
    h(InteractiveMascot, {
      mood,
      size: 48,
    }),
    container
  );
}
