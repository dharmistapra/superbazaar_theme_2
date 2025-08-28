import { ImageUrl } from "@/helper/imageUrl";
import Image from "next/image";

const CategoryBannertheme2 = ({ data }) => {
  const banner = data?.PageWiseBanner?.[0];
  const pageBannerstatus = data?.status;
  return (
    <div>
      <div className="relative w-full h-[300px]">
        {banner.desktopImage && (
          <Image
            src={ImageUrl(banner.desktopImage)}
            alt="Banner Desktop"
            fill
            className={`object-cover hidden md:block ${pageBannerstatus === "loading" ? "opacity-50" : ""}`}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        )}
        {banner.mobileImage && (
          <Image
            src={ImageUrl(banner.mobileImage)}
            alt="Banner Mobile"
            fill
            className="object-cover md:hidden"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        )}
      </div>
    </div>
  );
};

export default CategoryBannertheme2;
