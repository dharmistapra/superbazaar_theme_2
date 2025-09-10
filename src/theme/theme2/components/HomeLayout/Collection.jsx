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
import NormalSliderCard from "@/theme/theme1/components/CardsSlider/NormalSlider";

const componentMap = {
    "full slider": (item) => (
        <FullSlider key={item.id} slides={item.fullSlider} />
    ),
    "cards slider": (item) => (
        <NormalSliderCard key={item.id} slides={item.cardSlider} />
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

    return (
        <div className="container mx-auto px-4 mt-3 mb-0">
            {Array.isArray(homeContent) && homeContent.map((collection, idx) => {
                const RenderComponent = componentMap[collection.type];
                const hasData =
                    (RenderComponent && (
                        (collection.type === "full slider" && Array.isArray(collection.fullSlider) && collection.fullSlider.length > 0) ||
                        (collection.type === "cards slider" && Array.isArray(collection.cardSlider) && collection.cardSlider.length > 0) ||
                        (collection.type === "two banner" && Array.isArray(collection.twoBanner) && collection.twoBanner.length > 0) ||
                        (collection.type === "three banner" && Array.isArray(collection.threeBanner) && collection.threeBanner.length > 0) ||
                        (collection.type === "four banner" && Array.isArray(collection.fourBanner) && collection.fourBanner.length > 0)
                    )) ||
                    (!RenderComponent && Array.isArray(collection.products?.catalogue) && collection.products.catalogue.length > 0);

                if (!hasData) return null;

                return (
                    <React.Fragment key={idx}>
                        <div className="flex flex-col sm:flex-row justify-between items-center ">
                            <div className="text-center my-4">
                                <p className="text-xl font-semibold sm:text-xl">
                                    {collection.title}
                                </p>
                            </div>
                        </div>

                        {RenderComponent ? (
                            RenderComponent(collection)
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {Array.isArray(collection.products?.catalogue) &&
                                    collection.products.catalogue.map((img, i) => (
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