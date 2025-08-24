import Theme1Layout from "@/app/theme/theme1/layout";
import Theme2Layout from "@/app/theme/theme2/layout";

import CategoryBannertheme1 from "@/app/theme/theme1/CategoriesPage/CategoryBannertheme1";
import CategoryBannertheme2 from "@/app/theme/theme2/CategoriesPage/CategoryBannertheme2";

import Productstheme1 from "@/app/theme/theme1/CategoriesPage/Productstheme1";
import Productstheme2 from "@/app/theme/theme2/CategoriesPage/Productstheme2";

import Home1 from "@/app/theme/theme1/Home";
import Home2 from "@/app/theme/theme2/Home";

import AccountDetailtheme1 from "./theme/theme1/Accounts/components/AccountDetailtheme1";
import AccountDetailtheme2 from "./theme/theme2/Accounts/components/AccountDetailtheme2";

import AddressTheme1 from "./theme/theme1/Accounts/components/Address";
import AddressTheme2 from "./theme/theme2/Accounts/components/Address";

import OrderHistorythem1 from "./theme/theme1/Accounts/components/OrderHistory";
import OrderHistorytheme2 from "./theme/theme2/Accounts/components/OrderHistory";

import WishlistTheme1 from "./theme/theme1/Accounts/components/Whishlist";
import WishlistTheme2 from "./theme/theme2/Accounts/components/Whishlist";

import AccountsLayoutTheme1 from "./theme/theme1/Accounts/layout";
import Accountlayouttheme2 from "./theme/theme2/Accounts/layout";

import ProductDetailTheme1 from "./theme/theme1/ProductDetail/single/ProductDetail";
import ProductDetailTheme2 from "./theme/theme2/ProductDetail/single/ProductDetail";


const themes = {
  theme1: {
    layout: Theme1Layout,
    CategoryBanner: CategoryBannertheme1,
    Products: Productstheme1,
    Home: Home1,
    AccountDetail: AccountDetailtheme1,
    Address: AddressTheme1,
    OrderHistory: OrderHistorythem1,
    Wishlist: WishlistTheme1,
    AccountsLayout: AccountsLayoutTheme1,
    ProdductDetail: ProductDetailTheme1,
  },
  theme2: {
    layout: Theme2Layout,
    CategoryBanner: CategoryBannertheme2,
    Products: Productstheme2,
    Home: Home2,
    AccountDetail: AccountDetailtheme2,
    Address: AddressTheme2,
    OrderHistory: OrderHistorytheme2,
    Wishlist: WishlistTheme2,
    AccountsLayout: Accountlayouttheme2,
    ProductDetail: ProductDetailTheme2,
  },
};

export default themes;
export const getThemeLayout = (theme) => {
  return themes[theme]?.layout || themes.theme1.layout;
}