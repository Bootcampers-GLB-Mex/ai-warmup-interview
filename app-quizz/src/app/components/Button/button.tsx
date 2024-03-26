type ButtonProps = {
  title: string;
  handlerEvent: () => void;
  btnStyles?: string;
};

const Button = (props: ButtonProps) => {
  const btnStyle = props.btnStyles ? props.btnStyles : "bg-teal-900 hover:bg-teal-800 text-white font-bold rounded";

  return (
    <button className={`${btnStyle} px-5 py-2.5 ml-2 mb-2 hover:bg-teal-700`} onClick={props.handlerEvent}>
      {props.title}
    </button>
  );
};

export default Button;
