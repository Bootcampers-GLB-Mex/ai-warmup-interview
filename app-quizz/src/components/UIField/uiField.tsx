import clsx from 'clsx';
import { Field, FieldProps } from 'formik';
import { InputHTMLAttributes } from 'react';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
};
const errorClassName = 'text-xs mt-2 text-red-600';
const inputClassName = 'w-full p-3 bg-white rounded outline-none';

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
