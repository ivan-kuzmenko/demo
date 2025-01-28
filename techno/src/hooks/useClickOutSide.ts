import { RefObject, useEffect, useRef, useCallback } from "react";

export const useClickOutside = (
  elementRef: RefObject<Element>,
  callback: () => void
) => {
  const callbackRef = useRef<() => void>();

  callbackRef.current = callback;

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      !elementRef.current?.contains(e.target as Element) &&
      callbackRef.current
    ) {
      callbackRef.current();
    }
  }, [elementRef]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside]);
};
