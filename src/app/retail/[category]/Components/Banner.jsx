import Image from "next/image";

const CategoryBanner = () => {
  return (
    <div className="relative w-full h-[300px]">
      <Image
        src="/banner3.webp"
        alt="Category Banner"
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white  p-4">
        <h1 className="text-4xl font-bold mb-2">New Arrivals</h1>
        <p className="text-lg max-w-xl">
          Check out our latest collection of trendy outfits and accessories!
        </p>
      </div>
    </div>
  );
};

export default CategoryBanner;
