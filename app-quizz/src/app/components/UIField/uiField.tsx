import { Field } from 'formik';

type UIFieldProps = {
  handlerOnChangeEvent: (e: any) => void;
  type: any;
  id: string;
  name: string;
  classname: string;
  value: string;
  placeholder: string;
  label: string;
};

const UIField = (props: UIFieldProps) => {
  return (
    <>
      <label htmlFor={props.name} className="sr-only">
        {props.label}
      </label>
      <Field
        type={props.type}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.handlerOnChangeEvent}
        className={props.classname}
        placeholder={props.placeholder}
      />
    </>
  );
};

export default UIField;
