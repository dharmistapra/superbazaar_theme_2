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
    const { category } = await params;
    const currentTheme = "theme1";
    const { CategoryBanner, Products } = themes[currentTheme];
   const [initialProducts, data, filterData] = await Promise.all([
  getCategoryProducts(category, 1, 20),
  getCategoryBanners(category),
  getCategoryFilter(category)
]);

    return (
        <>
            {data?.PageWiseBanner?.length > 0 && <CategoryBanner data={data} />}
            <Products initialData={initialProducts} category={category} filterData={filterData.data} />
        </>
    )
}



export default RetailCategoryPage 