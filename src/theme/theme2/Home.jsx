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



    return (
        <>
            <Hero banners={bannerdata} />
            <Collection homeContent={HomeContent} webSetting={webSetting} />
            <TrendingLehengas />
            <Testimonial testimonials={testimonal} />
        </>
    )
}