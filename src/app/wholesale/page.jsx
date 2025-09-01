import { getThemeModules } from "@/theme/themeConfig";

const WholeSale=async()=>{
    const currentTheme = process.env.NEXT_THEME || "theme1";
        const { WholeSalePage} = getThemeModules(currentTheme);
    return(
        <WholeSalePage/>
    )
}
export default WholeSale