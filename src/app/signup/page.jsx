import { getThemeModules } from "@/theme/themeConfig";

const theme = "theme2";

export default function LoginRoute() {
    const Signup = getThemeModules(theme).Signup;
    return <Signup />;
}
