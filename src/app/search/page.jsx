import { getThemeModules } from "@/theme/themeConfig";
const SearchPage = () => {
    const currentTheme = process.env.NEXT_THEME || "theme1";
       const { Search } = getThemeModules(currentTheme);
    return (
        <Search/>
    );
};

export default SearchPage;
