import { useState, useEffect, useRef } from "react";

interface UseContentState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export function useContent<T>(fetcher: () => Promise<T>): UseContentState<T> {
  const [state, setState] = useState<UseContentState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });
  const fetcherRef = useRef(fetcher);

  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  useEffect(() => {
    let cancelled = false;

    fetcherRef
      .current()
      .then((data) => {
        if (!cancelled) {
          setState({ data, isLoading: false, error: null });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setState({ data: null, isLoading: false, error: error as Error });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
