import Image from "next/image";
import NavBar from "./theme/theme1/components/Header/Navbar";
import Banner from "./theme/theme1/components/Banner/Banner";
import Topcategories from "./theme/theme1/components/Categories/TopCategores";
import Products from "./theme/theme1/components/Products/Products";
import FullSlider from "./theme/theme1/components/FullSlider/FulSlider";
import ThreeFourBanner from "./theme/theme1/components/ThreeFourBanner/ThreeFourBanner";
import ThreeFourBannerData, { ThreeBannerData } from "./data/ThreeFourBanner";
import CardsSlider3D from "./theme/theme1/components/CardsSlider/CardsSlider3D";
import NormalSliderCard from "./theme/theme1/components/CardsSlider/NormalSlider";
export default function Home() {
  
  return (
    <>
<NavBar/>
<Banner/>
<Topcategories/>
<Products/>

<ThreeFourBanner data={ThreeBannerData} bannergrid={3}/>
<CardsSlider3D/>
<FullSlider/>
<ThreeFourBanner data={ThreeFourBannerData}/>
<NormalSliderCard/>
<div style={{height:"300px"}}></div>
    
    </>
  );
}
