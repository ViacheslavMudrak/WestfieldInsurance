// https://usehooks.com/useOnClickOutside/ Modified this to work on focus instead.

import { RefObject, useEffect } from 'react';

const useOnFocusOutside = (
  ref: RefObject<HTMLElement>,
  handler: (e: Event) => void,
  originalTarget?: RefObject<HTMLElement>
): void => {
  useEffect(() => {
    const listener = (event: Event) => {
      event.stopPropagation();
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

    document?.addEventListener('focusin', listener);

    return () => {
      document?.removeEventListener('focusin', listener);
      if (ref.current) {
        ref.current.focus();
      }
    };
  }, [ref, handler, originalTarget]);
};

export default useOnFocusOutside;
