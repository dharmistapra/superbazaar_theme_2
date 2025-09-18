"use client";
import { ImageUrl } from "@/helper/imageUrl";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const TwoBanner = ({ data }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  return (
    <div className="mx-auto px-4 mt-10 w-full
      sm:max-w-[680px] 
      md:max-w-[980px] 
      lg:max-w-[980px] 
      xl:max-w-[1280px] 
      2xl:max-w-[1320px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.length > 0 &&
          data.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl group h-[200px] sm:h-[200px] md:h-[300px] lg:h-[450px]"
            >
              <img
                src={ImageUrl(item.image)}
                alt={item?.title || ""}
                className="w-full h-full transform transition-transform duration-500 group-hover:scale-105"
              />

              <div
                className={`absolute ${ "bottom-6"
                } left-6 right-6 max-w-[85%] transition-all duration-700 ${
                  animate
                    ? "opacity-100 translate-y-0"
                    : index === 1
                    ? "opacity-0 -translate-y-6"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                {item?.title && (
                  <h2
                    className={`text-2xl  font-normal mb-3 ${
                     "text-white"
                    }`}
                  >
                    {item.title}
                  </h2>
                )}

                <p
                  className={`mb-4 text-sm md:text-base  ${
                  "text-white"
                  } line-clamp-2 sm:line-clamp-3 md:line-clamp-4`}
                >
                  {item.description}
                </p>

                {item?.link && (
                  <Link href={item?.link || "#"} className="inline-block bg-black hover:bg-gray-800 text-white font-semibold uppercase text-sm px-5 py-2 rounded-md shadow-md transition-transform duration-300 hover:-translate-y-1">
                      {item.buttonText || "Shop Now"}
                  </Link>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TwoBanner;
