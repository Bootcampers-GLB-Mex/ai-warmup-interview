'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/authentication/firebase.config';
import Button from '@/components/Button/button';
import InputField from '@/components/InputField/InputField';
import { validateAuthForm } from '../validations';
import { FormValues } from '../schema';
import { login } from '../api';

export default function SignIn() {
  const [errors, setErrors] = useState('');

  const handleSignIn = async (values: FormValues) => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password)
      await login(userCredential);
    } catch (e: any) {
      const errorMessage = e.message;
      setErrors(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-glob-100 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign In</h1>
        <div className="mt-4 text-xs text-red-600">{errors && errors}</div>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={validateAuthForm}
          onSubmit={handleSignIn}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className=" space-y-6 rounded-md shadow-sm">
                <div>
                  <InputField
                    type="email"
                    id="email"
                    name="email"
                    label="Email address"
                    placeholder="Email address"
                  />
                </div>

                <div>
                  <InputField
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    placeholder="Password"
                  />
                </div>

              </div>
              <div className="flex flex-row text-l pl-10 font-sans text-sm text-white-900 justify-end">
                <div>No account yet?&nbsp;</div>
                <div>
                  <Link href="/authentication/sign-up" className="text-white-900 text-secondary">
                    Sign up
                  </Link>
                </div>
              </div>

              <div className="flex flex-row text-l pb-8 pl-10 justify-end">
                <Button type="submit">{isSubmitting ? 'Logging in ...' : ' Login '}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
