import NavBar from "./components/Header/Navbar"
import Footer from "./components/Footer/Footer"
import ModalManager from "./Modals/Auth/ModalManager"
import MiniCart from "./Modals/Cart/MiniCart"
const Layout = ({ children }) => {
    return (
        <div>
            <NavBar />
            <main>{children}</main>
            <Footer />
            <ModalManager />
            <MiniCart/>

        </div>
    )
}
export default Layout