import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
};
const primary =
  "bg-glob-secondary hover:bg-teal-800 text-white font-bold py-2 px-4 rounded ";
const secondary = "text-gray-900 bg-white border border-white-900 p-2 focus:outline-none hover:text-green-500 rounded"

const Button = ({className, variant = "primary", type="button", ...props}: ButtonProps) => {
  return (
    <button type={type} className={clsx(variant === "primary" && primary, variant === "secondary" && secondary, className)} {...props} />
  );
};

export default Button;
