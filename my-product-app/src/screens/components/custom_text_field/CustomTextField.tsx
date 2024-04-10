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

  return (
    <div className="custom-text-field-with-label-up">
      <label htmlFor={prop.id} className="label">
        {prop.label}
      </label>
      <input
        type="text"
        value={prop.value}
        id={prop.id}
        className={prop.isError ? "text-field error" : "text-field"}
        onChange={handleChange}
        onBlur={prop.OnBlurChange}
      />

      {prop.isError && <span className="error-message">{prop.errorText}</span>}
    </div>
  );
}
