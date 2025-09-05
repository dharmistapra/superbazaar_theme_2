import { getThemeModules } from "@/theme/themeConfig";
import { redirect } from "next/navigation";
export default function LoginRoute() {
    const currentTheme = process.env.NEXT_THEME || "theme1";
    const Login = getThemeModules(currentTheme).Login;
    if(!Login){
        redirect("/");
    }
    return <Login />;
}
