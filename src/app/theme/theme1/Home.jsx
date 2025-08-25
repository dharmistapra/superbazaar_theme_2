import NavBar from "./components/Header/Navbar";
import Banner from "./components/Banner/Banner";
import Topcategories from "./components/Categories/TopCategores";
import Products from "./components/Products/Products";
import ThreeFourBanner from "./components/ThreeFourBanner/ThreeFourBanner";
import ThreeFourBannerData, { ThreeBannerData } from "@/app/data/ThreeFourBanner";
import CardsSlider3D from "./components/CardsSlider/CardsSlider3D";
import FullSlider from "./components/FullSlider/FulSlider";
import NormalSliderCard from "./components/CardsSlider/NormalSlider";
import TestimonialSlider from "./components/Testimonial/Testimonal";
import Footer from "./components/Footer/Footer";
import { getHomeBanners, getHomeContent } from "@/app/services/homeService";

export default async function Home() {
      const bannerdata=await getHomeBanners()
      const HomeContent=await getHomeContent()
 const componentMap = {
    // product: (item) => <Products key={item.id} category={item.category} />,
    "full slider": (item) => <FullSlider key={item.id} slides={item.fullSlider} />,
    "cards slider": (item) => <CardsSlider3D key={item.id} slides={item.cardSlider} />,
    // "two banner": (item) => <ThreeFourBanner key={item.id} data={item.twoBanner} bannergrid={2} />,
    // "three banner": (item) => <ThreeFourBanner key={item.id} data={item.threeBanner} bannergrid={3} />,
    // "four banner": (item) => <ThreeFourBanner key={item.id} data={item.fourBanner} bannergrid={4} />,
  };
  
  return (
        <>
            <Banner bannerdata={bannerdata}/>
            <Topcategories />

            {HomeContent.map((item) => {
        const renderFn = componentMap[item.type];
        return renderFn ? renderFn(item) : null;
      })}
            {/* <Products />
            <ThreeFourBanner data={ThreeBannerData} bannergrid={3} />
            <CardsSlider3D />
            <FullSlider />
            <ThreeFourBanner data={ThreeFourBannerData} /> */}
            <NormalSliderCard />
            <TestimonialSlider />
        </>
    );
}
