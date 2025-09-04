"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageUrl } from "@/helper/imageUrl";
import CatalogCard from "../../ProductDetail/wholesale/component/CatalogCard";
import FullSlider from "@/theme/theme1/Home/components/FulSlider";
import CardsSlider3D from "@/theme/theme1/components/CardsSlider/CardsSlider3D";
import TwoBanner from "@/theme/theme1/Home/components/TwoBanner";
import ThreeFourBanner from "@/theme/theme1/Home/components/ThreeFourBanner";

// ✅ Component Map
const componentMap = {
    "full slider": (item) => (
        <FullSlider key={item.id} slides={item.fullSlider} />
    ),
    "cards slider": (item) => (
        <CardsSlider3D key={item.id} slides={item.cardSlider} />
    ),
    "two banner": (item) => (
        <TwoBanner key={item.id} data={item.twoBanner} bannergrid={2} />
    ),
    "three banner": (item) => (
        <ThreeFourBanner key={item.id} data={item.threeBanner} bannergrid={3} />
    ),
    "four banner": (item) => (
        <ThreeFourBanner key={item.id} data={item.fourBanner} bannergrid={4} />
    ),
};

const Collection = ({ homeContent, webSetting }) => {
    console.log(
        "homeContent ====>",
        homeContent,
        homeContent.map((item) => item.title)
    );

    return (
        <div className="container mx-auto px-4 mt-3 mb-0">
            {homeContent?.map((collection, idx) => {
                // ✅ pick component by type
                const RenderComponent = componentMap[collection.type];

                return (
                    <React.Fragment key={idx}>
                        {/* Header with View All link */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                            <div className="text-center">
                                <p className="text-xl font-semibold sm:text-xl">
                                    {collection.title}
                                </p>
                            </div>
                            <Link
                                href={
                                    webSetting.purchaseType === "wholesale"
                                        ? `/wholesale/${collection.url}`
                                        : `/retail/${collection.url}`
                                }
                                className="inline-flex items-center justify-center px-4 py-2 text-sm sm:text-base font-bold hover:text-pink-600 transition"
                            >
                                View All
                                <ArrowRight />
                            </Link>
                        </div>

                        {/* ✅ Dynamic component rendering */}
                        {RenderComponent ? (
                            RenderComponent(collection)
                        ) : (
                            // fallback if type not in map → default product grid
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {collection?.products?.catalogue?.map((img, i) => (
                                    <CatalogCard
                                        key={i}
                                        product={img}
                                        category={collection.url}
                                    />
                                ))}
                            </div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Collection;



// "use client";
// import React from 'react'
// import Image from "next/image";
// import Link from "next/link";
// import { ArrowRight } from 'lucide-react';
// import { ImageUrl } from '@/helper/imageUrl';
// import CatalogCard from '../../ProductDetail/wholesale/component/CatalogCard';

// const Collection = ({ homeContent, webSetting }) => {
//     console.log("homeContent ====>", homeContent, homeContent.map((item) => item.title));
//     console.log("twoBanner", homeContent.map((item) => item.twoBanner), "threeBanner", homeContent.map((item) => item.threeBanner), "fullSlider", homeContent.map((item) => item.fullSlider), "fourBanner", homeContent.map((item) => item.fourBanner), "cardSlider", homeContent.map((item) => item.cardSlider));

//     return (
//         <div>
//             <div className="container mx-auto px-4 mt-3 mb-0">
//                 {homeContent?.map((collection, id) => {
//                     return (
//                         <React.Fragment key={id}>
//                             <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
//                                 <div className="text-center">
//                                     <p className="text-xl font-semibold sm:text-xl">
//                                         {collection.title}
//                                     </p>
//                                 </div>
//                                 <Link
//                                     href={webSetting.purchaseType === "wholesale" ? `/wholesale/${collection.url}` : `/retail/${collection.url}`}
//                                     className="inline-flex items-center justify-center px-4 py-2 text-sm sm:text-base font-bold hover:text-pink-600 transition"
//                                 >
//                                     View All
//                                     <ArrowRight />
//                                 </Link>
//                             </div >
//                             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                                 {collection.cardSlider.length > 0 && collection}
//                                 {collection?.products?.catalogue?.map((img, i) => {
//                                     return (
//                                         <CatalogCard product={img} category={collection.url} />
//                                     )
//                                 }
//                                 )}
//                             </div>
//                         </React.Fragment>
//                     )
//                 })}
//                 <div className="flex flex-col sm:flex-row justify-between items-center mb-4">

//                     <div className="text-center">
//                         <p className="text-xl font-semibold sm:text-xl">
//                             Celebrate Traditions in Style!
//                         </p>
//                     </div>
//                     <Link
//                         href="/retail/salwar-suits"
//                         className="inline-flex items-center justify-center px-4 py-2 text-sm sm:text-base font-bold hover:text-pink-600 transition"
//                     >
//                         View All
//                         <ArrowRight />
//                     </Link>
//                 </div>

//                 {/* Grid 4 images */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                     {[
//                         "https://cdn.superbazaar.in/uploads/CmsContent/1747461545215-982461687.webp",
//                         "https://cdn.superbazaar.in/uploads/CmsContent/1747461547290-306141995.webp",
//                         "https://cdn.superbazaar.in/uploads/CmsContent/1747461551555-933182494.webp",
//                         "https://cdn.superbazaar.in/uploads/CmsContent/1747461554794-763902156.webp",
//                     ].map((img, i) => (
//                         <Link href="/salwar-kameez" key={i}>
//                             <div className="aspect-[16/9] relative">
//                                 <Image
//                                     src={img}
//                                     alt="Media"
//                                     className="object-cover rounded-lg shadow"
//                                     width={600}
//                                     height={338}
//                                     priority
//                                 />
//                             </div>
//                         </Link>
//                     ))}
//                 </div>
//             </div>

//             {/* ✅ Trending New Arrivals */}
//             <div className="container mx-auto px-4 mt-3 mb-0">
//                 <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
//                     <div className="text-center">
//                         <p className="text-xl font-semibold sm:text-xl">Trending New Arrivals</p>
//                     </div>
//                     <Link
//                         href="/retail/new-arrivals"
//                         className="inline-flex items-center justify-center px-4 py-2 text-sm sm:text-base font-bold hover:text-pink-600 transition"
//                     >
//                         View All
//                         <ArrowRight />
//                     </Link>
//                 </div>

//                 {/* Grid 3 images */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//                     {[
//                         { href: "/sarees", img: "https://cdn.superbazaar.in/uploads/CmsContent/1747456889875-31567485.webp" },
//                         { href: "/mens", img: "https://cdn.superbazaar.in/uploads/CmsContent/1747456893537-744954591.webp" },
//                         { href: "/mens", img: "https://cdn.superbazaar.in/uploads/CmsContent/1747456897252-115793092.webp" },
//                     ].map(({ href, img }, i) => (
//                         <Link href={href} key={i}>
//                             <div className="aspect-[16/9] relative">
//                                 <Image
//                                     src={img}
//                                     alt="Media"
//                                     className="object-cover rounded-lg shadow w-full"
//                                     width={359}
//                                     height={396}
//                                 />
//                             </div>
//                         </Link>
//                     ))}
//                 </div>
//             </div>

//             {/* ✅ Fashion Stories */}
//             <div className="container mx-auto px-4 mt-3 mb-0">
//                 <div className="text-center my-4 mb-4">
//                     <p className="text-xl font-semibold sm:text-xl">Fashion Stories</p>
//                     <div className="flex justify-center">
//                         <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-yellow-400 rounded"></div>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//                     {[
//                         { href: "/catalogue/salwar-suits", img: "https://cdn.superbazaar.in/uploads/CmsContent/1751017455589-775351732.webp" },
//                         { href: "/retail/salwar-suits", img: "https://cdn.superbazaar.in/uploads/CmsContent/1751017462028-222295421.webp" },
//                         { href: "/retail/salwar-suits?color=pink", img: "https://cdn.superbazaar.in/uploads/CmsContent/1751017465988-519124062.webp" },
//                     ].map(({ href, img }, i) => (
//                         <Link href={href} key={i}>
//                             <div className="aspect-[16/9] relative">
//                                 <Image
//                                     src={img}
//                                     alt="Media"
//                                     className="object-cover rounded-lg shadow w-full"
//                                     width={540}
//                                     height={490}
//                                 />
//                             </div>
//                         </Link>
//                     ))}
//                 </div>
//             </div>


//         </div >
//     );
// }

// export default Collection
