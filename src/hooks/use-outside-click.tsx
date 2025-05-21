import React, { useEffect } from 'react';

interface UseOnClickOutsideOptions {
  /** Disable callback. Helpful since react hooks can't be conditionally rendered. */
  enabled?: boolean;
  stopPropagation?: boolean;
}

// Handles functionality ('callback') that should occur when user
// clicks outside of an element (referenced via 'ref')
export default function useOnClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  callback: any,
  // any state dependent variables need to be passed to this object
  { enabled = true, stopPropagation = true }: UseOnClickOutsideOptions = {}
) {
  useEffect(
    () => {
      const listener = (event: any) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!enabled || !ref.current || ref.current.contains(event.target)) {
          return;
        }

        if (stopPropagation) {
          // This method stops other listeners of the same event from being called,
          // which can interfere with React's event handling
          event.stopImmediatePropagation();
        }

        callback(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    /*
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new 
    // function on every render that will cause this effect callback/cleanup 
    // to run every render. It's not a big deal but to optimize you can 
    // wrap handler in useCallback before passing it into this hook.
    */
    [ref, callback, enabled, stopPropagation]
  );
}
