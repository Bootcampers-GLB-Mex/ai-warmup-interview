'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/authentication/firebase.config';
import { validateForm } from '@/app/utils/validations';
import Button from '@/app/components/Button/button';
import UIField from '@/app/components/UIField/uiField';

const SignIn = () => {
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = async (values) => {
    setLoading(true);

    try {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user, 'The following is the representation of our user.');
          setLoading(false);
          sessionStorage.setItem('user', true);
          router.push('/');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          setErrors(errorMessage);
          console.error(e);
        });
    } catch (e) {
      setLoading(false);
      setErrors(e.message);
      console.error(e);
    }
  };

  const buttonClassName = 'w-full p-3 bg-white rounded outline-none text-teal-900 placeholder-teal-700';
  const errorClassName = 'text-xs mt-2 text-red-600';

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-teal-100 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-teal-900 text-2xl mb-5">Sign In</h1>
        <div className="mt-4 text-xs text-red-600">{errors && errors}</div>
        <Formik
          initialValues={{ email: email, password: password }}
          validate={() => validateForm({ email: email, password: password })}
          onSubmit={(values) => handleSignIn(values)}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className=" space-y-6 rounded-md shadow-sm">
                <div>
                  <UIField
                    type="email"
                    id="email"
                    name="email"
                    label="Email address"
                    value={email}
                    handlerOnChangeEvent={(event) => {
                      setEmail(event.target.value);
                      values.email = email;
                      handleChange;
                    }}
                    classname={buttonClassName}
                    placeholder="Email address"
                  ></UIField>

                  <p className={errorClassName}>{errors.password && touched.password && errors.password}</p>
                </div>

                <div>
                  <UIField
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    value={password}
                    handlerOnChangeEvent={(event) => {
                      setPassword(event.target.value);
                      values.password = password;
                      handleChange;
                    }}
                    classname={buttonClassName}
                    placeholder="Password"
                  ></UIField>

                  <p className={errorClassName}>{errors.password && touched.password && errors.password}</p>
                </div>
              </div>
              <div className="flex flex-row text-l pl-10 font-sans text-sm text-teal-900 justify-end">
                <div>No account yet?&nbsp;</div>
                <div>
                  <Link href="/authentication/sign-up" className="text-teal-900 text-secondary">
                    Sign up
                  </Link>
                </div>
              </div>

              <div className="flex flex-row text-l pb-8 pl-10 justify-end">
                <Button type="submit" title={loading ? 'Logging in ...' : ' Login '}></Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
