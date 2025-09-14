import { useCallback, useRef } from 'react';

export function useDebounce<T extends unknown[]>(
  func: (...args: T) => void,
  delay: number
): (...args: T) => void{
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const debouncedFunction =  useCallback((...args: T) => {
    if(timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      func(...args);
    }, delay)
  },[func, delay]);
  return debouncedFunction;
}


