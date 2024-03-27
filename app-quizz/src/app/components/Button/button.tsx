type ButtonProps = {
  title: string;
  style?: React.CSSProperties;
  handlerEvent: () => void;
  btnStyles?: string;
};

const Button = (props: ButtonProps) => {
  const {style} = props;
  const btnStyles =
    "bg-teal-900 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded ";
  return (
    <button
      className={btnStyles}
      style={{...style}}
      onClick={props.handlerEvent}
    >

  return (
    <button className={`${btnStyle} px-5 py-2.5 ml-2 mb-2 hover:bg-teal-700`} onClick={props.handlerEvent}>

      {props.title}
    </button>
  );
};

export default Button;
