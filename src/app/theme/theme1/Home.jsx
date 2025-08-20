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

export default function Home() {
    return (
        <>
            <Banner />
            <Topcategories />
            <Products />
            <ThreeFourBanner data={ThreeBannerData} bannergrid={3} />
            <CardsSlider3D />
            <FullSlider />
            <ThreeFourBanner data={ThreeFourBannerData} />
            <NormalSliderCard />
            <TestimonialSlider />
        </>
    );
}
