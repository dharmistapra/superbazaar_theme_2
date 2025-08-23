"use client";
import ProductImageGallery from "./ProductImageGallery";

const ProductDetail = ({ product }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductImageGallery
          images={product.image}
          thumbs={product.thumbImage}
        />
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-500 mt-1">{product.sku}</p>
            <p className="text-xl font-semibold mt-2">
              ₹{product.offer_price.toLocaleString()}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
          </div>

          {product.optionType === "Size" && (
            <div>
              <h2 className="text-lg font-semibold">Sizes</h2>
              <div className="flex gap-2 mt-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 border rounded-md hover:bg-black hover:text-white transition"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button className="bg-black text-white py-3 rounded-lg mt-4 hover:bg-gray-800 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
