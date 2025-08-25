import { getCategoryBanners, getCategoryFilter, getCategoryProducts } from "@/app/services/productService";
import themes from "@/app/themeConfig";


export async function generateMetadata({ params }) {
    const { category } = await params;
    const data = await getCategoryBanners(category)
    return {
        title: data?.title || `Category - ${category}`,
        description: data?.description || `Browse the best products in ${category}`,
    };
}

const RetailCategoryPage = async ({ params }) => {
    const currentTheme = "theme2";
    const { category } = await params;
    const initialProducts = await getCategoryProducts(category, 1, 20,);
    const data = await getCategoryBanners(category)
    const filterData = await getCategoryFilter(category);
    const { CategoryBanner, Products } = themes[currentTheme];
    return (
        <>
            {data?.PageWiseBanner?.length > 0 && <CategoryBanner data={data} />}
            <Products initialData={initialProducts} category={category} filterData={filterData.data} />
        </>
    )
}



export default RetailCategoryPage 