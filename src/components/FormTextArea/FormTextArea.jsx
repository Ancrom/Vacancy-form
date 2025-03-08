import { useField } from "formik";

import "./FormTextArea.scss";

const FormTextArea = ({ req, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={`formTextArea`}>
      <label htmlFor={props.name} className="formTextArea__label label">
        {props.label}
        {req && <span>*</span>}
      </label>
      <textarea
        {...props}
        {...field}
        tabIndex="0"
        className={`formTextArea__input input ${
          meta.touched && meta.error ? "input-error" : ""
        }`}
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};

export default FormTextArea;
