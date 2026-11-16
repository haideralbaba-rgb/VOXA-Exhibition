import { useEffect, useRef } from "react";

/**
 * Intercepts the browser / phone back button (popstate event) when a modal is open.
 * If the user taps the phone's hardware/browser back button, the modal closes without leaving the website.
 * If the modal closes via in-app button, backdrop click, or ESC key, the history state is cleanly popped.
 */
export function useModalBack(isOpen: boolean, onClose: () => void) {
  const isClosedByPopstate = useRef(false);
  const stateKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    isClosedByPopstate.current = false;
    const stateKey = "modal_" + Math.random().toString(36).slice(2, 9);
    stateKeyRef.current = stateKey;

    try {
      window.history.pushState({ [stateKey]: true }, "");
    } catch {
      // Safe fallback if history API is restricted
    }

    const onPopState = () => {
      isClosedByPopstate.current = true;
      onClose();
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);

      // If the modal was closed by a button/click/ESC (NOT by popstate),
      // cleanly revert the history entry we pushed so the user's next back button tap works normally.
      if (!isClosedByPopstate.current && stateKeyRef.current) {
        const key = stateKeyRef.current;
        if (window.history.state && window.history.state[key]) {
          try {
            window.history.back();
          } catch {
            // Safe fallback
          }
        }
      }
    };
  }, [isOpen, onClose]);
}
