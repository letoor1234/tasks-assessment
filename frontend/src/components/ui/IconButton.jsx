const IconButton = ({ children, onClick, disabled, ...props }) => {
  return (
    <button
      type="button"
      className="focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
