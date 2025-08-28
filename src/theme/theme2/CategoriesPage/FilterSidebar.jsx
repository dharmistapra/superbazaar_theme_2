import { Minus, Plus } from 'lucide-react';
import React, { useState } from 'react'
import "rc-slider/assets/index.css";
import Slider from 'rc-slider';

const FilterSidebar = ({ open, setOpen, filterData, onApply, setSelectedAttributes, selectedAttributes }) => {
    const [sections, setSections] = useState({
        price: true,
        color: true,
        fabric: true,
        occasion: true,
        brands: true,
    });
    console.log("FilterSidebar", filterData);

    const [price, setPrice] = useState(5000);
    const priceRanges = [
        { min: 500, max: 1500 },
        { min: 1500, max: 3000 },
        { min: 3000, max: 5000 },
        { min: 5000, max: 8000 },
        { min: 8000, max: 12000 },
    ]
    const [selectedRange, setSelectedRange] = useState(priceRanges[0])
    const [range, setRange] = useState([1000, 5000]); // min & max
    const colors = [
        { name: "Lavender", hex: "#E6E6FA" },
        { name: "Grey", hex: "#686868" },
        { name: "Sky Blue", hex: "#87CEEB" },
        { name: "Magenta", hex: "#FF00FF" },
        { name: "Purple", hex: "#9D00FF" },
        { name: "Off White", hex: "#f2f2f2" },
        { name: "Cyan", hex: "#00FFFF" },
        { name: "Beige", hex: "#F5F5DC" },
        { name: "Dark Green", hex: "#006400" },
        { name: "White", hex: "#FFFFFF" },
        { name: "Yellow", hex: "#f5d11c" },
        { name: "Green", hex: "#00FF00" },
        { name: "Pink", hex: "#FF1493" },
        { name: "Wine", hex: "#5A053E" },
        { name: "Sea Green", hex: "#2E8B57" },
        { name: "Orange", hex: "#FFA500" },
        { name: "Blue", hex: "#0000FF" },
        { name: "Peach", hex: "#FFE5B4" },
        { name: "Light Cyan", hex: "#E0FFFF" },
        { name: "Mustard", hex: "#FFDB58" },
        { name: "Black", hex: "#000000" },
        { name: "Olive", hex: "#808000" },
        { name: "Red", hex: "#FF0000" },
        { name: "Brown", hex: "#964B00" },
        { name: "Teal", hex: "#007081" },
    ];

    const handleSliderChange = (value) => {
        if (Array.isArray(value) && value.length === 2) {
            setRange(value);
        }
    };

    const fabrics = ["Cotton", "Georgette", "Chinon", "Chinon Silk", "Viscose", "Art Silk", "Rayon", "Tissue Silk"];
    const occasions = ["Sangeet Wear", "Party Wear", "Wedding Wear", "Festive Wear", "Daily Wear"];
    const brands = ["Mahotsav Group", "Rajpath", "Glosy", "Aashirwad", "Kimora"];
    const toggleSection = (name) => {
        setSections((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    const renderSection = (title, name, children) => (

        <div className="mb-4">
            <div
                className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4  mt-5 cursor-pointer"
                onClick={() => toggleSection(name)}
            >
                <h2 className="text-lg font-semibold uppercase text-gray-600">{title}</h2>
                {sections[name] ? <Minus className='text-gray-600' /> : <Plus className='text-gray-600' />}
            </div>
            {sections[name] && <div>{children}</div>}
        </div>
    );

    return (
        <>
            <div className="bg-white rounded-lg shadow p-4 space-y-6">
                {/* {filterData?.attributes?.map((att)=> )} */}
                {renderSection("Price", "price",
                    <div className="flex items-center gap-2">
                        <div className="px-2">
                            <Slider
                                min={1000}
                                max={9000}
                                range
                                value={range}
                                onChange={handleSliderChange}
                                trackStyle={[{ backgroundColor: "#3B82F6" }]}
                                handleStyle={[
                                    { borderColor: "#3B82F6" },
                                    { borderColor: "#3B82F6" },
                                ]}
                                railStyle={{ backgroundColor: "#E5E7EB" }}
                            />

                            <div className="flex justify-between mt-3">
                                <input
                                    id="amount"
                                    type="text"
                                    value={`${range?.[0] || 0} - ${range?.[1] || 0}`}
                                    readOnly
                                    className="flex-1 border border-gray-400 rounded px-2 py-1 text-sm mr-2"
                                />
                                <button
                                    className="px-4 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition"
                                >
                                    Filter
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {filterData?.attributes?.map((att) => {
                    return renderSection(
                        att.attribute.name,
                        att.attribute.key,
                        att.attribute.name === "Color" ?
                            <ul className="flex flex-wrap gap-3">
                                {att?.value?.map((color) => {
                                    return (
                                        <li key={color.name}>
                                            <span
                                                className="block w-8 h-8 rounded-md cursor-pointer relative group"
                                                style={{ backgroundColor: color.colour, border: color.colour === "#FFFFFF" ? "1px solid #ccc" : "none" }}
                                            >
                                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                                                    {color.name}
                                                </span>
                                            </span>
                                        </li>
                                    )
                                })}
                            </ul> : < ul className="flex flex-col gap-2" >
                                {
                                    att.value.map((val) => (
                                        <li key={val.id || val.name} className="flex items-center gap-2">
                                            <input
                                                id={`${att.attribute.key}-${val.id || val.name}`}
                                                type="checkbox"
                                                value={val.name || val.value}
                                                checked={selectedAttributes[att.attribute.key]?.includes(val.name || val.value)}
                                                onChange={() => handleAttributeChange(att.attribute.key, val.name || val.value)}
                                                className="w-4 h-4"
                                            />
                                            <label htmlFor={`${att.attribute.key}-${val.id || val.name}`} className="text-sm">
                                                {val.name || val.value}
                                            </label>
                                        </li>
                                    ))
                                }
                            </ul>
                    );
                })}


                {renderSection("Brands", "brands",
                    <ul className="flex flex-col gap-2">
                        {brands.map((brand) => (
                            <li key={brand} className="flex items-center gap-2">
                                <input
                                    id={brand}
                                    type="checkbox"
                                    value={brand}
                                    className="w-4 h-4"
                                />
                                <label htmlFor={brand} className="text-sm">
                                    {brand}
                                </label>
                            </li>
                        ))}
                    </ul>
                )}
            </div >
        </>
    )
}

export default FilterSidebar
