const { getThemeModules } = require("@/theme/themeConfig");
const BrandCataloguePage=async({params})=>{
     const currentTheme = process.env.NEXT_THEME || "theme1";
        const { url } = await params;
        const { BrandCatalogueList } = getThemeModules(currentTheme);
    return(
<BrandCatalogueList brands={url}/>
    )
}

export default BrandCataloguePage