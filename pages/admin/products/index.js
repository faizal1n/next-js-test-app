import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getCookie, hasCookie } from 'cookies-next';

export default function IndexProduct() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!hasCookie('authToken')) {
      router.replace('/login');
    }

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+getCookie('authToken')
      }
    };

    fetch('/api/products?start=0&length=10', options)
    .then((res) => res.json())
    .then((jsonResponse) => {
      setData(jsonResponse.result);
      setLoading(false);
    });

  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <h1>{data.length}</h1>
    </div>
  );

}
