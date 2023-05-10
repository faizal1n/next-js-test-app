import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { deleteCookie } from 'cookies-next';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    deleteCookie('authToken');
    router.replace('/login');
  }, []);

}
