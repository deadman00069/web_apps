import "./CustomTextField.css";

export default function CustomTextField(prop: {
  label: string;
  id: string;
  isError?: boolean;
  errorText?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
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
      />

      {prop.isError && <span className="error-message">{prop.errorText}</span>}
    </div>
  );
}
