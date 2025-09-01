import { getThemeModules } from "@/theme/themeConfig";
const BrandListPage = async () => {
    const currentTheme = process.env.NEXT_THEME || "theme1";
    const { BrandList } = getThemeModules(currentTheme);
    return (
            <BrandList />
    )
}
export default BrandListPage 