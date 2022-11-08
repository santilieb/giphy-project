function ErrorMessage({ message }) {
  return (
    <div className="message--error">
      <svg>
        <use href=""></use>
      </svg>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
