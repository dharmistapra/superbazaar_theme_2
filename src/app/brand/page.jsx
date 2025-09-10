import { getTheme } from "@/services/layout";
import { getThemeModules } from "@/theme/themeConfig";
const BrandListPage = async () => {
     const themeData = await getTheme();
      const currentTheme = themeData?.name || "theme1"; 
    const { BrandList } = getThemeModules(currentTheme);
    return (
            <BrandList />
    )
}
export default BrandListPage 