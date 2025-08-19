import { useEffect, useState } from "react";
import data from "@/app/data/MenuData";
import { X, Plus, Minus } from "lucide-react";
import Image from "next/image";

const MobileMenu = ({ open, handleMenu }) => {
  const [expanded, setExpanded] = useState({});
  const toggleSubMenu = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!open) return null;


  return (
    <div className="absolute top-0 left-0 w-64 h-full bg-white shadow-2xl transform transition-transform duration-300 z-50">
      <div className="flex justify-between items-center px-4 py-3 border-b bg-white shadow-md">
        <Image
          src="/logo.png"
          alt="Logo"
          width={150}
          height={150}
          className="h-10 w-auto"
        />
        <div
          className="flex items-center justify-center rounded-full p-2 shadow transform hover:rotate-45 transition-all duration-300 cursor-pointer"
          onClick={handleMenu}
        >
          <X size={24} className="text-gray-500" />
        </div>
      </div>

      <ul className="py-2">
        {data.map((item) => (
          <li key={item.id} className="px-4 py-2">
            <div
              className="border-b-1 border-red-100 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors px-2 py-1"
              onClick={() => item.children.length > 0 && toggleSubMenu(item.id)}
            >
              <span className="font-normal text-gray-900">{item.name}</span>
              {item.children.length > 0 && (
                <span className="ml-2 transform transition-transform duration-300">
                  {expanded[item.id] ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              )}
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expanded[item.id] ? "max-h-96 mt-2" : "max-h-0"
              }`}
            >
              <ul className="pl-4">
                {item.children.length > 0 &&
                  item.children[0].children.map((child) => (
                    <li
                      key={child.id}
                      className="py-1 cursor-pointer hover:text-red-500 transition-colors"
                    >
                      {child.name}
                    </li>
                  ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;
