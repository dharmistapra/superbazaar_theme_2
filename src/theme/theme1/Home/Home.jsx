import dynamic from "next/dynamic";
import Banner from "./components/Banner";
import { getHomeBanners, getHomeContent, getHomeProductlist, getTestimonal } from "@/services/homeService";
import { getWebSetting } from "@/services/webSetting";
import Popups from "@/components/Popups";
const Topcategories = dynamic(() => import("./components/TopCategores"))
const Products = dynamic(() => import("../components/Products/Products"))
const ThreeFourBanner = dynamic(() => import("./components/ThreeFourBanner"))
const CardsSlider3D = dynamic(() => import("../components/CardsSlider/CardsSlider3D"))
const FullSlider = dynamic(() => import("./components/FulSlider"))
const TestimonialSlider = dynamic(() => import("./components/Testimonal"))
const TwoBanner = dynamic(() => import("./components/TwoBanner"))
export default async function Home() {
  const [bannerdata,
    HomeContent,
    testimonal,
    webSetting
  ] = await Promise.all(
    [getHomeBanners(), getHomeContent(), getTestimonal(), getWebSetting()]);
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
      {productTabsData.length > 0 && <Products tabsData={productTabsData} purchaseType={webSetting?.purchaseType} />}
      {homeContentArray.map((item) => {
        const renderFn = componentMap[item.type];
        return renderFn ? renderFn(item) : null;
      })}
      <TestimonialSlider data={testimonal} />
      <Popups/>
    </>
  );
}
