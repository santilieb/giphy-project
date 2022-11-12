import { IconSpinner } from "../img/sprite";

function LoadingMessage({ message }) {
  return (
    <div className="message message--loading">
      <IconSpinner />
      <p>{message}</p>
    </div>
  );
}

export default LoadingMessage;
