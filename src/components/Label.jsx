const Label = ({ text, danger }) => {
  return (
    <span
      className={`absolute top-0 right-0 
        ${danger ? "bg-gradient-to-r from-red-500 to-red-700" : "bg-gradient-to-r from-gray-800 to-gray-900"} 
        text-white px-3 py-1 font-medium text-xs sm:text-sm rounded-bl-lg shadow-lg tracking-wide`}
    >
      {text}
    </span>
  );
};

export default Label;
