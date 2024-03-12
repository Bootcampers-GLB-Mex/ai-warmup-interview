type ButtonProps = {
  title: string;
  handlerEvent: () => void;
};

const Button = (props: ButtonProps) => {
  const btnStyles =
    "bg-teal-900 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded";
  return (
    <button className={btnStyles} onClick={props.handlerEvent}>
      {props.title}
    </button>
  );
};

export default Button;
