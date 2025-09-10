import { getThemeModules } from "@/theme/themeConfig";

export default function ConfirmPasswordPage() {
    const currentTheme = process.env.NEXT_THEME || "theme1";
    const ConfirmPassword = getThemeModules(currentTheme).ConfirmPassword;
    return <ConfirmPassword />;
}
