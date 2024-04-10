'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Formik, Field, Form } from 'formik';
import { useRouter } from 'next/navigation';
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import { auth } from '@/app/authentication/firebase.config'
import Button from "@/app/components/Button/button";

const Login = () => {
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const router = useRouter()

    const handleSignIn = async (values) => {
        setLoading(true);

        try {
            const res = await signInWithEmailAndPassword(values.email, values.password);
            setLoading(false);
            console.log({res});
            sessionStorage.setItem('user', true);
            router.push('/')
        }catch(e){
            setLoading(false);
            setErrors(e.message);
            console.error(e);
        }
    };

    const validateForm = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = "Invalid email address";
        }

        if (!values.password) {
            errors.password = "Password number is required";
        } else if (values.password.length <= 8) {
            errors.password = "Password length must be more than 7"
        }

        return errors;
    }

    return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-teal-100 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-teal-900 text-2xl mb-5">Sign In</h1>
        <div className='mt-4 text-xs text-red-600'>
            {errors && errors}
        </div>
        <Formik
            initialValues={{ email: "", password: "" } }
            validate={validateForm}
            onSubmit={(values) => handleSignIn(values)}
        >
            {
                ({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <Form className="mt-8 space-y-6" >
                        <div className=" space-y-6 rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-white rounded outline-none text-teal-900 placeholder-teal-700"
                                    placeholder="Email address"
                                />

                                <p className='text-xs text-red-600'>
                                    {errors.email && touched.email && errors.email}
                                </p>
                            </div>

                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-white rounded outline-none text-teal-900 placeholder-teal-700"
                                    placeholder="Password"
                                />

                                <p className='text-xs text-red-600'>
                                    { errors.password && touched.password && errors.password }
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row text-l pl-10 font-sans text-sm text-teal-900 justify-end">
                            <div>No account yet?&nbsp;</div>
                            <div><Link href="/authentication/sign-up" className="text-teal-900 text-secondary">Sign up</Link></div>
                        </div>

                        <div className="flex flex-row text-l pb-8 pl-10 justify-end">
                            <Button handlerEvent={() => {}} title={loading ? "Logging in ..." : " Login "}></Button>
                        </div>
                    </Form>
                )
            }
        </Formik>
      </div>
    </div>
    )
}

export default Login