import "./CustomElevatedButton.css";

function CustomElevatedButton(props: {
  name: string;
  onButtonClick: () => void;
}) {
  return (
    <button className="custom-elevated-button" onClick={props.onButtonClick}>
      {props.name}
    </button>
  );
}

export default CustomElevatedButton;
