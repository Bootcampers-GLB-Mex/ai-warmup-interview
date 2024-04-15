'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Formik, Form } from 'formik';
import { auth } from '@/app/authentication/firebase.config';
import { validateAuthForm } from '@/app/authentication/validations';
import Button from '@/components/Button/button';
import InputField from '@/components/UIField/uiField';
import { useRouter } from 'next/navigation';
import { FormValues } from '../schema';

const SignUp = () => {
  const [errors, setErrors] = useState('');
  const router = useRouter();

  const handleSignUp = async (values: FormValues) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, values.email, values.password);
      const user = userCredential.user;
      console.log(user, 'The following is the representation of our user.');
      router.push('/authentication/sign-in');
    } catch (e: any) {
      const errorMessage = e.message;
      setErrors(errorMessage);
      console.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-glob-100 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign Up</h1>
        <div className="mt-4 text-xs text-red-600">{errors && errors}</div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={validateAuthForm}
          onSubmit={handleSignUp}
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
              <div className="flex flex-row text-l pb-8 pl-10 justify-end">
                <Button
                  type="submit"
                >{isSubmitting ? 'Loading ...' : ' Sign Up '}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
