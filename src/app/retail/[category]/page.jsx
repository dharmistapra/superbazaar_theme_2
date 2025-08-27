import { getCategoryBanners, getCategoryFilter, getCategoryProducts } from "@/services/productService";
import { getThemeModules } from "@/theme/themeConfig";


export async function generateMetadata({ params }) {
    const { category } = await params;
    const data = await getCategoryBanners(category)
    return {
        title: data?.title || `Category - ${category}`,
        description: data?.description || `Browse the best products in ${category}`,
    };
}

const RetailCategoryPage = async ({ params }) => {
    const currentTheme = "theme1";
    const { category } = await params;
    const { CategoryBanner,Products } = getThemeModules(currentTheme);  
    const data=await  getCategoryBanners(category);

    return (
        <>
            {data?.PageWiseBanner?.length > 0 && <CategoryBanner data={data} />}
            <Products  category={category} />
        </>
    )
}



export default RetailCategoryPage 