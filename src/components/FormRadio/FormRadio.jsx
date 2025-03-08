import { useField } from "formik";

import "./FormRadio.scss";

const FormRadio = ({ req, options, row, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="formRadio">
      <label className="formRadio__label label">
        {props.label}
        {req && <span>*</span>}
      </label>
      <div
        className={`formRadio__container ${
          meta.touched && meta.error ? "input-error" : ""
        } ${row ? "formRadio__container--row" : ""}`}
      >
        {options.map(({ value, label }) => (
          <div key={value} className="formRadio__option">
            <input
              {...field}
              type="radio"
              id={value}
              value={value}
              checked={field.value === value}
              tabIndex="0"
              className="formRadio__input"
            />
            <label htmlFor={value}>{label}</label>
          </div>
        ))}
      </div>
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};

export default FormRadio;
