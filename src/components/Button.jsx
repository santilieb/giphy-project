function Button({ icon, text, className, onClick }) {
  return (
    <button className={`btn btn--${className}`} onClick={onClick}>
      {icon}
      <div className="btn__text">{text}</div>
    </button>
  );
}

export default Button;
