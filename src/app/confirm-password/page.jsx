// app/confirm-password/page.tsx
import { getTheme } from "@/services/layout";
import { getThemeModules } from "@/theme/themeConfig";

export default async function ConfirmPasswordPage() {
    const themeData = await getTheme(); // ✅ only plain JSON
    const currentTheme = themeData?.name || "theme1";

    const { ConfirmPassword } = getThemeModules(currentTheme);

    return <ConfirmPassword />;
}
