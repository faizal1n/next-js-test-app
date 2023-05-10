import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getCookie, hasCookie } from 'cookies-next';

export default function DeleteProduct() {
  const router = useRouter();

  useEffect(() => {
    if (!hasCookie('authToken')) {
      router.replace('/login');
    }

    const productId  = router.query.id;

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+getCookie('authToken')
      }
    };

    fetch('/api/products/'+productId, options)
    .then((res) => router.replace('/admin/products'));

  }, []);
}
