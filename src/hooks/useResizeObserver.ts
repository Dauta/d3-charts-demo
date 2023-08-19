import { useCallback, useEffect } from 'react';

export type ResizeObserverSubscriberCallback = (entry: DOMRectReadOnly) => void;

// Singleton ResizeObserver
let observer: ResizeObserver | null = null;

// List of subscribers
const subscribers = new Map();

const handleResize: ResizeObserverCallback = (entries) => {
  entries.forEach((entry) => {
    if (subscribers.has(entry.target)) {
      const callback = subscribers.get(entry.target);
      callback(entry.contentRect);
    }
  });
};

export const useResizeObserver = () => {
  useEffect(() => {
    if (!observer) {
      observer = new ResizeObserver(handleResize);
    }

    return () => {
      if (observer && subscribers.size === 0) {
        observer.disconnect();
        observer = null;
      }
    };
  }, []);

  const subscribe = useCallback(
    (element: Element, callback: ResizeObserverSubscriberCallback) => {
      if (!element || !callback || !observer) {
        return;
      }
      subscribers.set(element, callback);
      observer.observe(element);
    },
    []
  );

  const unsubscribe = useCallback((element: Element) => {
    if (!element || !observer) {
      return;
    }
    subscribers.delete(element);
    observer.unobserve(element);
  }, []);

  return {
    subscribe,
    unsubscribe,
  };
};
