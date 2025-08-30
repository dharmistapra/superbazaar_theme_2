import { getThemeModules } from "@/theme/themeConfig";

const theme = "theme2";

export default function LoginRoute() {
    const Login = getThemeModules(theme).Login;
    return <Login />;
}
