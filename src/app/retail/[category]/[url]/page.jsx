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
       const { url } = await params;
  const { ProdductDetail } = themes[currentTheme];
     const data = await getProductdetail(url)
     const stitching = await getProductStitching(url)
     const attributes = await getProductAttributes(url)
    return(
        <ProdductDetail product={data.data} Stitching={stitching.data}  attributes={attributes.data}/>
    )
}

export default ProductDetailpage;