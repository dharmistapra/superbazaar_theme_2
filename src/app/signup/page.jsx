import { getThemeModules } from "@/theme/themeConfig";

export default function LoginRoute() {
    const currentTheme = process.env.NEXT_THEME || "theme1";
    const Signup = getThemeModules(currentTheme).Signup;
    return <Signup />;
}
