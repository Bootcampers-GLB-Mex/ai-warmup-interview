import clsx from 'clsx';
import { Field, FieldProps } from 'formik';
import { InputHTMLAttributes } from 'react';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
};
const errorClassName = 'text-xs mt-2 text-red-600';
const inputClassName = 'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white';

const InputField = ({label, name, className, ...props}: InputFieldProps) => {
  return (
    <Field name={name}>
      {
        ({ field, meta }: FieldProps) => (
          <>
            <label className={"sr-only"} htmlFor={props.id}>
              {label}
            </label>
            <input
                className={clsx(inputClassName, className)}
                {...props}
                {...field} />
            <p className={clsx(errorClassName)}>
              {meta.touched && meta.error}
            </p>
          </>
        )
      }

    </Field>
  );
};

export default InputField;
