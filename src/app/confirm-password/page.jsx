import { getThemeModules } from "@/theme/themeConfig";
import { redirect } from "next/navigation";

export default async function ConfirmPassword() {
    const themeData = await getTheme();
    const currentTheme = themeData?.name || "theme1";
    const ConfirmPassword = getThemeModules(currentTheme).ConfirmPassword;
    if (!ConfirmPassword) {
        redirect("/");
    }
    // const currentTheme = process.env.NEXT_THEME || "theme1";
    // const OTP = getThemeModules(currentTheme).OTP;
    // if (!OTP) {
    //     redirect("/");
    // }
    return <ConfirmPassword />;
}
