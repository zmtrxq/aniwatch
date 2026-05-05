import { useCallback, useState } from 'react';

function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const run = useCallback(async (request) => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const data = await request();
      setSuccess(true);
      return data;
    } catch (err) {
      setError(err.message || 'Something went wrong');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, success, run };
}

export default useFetch;
