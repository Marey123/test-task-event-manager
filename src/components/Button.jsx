const Button = ({ handleClick, className, title, type }) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-xl ${className}`}
    >
      {title}
    </button>
  );
};

export default Button;
