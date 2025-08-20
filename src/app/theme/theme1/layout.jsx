import NavBar from "./components/Header/Navbar"
import Footer from "./components/Footer/Footer"
const Layout = ({children}) => {
    return(
        <div>
        <NavBar />
        <main>{children}</main>
        <Footer />
    </div>
    )
}
export default Layout