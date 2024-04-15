import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {};
const customClassName =
  "bg-glob-secondary hover:bg-teal-800 text-white font-bold py-2 px-4 rounded ";

const Button = ({className, type="button", ...props}: ButtonProps) => {
  return (
    <button type={type} className={clsx(customClassName, className)} {...props} />
  );
};

export default Button;
