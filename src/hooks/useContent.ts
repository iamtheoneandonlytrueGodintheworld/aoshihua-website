import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface UseContentState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export function useContent<T>(fetcher: () => Promise<T>): UseContentState<T> {
  const { locale } = useLanguage();
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

    setState({ data: null, isLoading: true, error: null });

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
  }, [locale]);

  return state;
}
