import dynamic from "next/dynamic";
const load = (importFn) => dynamic(importFn, { ssr: true });
export const getThemeModules = (theme = "theme1") => {
  switch (theme) {
    case "theme1":
      return {
        layout: load(() => import("./theme1/layout")),
        CategoryBanner: load(() => import("./theme1/CategoriesPage/CategoryBannertheme1")),
        Products: load(() => import("./theme1/CategoriesPage/Retail/Productstheme1")),
        Home: load(() => import("./theme1/Home/Home")),
        AccountDetail: load(() => import("./theme1/Accounts/components/AccountDetailtheme1")),
        Address: load(() => import("./theme1/Accounts/components/Address")),
        OrderHistory: load(() => import("./theme1/Accounts/components/OrderHistory")),
        Wishlist: load(() => import("./theme1/Accounts/components/Whishlist")),
        AccountsLayout: load(() => import("./theme1/Accounts/layout")),
        ProductDetail: load(() => import("./theme1/ProductDetail/single/ProductDetail")),
        WholeSaleProductList: load(() => import("./theme1/CategoriesPage/Wholesale/WholeSaleProductList")),
        BrandList: load(() => import("./theme1/brands/brandLists")),
        BrandCatalogueList: load(() => import("./theme1/brands/brandCatalogueList")),
        Catalogue: load(() => import("./theme1/ProductDetail/catalogue/catalogue")),
        WholeSalePage: load(() => import("./theme1/wholesalePage/wholesalepage"))
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
        Login: load(() => import("./theme2/auth/login/page")),
        Signup: load(() => import("./theme2/auth/signup/page")),
        Catalogue: load(() => import("./theme2/ProductDetail/catalogue/catalogue")),
        BrandList: load(() => import("./theme1/brands/brandLists")),
        WholeSalePage: load(() => import("./theme1/wholesalePage/wholesalepage")),
        BrandCatalogueList: load(() => import("./theme1/brands/brandCatalogueList")),
        WholeSaleProductList: load(() => import("./theme2/ProductDetail/wholesale/WholesaleProduct")),

      };
    default:
      return getThemeModules("theme2");
  }
};

export const getThemeLayout = (theme = "theme2") => {
  return getThemeModules(theme).layout;
};