'use client';

import { useEffect } from 'react';

export function useBeforeUnload(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
      return false;
    };

    const handlePageHide = () => {};

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handlePageHide);
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handlePageHide);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [enabled]);
}
