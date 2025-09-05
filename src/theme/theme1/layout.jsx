import Footer from "./components/common/Footer"
import Navbar from "./components/common/Header/Navbar"
import ModalManager from "./Modals/Auth/ModalManager"
import MiniCart from "./Modals/Cart/MiniCart"
const LayoutTheme1 = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ModalManager />
            <MiniCart/>

        </div>
    )
}
export default LayoutTheme1