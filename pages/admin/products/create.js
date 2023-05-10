import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { hasCookie } from 'cookies-next';

import CreateProductForm from 'components/Forms/CreateProductForm.js';

import Admin from "layouts/Admin.js";

export default function CreateProduct() {
  const router = useRouter();

  useEffect(() => {
    if (!hasCookie('authToken')) {
      router.replace('/login');
    }

  }, []);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <CreateProductForm/>
        </div>
      </div>
    </>
  );
}

CreateProduct.layout = Admin;
