import { useContext } from "react";
import { UserContext } from "../../../App";
import "./CustomTextField.css";

export default function CustomTextField(prop: {
  label: string;
  id: string;
  isError?: boolean;
  errorText?: string;
  value: string;
  OnBlurChange: () => void;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e;
    prop.onChange(newValue);
  };

  const user = useContext(UserContext);

  return (
    <div className="custom-text-field-with-label-up">
      <span>
        <label htmlFor={prop.id} className="label">
          {prop.label}
        </label>
        <span className="asterisks">*</span>
      </span>

      <input
        type="text"
        value={prop.value}
        id={prop.id}
        className={prop.isError ? "text-field error" : "text-field"}
        onChange={handleChange}
        onBlur={prop.OnBlurChange}
      />
      <span>{user}</span>
      {prop.isError && <span className="error-message">{prop.errorText}</span>}
    </div>
  );
}
