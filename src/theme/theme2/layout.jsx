// layout.jsx or _app.jsx
import { Kumbh_Sans } from 'next/font/google'
import FooterLayout from './components/Footer/FooterLayout'
import Navbar from './components/Header/Navbar'
import MiniCart from '../theme1/Modals/Cart/MiniCart'

const kumbhSans = Kumbh_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-kumbh-sans'
})

const LayoutTheme2 = ({ children }) => {
    return (
        <div className={kumbhSans.className}>
            <Navbar />
            <main>{children}</main>
            <FooterLayout />
            <MiniCart />
        </div>
    )
}

export default LayoutTheme2
