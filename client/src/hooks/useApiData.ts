import { useEffect, useState } from 'react';
import { fetchApiData, ApiDataResponse } from '../api/api';

export const useApiData = () => {
  const [data, setData] = useState<ApiDataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchApiData();
        setData(result);
      } catch (err) {
        setError('Failed to fetch API data');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading, error };
};