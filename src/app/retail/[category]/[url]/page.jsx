import { getProductAttributes, getProductdetail, getProductStitching } from "@/app/services/productService";
import themes from "@/app/themeConfig";





export async function generateMetadata({ params }) {
    const { url } = await params;
    const data = await getProductdetail(url)
    return {
        title: data?.title || ` ${url}`,
        description: data?.description || `Browse the best products in ${url}`,
    };
}


const ProductDetailpage=async ({params})=>{
     const currentTheme = "theme1";
       const { category,url } = await params;
  const { ProductDetail } = themes[currentTheme];

   const [data, stitching, attributes] = await Promise.all([
    getProductdetail(url),
    getProductStitching(url),
    getProductAttributes(url),
  ]);

    return(
        <ProductDetail 
        product={data.data} 
        Stitching={stitching.data}  
        attributes={attributes.data} 
        category={category}/>
    )
}

export default ProductDetailpage;