import { useField } from "formik";

import "./FormInput.scss";

const FormInput = ({ req, row, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={`formInput ${row ? "formInput--row" : ""}`}>
      <label htmlFor={props.name} className="formInput__label label">
        {props.label}
        {req && <span>*</span>}
      </label>
      <input
        {...props}
        {...field}
        tabIndex="0"
        className={`formInput__input input ${
          meta.touched && meta.error ? "input-error" : ""
        }`}
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};

export default FormInput;
