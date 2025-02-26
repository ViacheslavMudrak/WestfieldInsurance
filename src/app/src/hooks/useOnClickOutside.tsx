import { RefObject, useEffect } from 'react';

// https://usehooks.com/useOnClickOutside/
const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (e: unknown) => void,
  originalTarget?: RefObject<HTMLElement>
): void => {
  useEffect(
    () => {
      const listener = (event: MouseEvent) => {
        // Do nothing if clicking ref's element or descendent elements or the original target
        if (
          !ref.current ||
          ref.current.contains(event.target as Node) ||
          (originalTarget &&
            originalTarget.current &&
            originalTarget.current.contains(event.target as Node))
        ) {
          return;
        }

        handler(event);
      };

      document?.addEventListener('mousedown', listener);
      document?.addEventListener('touchstart', listener);

      return () => {
        document?.removeEventListener('mousedown', listener);
        document?.removeEventListener('touchstart', listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler, originalTarget]
  );
};

export default useOnClickOutside;
