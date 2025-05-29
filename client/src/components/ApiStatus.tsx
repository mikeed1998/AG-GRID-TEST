import { useEffect, useState } from 'react';
import { fetchApiStatus, ApiStatusResponse } from '../api/api';

export const ApiStatus = () => {
  const [status, setStatus] = useState<ApiStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getStatus = async () => {
      try {
        const data = await fetchApiStatus();
        setStatus(data);
      } catch (err) {
        setError('Failed to fetch API status');
      } finally {
        setLoading(false);
      }
    };

    getStatus();
  }, []);

  if (loading) return <div>Loading API status...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>API Status</h2>
      <p>Message: {status?.message}</p>
      <p>Status: {status?.status}</p>
      <p>Timestamp: {status?.timestamp}</p>
    </div>
  );
};