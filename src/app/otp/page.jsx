import { getThemeModules } from "@/theme/themeConfig";
import { redirect } from "next/navigation";
export default function ForgotRoute() {
    const currentTheme = process.env.NEXT_THEME || "theme1";
    const OTP = getThemeModules(currentTheme).OTP;
    if (!OTP) {
        redirect("/");
    }
    return <OTP />;
}
