import classNames from "classnames";
import {type} from "os";

type ButtonProps = {
  title: string;
  style?: React.CSSProperties;
  handlerEvent: (e: any) => void;
  btnStyles?: string;
  type?: string;
};

const Button = (props: ButtonProps) => {
  const {style} = props;

  const btnStyles =
    "bg-teal-900 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded ";

  return (
    <button className={btnStyles} onClick={props.handlerEvent} style={style}>
      {props.title}
    </button>
  );
};

export default Button;
