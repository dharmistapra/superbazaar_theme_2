import dynamic from "next/dynamic";
// const Theme1Layout = dynamic(() => import("./theme1/layout"));
// const Theme2Layout = dynamic(() => import("./theme2/layout"));

// const CategoryBannertheme1 = dynamic(() => import("./theme1/CategoriesPage/CategoryBannertheme1"));
// const CategoryBannertheme2 = dynamic(() => import("./theme2/CategoriesPage/CategoryBannertheme2"));

// const Productstheme1 = dynamic(() => import("./theme1/CategoriesPage/Productstheme1"));
// const Productstheme2 = dynamic(() => import("./theme2/CategoriesPage/Productstheme2"));

// const Home1 = dynamic(() => import("./theme1/Home/Home"));
// const Home2 = dynamic(() => import("./theme2/Home"));

// const AccountDetailtheme1 = dynamic(() => import("./theme1/Accounts/components/AccountDetailtheme1"));
// const AccountDetailtheme2 = dynamic(() => import("./theme2/Accounts/components/AccountDetailtheme2"));

// const AddressTheme1 = dynamic(() => import("./theme1/Accounts/components/Address"));
// const AddressTheme2 = dynamic(() => import("./theme2/Accounts/components/Address"));

// const OrderHistorythem1 = dynamic(() => import("./theme1/Accounts/components/OrderHistory"));
// const OrderHistorytheme2 = dynamic(() => import("./theme2/Accounts/components/OrderHistory"));

// const WishlistTheme1 = dynamic(() => import("./theme1/Accounts/components/Whishlist"));
// const WishlistTheme2 = dynamic(() => import("./theme2/Accounts/components/Whishlist"));

// const AccountsLayoutTheme1 = dynamic(() => import("./theme1/Accounts/layout"));
// const Accountlayouttheme2 = dynamic(() => import("./theme2/Accounts/layout"));
// const ProductDetailTheme1 = dynamic(() => import("./theme1/ProductDetail/single/ProductDetail"));
// const ProductDetailTheme2 = dynamic(() => import("./theme2/ProductDetail/single/ProductDetail"));

// const themes = {
//   theme1: {
//     layout: Theme1Layout,
//     CategoryBanner: CategoryBannertheme1,
//     Products: Productstheme1,
//     Home: Home1,
//     AccountDetail: AccountDetailtheme1,
//     Address: AddressTheme1,
//     OrderHistory: OrderHistorythem1,
//     Wishlist: WishlistTheme1,
//     AccountsLayout: AccountsLayoutTheme1,
//     ProductDetail: ProductDetailTheme1,
//   },
//   theme2: {
//     layout: Theme2Layout,
//     CategoryBanner: CategoryBannertheme2,
//     Products: Productstheme2,
//     Home: Home2,
//     AccountDetail: AccountDetailtheme2,
//     Address: AddressTheme2,
//     OrderHistory: OrderHistorytheme2,
//     Wishlist: WishlistTheme2,
//     AccountsLayout: Accountlayouttheme2,
//     ProductDetail: ProductDetailTheme2,
//   },
// };

// export default themes;

// export const getThemeLayout = (theme) => {
//   return themes[theme]?.layout || themes.theme1.layout;
// };













const load = (importFn) => dynamic(importFn, { ssr: true });

export const getThemeModules = (theme = "theme1") => {
  switch (theme) {
    case "theme1":
      return {
        layout: load(() => import("./theme1/layout")),
        CategoryBanner: load(() => import("./theme1/CategoriesPage/CategoryBannertheme1")),
        Products: load(() => import("./theme1/CategoriesPage/Productstheme1")),
        Home: load(() => import("./theme1/Home/Home")),
        AccountDetail: load(() => import("./theme1/Accounts/components/AccountDetailtheme1")),
        Address: load(() => import("./theme1/Accounts/components/Address")),
        OrderHistory: load(() => import("./theme1/Accounts/components/OrderHistory")),
        Wishlist: load(() => import("./theme1/Accounts/components/Whishlist")),
        AccountsLayout: load(() => import("./theme1/Accounts/layout")),
        ProductDetail: load(() => import("./theme1/ProductDetail/single/ProductDetail")),
      };

    case "theme2":
      return {
        layout: load(() => import("./theme2/layout")),
        CategoryBanner: load(() => import("./theme2/CategoriesPage/CategoryBannertheme2")),
        Products: load(() => import("./theme2/CategoriesPage/Productstheme2")),
        Home: load(() => import("./theme2/Home")),
        AccountDetail: load(() => import("./theme2/Accounts/components/AccountDetailtheme2")),
        Address: load(() => import("./theme2/Accounts/components/Address")),
        OrderHistory: load(() => import("./theme2/Accounts/components/OrderHistory")),
        Wishlist: load(() => import("./theme2/Accounts/components/Whishlist")),
        AccountsLayout: load(() => import("./theme2/Accounts/layout")),
        ProductDetail: load(() => import("./theme2/ProductDetail/single/ProductDetail")),
        Login: load(() => import("./theme2/auth/login")),
        // Signup: load(() => import("./theme2/auth/Signup"))
      };

    default:
      return getThemeModules("theme2");
  }
};

export const getThemeLayout = (theme = "theme2") => {
  return getThemeModules(theme).layout;
};