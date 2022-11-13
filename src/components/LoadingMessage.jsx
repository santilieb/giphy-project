import { IconLoading } from "../img/sprite";

function LoadingMessage({ message }) {
  return (
    <div className="message message--loading">
      <IconLoading />
      <p>{message}</p>
    </div>
  );
}

export default LoadingMessage;
