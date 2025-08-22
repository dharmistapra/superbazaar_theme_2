// layout.jsx or _app.jsx
import { Kumbh_Sans } from 'next/font/google'
import FooterLayout from './components/Footer/FooterLayout'
import Navbar from './components/Header/Navbar'

const kumbhSans = Kumbh_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-kumbh-sans'
})

const Layout = ({ children }) => {
    return (
        <div className={kumbhSans.className}>
            <Navbar />
            <main>{children}</main>
            <FooterLayout />
        </div>
    )
}

export default Layout
