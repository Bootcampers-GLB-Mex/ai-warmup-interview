type ButtonProps = {
  title: string;
  style?: React.CSSProperties;
  handlerEvent?: (e: any) => void;
  btnStyles?: string;
  type?: any;
};

const Button = (props: ButtonProps) => {
  const {style} = props;

  const btnStyles =
    "bg-teal-900 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded ";

  return (
    <button type={props.type ? props.type : 'button'} className={btnStyles} onClick={props.handlerEvent ? props.handlerEvent : () => {}} style={style}>
      {props.title}
    </button>
  );
};

export default Button;
