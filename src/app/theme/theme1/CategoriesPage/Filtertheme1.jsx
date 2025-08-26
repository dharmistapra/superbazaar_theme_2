"use client";
import { useEffect, useState } from "react";
import { X, Plus, Minus } from "lucide-react";

const Filtertheme1 = ({ open, setOpen, filterData, onApply, setSelectedAttributes, selectedAttributes }) => {
  const [openSections, setOpenSections] = useState({});
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [appliedPrice, setAppliedPrice] = useState([null, null]);
  useEffect(() => {
    if (!filterData) return;

    const sections = {};
    if (filterData.attributes) {
      filterData.attributes.forEach((attr) => (sections[attr.attribute.key] = true));
    }
    if (filterData.brands) sections["brand"] = true;
    if (filterData.priceRange) sections["price"] = true;
    setOpenSections(sections);

    const initAttributes = {};
    filterData.attributes?.forEach((attr) => (initAttributes[attr.attribute.key] = []));
    if (filterData.brands) initAttributes["brand"] = [];
    setSelectedAttributes(initAttributes);

    if (filterData.priceRange) {
      const { minPrice, maxPrice } = filterData.priceRange;
      setPriceRange([minPrice, maxPrice]);
    }
  }, [filterData]);


  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));


  const handleAttributeChange = (key, value, name) => {
    setSelectedAttributes((prev) => {
      const current = prev[key] || [];
      const exists = current.find((item) => item.value === value);
      const updated = exists
        ? current.filter((item) => item.value !== value)
        : [...current, { label: name, value }];

      const newAttributes = { ...prev, [key]: updated };
      if (onApply) onApply({ attributes: newAttributes, price: appliedPrice });

      return newAttributes;
    });
  };


  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = Number(value);
    setPriceRange(newRange);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setOpen(false)}
      />
      <div
        className={`fixed top-0 left-0 h-full w-[90%] sm:w-[20rem] lg:w-[30rem] bg-white shadow-2xl z-50 transform transition-transform duration-500 ${open ? "translate-x-0" : "-translate-x-full"
          } flex flex-col rounded-r-2xl`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <X size={25} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {filterData?.priceRange && (
            <div className="p-4 border-b border-gray-200">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("price")}
              >
                <h3 className="font-semibold">Price</h3>
                {openSections["price"] ? <Minus /> : <Plus />}
              </div>
              {openSections["price"] && (
                <div className="mt-3">
                  <div className="relative h-1 bg-gray-300 rounded mb-3">
                    <div
                      className="absolute h-1 bg-black rounded"
                      style={{
                        left: `${((priceRange[0] - filterData.priceRange.minPrice) /
                          (filterData.priceRange.maxPrice -
                            filterData.priceRange.minPrice)) *
                          100
                          }%`,
                        right: `${100 -
                          ((priceRange[1] - filterData.priceRange.minPrice) /
                            (filterData.priceRange.maxPrice -
                              filterData.priceRange.minPrice)) *
                          100
                          }%`,
                      }}
                    />
                    <input
                      type="range"
                      min={filterData.priceRange.minPrice}
                      max={filterData.priceRange.maxPrice}
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(0, e.target.value)}
                      className="absolute w-full h-1 bg-transparent appearance-none"
                    />
                    <input
                      type="range"
                      min={filterData.priceRange.minPrice}
                      max={filterData.priceRange.maxPrice}
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(1, e.target.value)}
                      className="absolute w-full h-1 bg-transparent appearance-none"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>
                      Price: ${priceRange[0]} — ${priceRange[1]}
                    </span>
                    <button
                      onClick={() => {
                        setAppliedPrice(priceRange);
                        if (onApply) onApply({ attributes: selectedAttributes, price: priceRange });
                      }}
                      className="ml-3 px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          {filterData?.attributes?.map((attr) => (
            <div
              key={attr.attribute.key}
              className="p-4 border-b border-gray-200"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection(attr.attribute.key)}
              >
                <h3 className="font-semibold">{attr.attribute.name}</h3>
                {openSections[attr.attribute.key] ? <Minus /> : <Plus />}
              </div>
              {openSections[attr.attribute.key] && (
                <div className="mt-3 space-y-2">
                  {attr.value.map((val) => (
                    <label
                      key={val.value}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="accent-blue-600"
                        checked={
                          selectedAttributes[attr.attribute.key]?.some(
                            (item) => item.value === val.value
                          ) || false
                        }
                        onChange={() =>
                          handleAttributeChange(
                            attr.attribute.key,
                            val.value,
                            val.name
                          )
                        }
                      />
                      <span>{val.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
          {filterData?.brands && (
            <div className="p-4 border-b border-gray-200">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("brand")}
              >
                <h3 className="font-semibold">Brands</h3>
                {openSections["brand"] ? <Minus /> : <Plus />}
              </div>
              {openSections["brand"] && (
                <div className="mt-3 space-y-2">
                  {filterData.brands.map((brand) => (
                    <label
                      key={brand.name}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="accent-blue-600"
                        checked={
                          selectedAttributes["brand"]?.some(
                            (item) => item.value === brand.url
                          ) || false
                        }
                        onChange={() =>
                          handleAttributeChange("brand", brand.url, brand.name)
                        }
                      />
                      <span>{brand.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Filtertheme1;
