import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getCookie, hasCookie } from 'cookies-next';

// components
import CardTable from '@/components/Cards/CardTable.js';

// layout
import Admin from "layouts/Admin.js";

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
    })
    .catch((err)=> {
      console.log(err)
    });

  }, []);

  const columnDefinitions = [
    { title : 'Foto', type: 'image', data: 'image' },
    { title : 'Nama Produk', data: 'name'}
  ];

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardTable
            color='light'
            title='Daftar Produk'
            columnMap={columnDefinitions}
            rowData={data.data}
            mainRoute='/admin/products'
          />
        </div>
      </div>
    </>
  );

}

IndexProduct.layout = Admin;
