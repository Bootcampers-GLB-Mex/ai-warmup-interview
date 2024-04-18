'use client';

import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { Formik, Form } from 'formik';

import Button from '@/components/Button/button';
import InputField from '@/components/InputField/InputField';

import { setAccessCode } from '../authentication/actions';

export default function Warmup() {
  let [isOpen, setIsOpen] = useState(true);

  const handleGetAccessCode = async (values: { accessCode: string }) => { 
    const result = await setAccessCode(values.accessCode);
    console.log(result, 'Error 404');
    setIsOpen(false);
  };

  return (
    <div className="md:container md:mx-auto min-h-full ml-4 mr-4 pt-32 pb-20">
      <div className="relative pb-16">
        <div className="flex flex-col pt-8 pb-8 pl-10 pr-10">
          <h1 className="text-4xl font-semibold">Warmup Dashboard</h1>

          <p>
            This is a warmup page. It is used to test the routing and the authentication
            flow of the application.
          </p>
        </div>
        <div className="flex flex-col pr-10  w-full p-12 m-auto bg-white pt-8">
          <div className="flex flex-col">
            <h1 className="text-xl mb-4">You don't have warmups yet</h1>

            <Button onClick={() => setIsOpen(true)}>I have an Access Code!</Button>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-10">
            <Dialog.Title>Get your Warmup</Dialog.Title>
            <Formik initialValues={{ accessCode: '' }} onSubmit={handleGetAccessCode}>
            <Form className="mt-8 space-y-6">
                <InputField
                  id="accessCode"
                  name="accessCode"
                  label="Access Code"
                  placeholder="Enter your access code"
                />
                <Button type='submit'>Submit</Button>
              </Form>
            </Formik>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
