import { getThemeModules } from "@/theme/themeConfig";

export default function LoginRoute() {
    const currentTheme = process.env.NEXT_THEME || "theme1";
    const Login = getThemeModules(currentTheme).Login;
    return <Login />;
}
