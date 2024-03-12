type ButtonProps = {
  title: string;
  function: () => void;
};

const Button = (props: ButtonProps) => {
  return (
    <button
      className="bg-teal-900 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded"
      onClick={props.function}
    >
      {props.title}
    </button>
  );
};

export default Button;
