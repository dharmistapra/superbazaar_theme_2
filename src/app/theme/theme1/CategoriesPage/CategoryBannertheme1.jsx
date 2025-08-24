import { ImageUrl } from "@/app/helper/imageUrl";
import Image from "next/image";

const CategoryBannertheme1 = ({ data }) => {
  const banner = data?.PageWiseBanner?.[0]; 
  return (
    <div className="relative w-full h-[300px]">
      {banner?.desktopImage && (
        <div className="hidden md:block w-full h-full">
          <Image
            src={ImageUrl(banner?.desktopImage)}
            alt={banner?.title || "Category Banner"}
            fill
            className="object-cover"
          />
        </div>
      )}
      {banner?.mobileImage && (
        <div className="block md:hidden w-full h-full">
          <Image
            src={ImageUrl(banner?.mobileImage)}
            alt={banner?.title || "Category Banner"}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="hidden md:flex absolute inset-0  flex-col justify-center items-center text-center text-white p-4">
        <h1 className="text-4xl font-bold mb-2 ">
          {banner?.title || "New Arrivals"}
        </h1>
        <p
          className="text-lg max-w-xl text-white [&_*]:!text-white"
          dangerouslySetInnerHTML={{
            __html:
              banner?.description ||
              "Check out our latest collection of trendy outfits and accessories!",
          }}
        />
      </div>
    </div>
  );
};

export default CategoryBannertheme1;
