'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Formik, Form } from 'formik';
import { auth } from '@/app/authentication/firebase.config';
import { validateForm } from '@/app/utils/validations';
import Button from '@/app/components/Button/button';
import UIField from '@/app/components/UIField/uiField';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const [errors, setErrors] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user, 'The following is the representation of our user.');
            setLoading(false);
            sessionStorage.setItem('user', true);
            router.push('/admin/home');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoading(false);
            setErrors(errorMessage);
            console.error(errorMessage);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrors(errorMessage);
      });
  };

  const buttonClassName = 'w-full p-3 bg-white rounded outline-none text-teal-900 placeholder-teal-700';
  const errorClassName = 'text-xs mt-2 text-red-600';

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-teal-100 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-teal-900 text-2xl mb-5">Sign Up</h1>
        <div className="mt-4 text-xs text-red-600">{errors && errors}</div>
        <Formik
          initialValues={{ email: email, password: password }}
          validate={() => validateForm({ email: email, password: password })}
          onSubmit={(values) => handleSignUp(values)}
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

                  <p className="text-xs text-red-600">{errors.email && touched.email && errors.email}</p>
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

                  <p className="text-xs text-red-600">{errors.password && touched.password && errors.password}</p>
                </div>
              </div>
              <div className="flex flex-row text-l pb-8 pl-10 justify-end">
                <Button
                  handlerEvent={handleSignUp}
                  type="submit"
                  title={loading ? 'Loading ...' : ' Sign Up '}
                ></Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
