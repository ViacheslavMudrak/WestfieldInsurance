import { useCallback, useEffect, useState } from 'react';

// https://github.com/vercel/next.js/discussions/14810
const useMediaQuery = ({
  width,
  type,
}: {
  width: number | string;
  type: 'min-width' | 'max-width';
}): boolean => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e: MediaQueryListEvent) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const unit = typeof width === 'string' ? width : `${width}px`;
    const media = window.matchMedia(`(${type}: ${unit})`);

    media?.addEventListener('change', (e) => updateTarget(e));

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener('change', (e) => updateTarget(e));
  }, [type, updateTarget, width]);

  return targetReached;
};

export default useMediaQuery;
