import { IconError } from "../img/sprite";

function ErrorMessage({ message }) {
  return (
    <div className="message message--error">
      <IconError />
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
