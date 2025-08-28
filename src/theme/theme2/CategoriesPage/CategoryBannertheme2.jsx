import { ImageUrl } from "@/helper/imageUrl";
import Image from "next/image";

const CategoryBannertheme2 = ({ data }) => {
  const banner = data?.PageWiseBanner?.[0];
  const pageBannerstatus = data?.status;
  return (
    <div>
      <div className="relative ">
        {banner.desktopImage && (
          <Image
            src={ImageUrl(banner.desktopImage)}
            alt="Banner Desktop"
            // fill
            width={1440}
            height={300}

            className={`object-cover hidden md:block ${pageBannerstatus === "loading" ? "opacity-50" : ""}`}
          />
        )}
        {banner.mobileImage && (
          <Image
            src={ImageUrl(banner.mobileImage)}
            alt="Banner Mobile"
            // fill
            width={540}
            height={658}
            className="object-cover md:hidden"

          />
        )}
      </div>
    </div>
  );
};

export default CategoryBannertheme2;
