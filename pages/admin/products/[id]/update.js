import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getCookie, hasCookie } from 'cookies-next';

import UpdateProductForm from 'components/Forms/UpdateProductForm.js';

import Admin from "layouts/Admin.js";

export default function UpdateProduct() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!hasCookie('authToken')) {
      router.replace('/login');
    }

    const productId  = router.query.id;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+getCookie('authToken')
      }
    };
    setLoading(true);

    fetch('/api/products/'+productId, options)
    .then((res) => res.json())
    .then((jsonResponse) => {
      setData(jsonResponse.result);
      setLoading(false);
    })
    .catch((err)=> {
      console.log(err)
    });

  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <UpdateProductForm
            product={data}
          />
        </div>
      </div>
    </>
  );
}

UpdateProduct.layout = Admin;
