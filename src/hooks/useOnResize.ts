import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ResizeObserverSubscriberCallback,
  useResizeObserver,
} from './useResizeObserver';

export const useOnResize = <TElement extends HTMLElement>(
  defaultRef: TElement | null = null
) => {
  const ref = useRef<TElement | null>(defaultRef);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const { subscribe, unsubscribe } = useResizeObserver();

  const resizeObserverCallback: ResizeObserverSubscriberCallback = useCallback(
    (element) => {
      if (!element) return;

      setWidth(element.width);
      setHeight(element.height);
    },
    []
  );

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const element = ref.current;
    subscribe(element, resizeObserverCallback);

    return () => unsubscribe(element);
  }, [resizeObserverCallback, subscribe, unsubscribe]);

  return {
    ref,
    width,
    height,
  };
};
