import { IconError } from "../img/sprite";

// Error message component
// It takes in the message to be displayed as a prop

function ErrorMessage({ message }) {
  return (
    <div className="message message--error">
      <IconError />
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
