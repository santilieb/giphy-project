function Button({ icon, text, className, onClick }) {
  return (
    <button className={`btn btn--${className}`} onClick={onClick}>
      {icon}
      {text}
    </button>
  );
}

export default Button;
