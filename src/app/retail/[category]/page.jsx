import CategoryBanner from "./Components/Banner";
import Products from "./Components/Products";

const RetailCategoryPage =async ({params})=>{
    const resolvedParams = await params; 
  const { category } = resolvedParams;
    return(
        <div>
            <CategoryBanner/>
            <Products/>
        </div>
    )
}
export default RetailCategoryPage 