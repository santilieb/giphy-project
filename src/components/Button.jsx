// Button component
// It takes in the following props:
// - icon: the icon to be displayed on the button
// - text: the text to be displayed on the button
// - className: the modifier to be applied to the button
// - onClick: the function to be called when the button is clicked

function Button({ icon, text, className, onClick }) {
  return (
    <button className={`btn btn--${className}`} onClick={onClick}>
      {icon}
      {text}
    </button>
  );
}

export default Button;
