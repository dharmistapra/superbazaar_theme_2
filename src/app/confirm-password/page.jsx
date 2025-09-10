import { getTheme } from "@/services/layout";
import { getThemeModules } from "@/theme/themeConfig";

export default async function ConfirmPasswordPage() {
    const themeData = await getTheme();
    const currentTheme = themeData?.name || "theme1";
    const ConfirmPassword = getThemeModules(currentTheme).ConfirmPassword;
    return <ConfirmPassword />;
}
