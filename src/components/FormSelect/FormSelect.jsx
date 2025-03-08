import { useField } from "formik";
import "./FormSelect.scss";

const FormSelect = ({ label, req, options, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="formSelect">
      <label className="formSelect__label label">
        {label}
        {req && <span>*</span>}
      </label>
      <select
        {...props}
        {...field}
        tabIndex="0"
        className={`formSelect__select input ${
          meta.touched && meta.error ? "input-error" : ""
        }`}
      >
        <option value="" disabled>
          Выберите
        </option>
        {options.map(({ value, label }) => (
          <option key={value} value={value} >
            {label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};

export default FormSelect;
