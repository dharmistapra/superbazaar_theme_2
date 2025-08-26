import Banner from "./components/Banner/Banner";
import Topcategories from "./components/Categories/TopCategores";
import Products from "./components/Products/Products";
import ThreeFourBanner from "./components/HomeBanner/ThreeFourBanner";
import CardsSlider3D from "./components/CardsSlider/CardsSlider3D";
import FullSlider from "./components/FullSlider/FulSlider";
import NormalSliderCard from "./components/CardsSlider/NormalSlider";
import TestimonialSlider from "./components/Testimonial/Testimonal";
import TwoBanner from "./components/HomeBanner/TwoBanner";
import { getHomeBanners, getHomeContent, getHomeProductlist, getTestimonal } from "@/app/services/homeService";

export default async function Home() {
  const [bannerdata, HomeContent,testimonal] = await Promise.all([getHomeBanners(), getHomeContent(),getTestimonal()]);
  const homeContentArray = Array.isArray(HomeContent) ? HomeContent : [];
const productBlocks = homeContentArray.filter(
  (item) => item?.type === "product" && item.categoryId
);

const productTabsData = await Promise.all(
  productBlocks.map(async (block) => {
    const products = await getHomeProductlist(block.category?.url);
    return {
      title: block.title,
      url: block.category?.url,
      products,
    };
  })
);


  const componentMap = {
    "full slider": (item) => <FullSlider key={item.id} slides={item.fullSlider} />,
    "cards slider": (item) => <CardsSlider3D key={item.id} slides={item.cardSlider} />,
    "two banner": (item) => <TwoBanner key={item.id} data={item.twoBanner} bannergrid={2} />,
    "three banner": (item) => <ThreeFourBanner key={item.id} data={item.threeBanner} bannergrid={3} />,
    "four banner": (item) => <ThreeFourBanner key={item.id} data={item.fourBanner} bannergrid={4} />,
  };

  return (
    <>
      <Banner bannerdata={bannerdata} />
      <Topcategories />

      {productTabsData.length > 0 && <Products tabsData={productTabsData} />}

     {homeContentArray.map((item) => {
  const renderFn = componentMap[item.type];
  return renderFn ? renderFn(item) : null;
})}


      <NormalSliderCard />
      <TestimonialSlider data={testimonal}/>
    </>
  );
}
