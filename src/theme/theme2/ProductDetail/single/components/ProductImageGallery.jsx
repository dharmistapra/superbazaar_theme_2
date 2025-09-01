// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import { Fancybox } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";

// const ProductImageGallery = ({ images, thumbs }) => {
//   const [selectedImage, setSelectedImage] = useState(images[0]);

//   const handleFancyBox = (startIndex) => {
//     Fancybox.show(
//       images.map((img) => ({
//         src: `https://cdn.superbazaar.in/${img}`,
//         type: "image",
//       })),
//       {
//         Thumbs: { autoStart: true },
//         startIndex,
//       }
//     );
//   };

//   return (
//     <div className="flex flex-col md:flex-row gap-4">
//       <div className="flex md:flex-col gap-2 order-2 md:order-1">
//         {thumbs.map((thumb, index) => (
//           <button
//             key={index}
//             onClick={() => { setSelectedImage(images[index]) }}
//             className={`border rounded-md overflow-hidden ${selectedImage === images[index]
//               ? "border-dashed border-gray-800"
//               : "border-gray-300"
//               }`}
//           >
//             <Image
//               src={`https://cdn.superbazaar.in/${thumb}`}
//               alt={`Thumb ${index + 1}`}
//               width={80}
//               height={100}
//               className="object-cover"
//             />
//           </button>
//         ))}
//       </div>

//       <div className="relative w-full flex-1 cursor-pointer order-1 md:order-2">
//         <a
//           href={`https://cdn.superbazaar.in/${selectedImage}`}
//           data-fancybox="gallery"
//           onClick={(e) => {
//             e.preventDefault();
//             handleFancyBox(images.indexOf(selectedImage));
//           }}
//         >
//           <Image
//             src={`https://cdn.superbazaar.in/${selectedImage}`}
//             alt="Product"
//             width={600}
//             height={500}
//             className="w-full h-auto rounded transition-transform duration-200 ease-out"
//           />
//         </a>
//       </div>
//     </div>
//   );
// };

// export default ProductImageGallery;

"use client";
import { useState } from "react";
import Image from "next/image";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Heart } from "lucide-react"; // wishlist icon

const ProductImageGallery = ({ images, thumbs }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [inWishlist, setInWishlist] = useState(false);

  const handleFancyBox = (startIndex) => {
    Fancybox.show(
      images.map((img) => ({
        src: `https://cdn.superbazaar.in/${img}`,
        type: "image",
      })),
      {
        Thumbs: { autoStart: true },
        startIndex,
      }
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 order-2 md:order-1">
        {thumbs.map((thumb, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(images[index])}
            className={`border rounded-md overflow-hidden ${selectedImage === images[index]
              ? "border-dashed border-gray-800"
              : "border-gray-300"
              }`}
          >
            <Image
              src={`https://cdn.superbazaar.in/${thumb}`}
              alt={`Thumb ${index + 1}`}
              width={80}
              height={100}
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image with Wishlist */}
      <div className="relative w-full flex-1 cursor-pointer order-1 md:order-2">
        {/* Wishlist button */}
        <button
          onClick={() => setInWishlist(!inWishlist)}
          className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
        >
          <Heart
            size={22}
            className={`${inWishlist ? "fill-red-500 stroke-red-500" : "stroke-gray-600"
              }`}
          />
        </button>

        {/* Fancybox Main Image */}
        <a
          href={`https://cdn.superbazaar.in/${selectedImage}`}
          data-fancybox="gallery"
          onClick={(e) => {
            e.preventDefault();
            handleFancyBox(images.indexOf(selectedImage));
          }}
        >
          <Image
            src={`https://cdn.superbazaar.in/${selectedImage}`}
            alt="Product"
            width={600}
            height={500}
            className="w-full h-auto rounded transition-transform duration-200 ease-out"
          />
        </a>
      </div>
    </div>
  );
};

export default ProductImageGallery;
