import Hero from "./components/Hero/Hero";
import Collection from "./components/HomeLayout/Collection";
import TrendingLehengas from "./components/HomeLayout/TrendingLehengas";
import Testimonial from "./components/Testimonial/Testimonial";

export default function Home() {
    return (
        <>
            <Hero />
            <Collection />
            <TrendingLehengas />
            <Testimonial />
        </>
    )
}