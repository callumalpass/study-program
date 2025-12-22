import { beforeEach, describe, expect, it, vi } from 'vitest';
import { router } from '../src/core/router';

describe('router history', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('calls window.history.back', () => {
    const backSpy = vi.spyOn(window.history, 'back').mockImplementation(() => {});
    router.back();
    expect(backSpy).toHaveBeenCalled();
  });

  it('calls window.history.forward', () => {
    const forwardSpy = vi.spyOn(window.history, 'forward').mockImplementation(() => {});
    router.forward();
    expect(forwardSpy).toHaveBeenCalled();
  });
});
