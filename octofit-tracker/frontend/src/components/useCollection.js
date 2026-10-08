import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

export function useCollection(endpoint, fetcher) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetchCollection(endpoint, fetcher, controller.signal)
      .then(setItems)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load this resource.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [endpoint, fetcher, refreshKey]);

  function refresh() {
    setLoading(true);
    setError('');
    setRefreshKey((key) => key + 1);
  }

  return {
    items,
    loading,
    error,
    refresh,
  };
}