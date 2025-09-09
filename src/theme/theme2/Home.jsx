import { getHomeBanners, getHomeContent, getHomeProductlist, getTestimonal } from "@/services/homeService";
import Hero from "./components/Hero/Hero";
import Collection from "./components/HomeLayout/Collection";
import TrendingLehengas from "./components/HomeLayout/TrendingLehengas";
import Testimonial from "./components/Testimonial/Testimonial";
import { getWebSetting } from "@/services/webSetting";

export default async function Home() {
    const [bannerdata,
        HomeContent,
        testimonal,
        webSetting,
    ] = await Promise.all([getHomeBanners(), getHomeContent(), getTestimonal(), getWebSetting(),]);

    const homeContentArray = Array.isArray(HomeContent) ? HomeContent : [];
    const productBlocks = homeContentArray.filter(
        (item) => item?.type === "product" && item.categoryId
    );
    const productTabsData = await Promise.all(
        productBlocks.map(async (block) => {
            const products = await getHomeProductlist(block.category?.url, webSetting?.purchaseType);
            return {
                title: block.title,
                url: block.category?.url,
                products,
            };
        })
    );

    return (
        <>
            <Hero banners={bannerdata} />
            <TrendingLehengas tabsData={productTabsData} purchaseType={webSetting?.purchaseType} />
            <Collection homeContent={HomeContent} webSetting={webSetting} productTabsData={productTabsData} />
            <Testimonial testimonials={testimonal} />
        </>
    )
}