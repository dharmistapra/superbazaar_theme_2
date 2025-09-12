import { getCurrency, getMenu } from "@/services/layout";
import HeaderMenu from "./component/HeaderMenu"

const NavBar = async () => {
    const [menudata, currencyData] = await Promise.all([getMenu(), getCurrency()]);
    return (
        <>
            <HeaderMenu menudata={menudata} currencyData={currencyData} />
        </>
    )
}

export default NavBar