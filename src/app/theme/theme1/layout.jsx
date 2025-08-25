import NavBar from "./components/Header/Navbar"
import Footer from "./components/Footer/Footer"
import ModalManager from "./Modals/ModalManager"
const Layout = ({ children }) => {
    return (
        <div>
            <NavBar />
            <main>{children}</main>
            <Footer />
            <ModalManager />

        </div>
    )
}
export default Layout