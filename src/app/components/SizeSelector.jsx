import { useState } from "react";
const SizeSelector = ({ sizes = ["S", "M", "L", "XL"], onChange ,errors,setErrors}) => {
  const [activeSize, setActiveSize] = useState(null);
  const handleClick = (size) => {
    setActiveSize(size);
    if (onChange) onChange(size);
    setErrors(null)
  };

  return (
    <div>
      <h2 className="text-lg font-semibold p-2">Sizes</h2>
      <div className="flex gap-2 flex-wrap">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => handleClick(size)}
            className={`px-4 py-2 border rounded-md transition 
              ${activeSize === size ? "bg-black text-white" : "hover:bg-black hover:text-white"}
            `}
          >
            {size}
          </button>
        ))}
        
      </div>
        {errors && <p className="text-red-800">{errors}</p>}
    </div>
  );
};

export default SizeSelector;
