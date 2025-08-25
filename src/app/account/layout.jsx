"use client";
import themes from "../themeConfig";
import { User, MapPin, Package, Heart, LogOut } from "lucide-react";
const tabs = [
  { name: "Account Details", href: "/account/account-details", icon: User },
  { name: "Address", href: "/account/address", icon: MapPin },
  { name: "Orders", href: "/account/orders", icon: Package },
  { name: "Wishlist", href: "/account/wishlist", icon: Heart },
  { name: "Logout", href: "/", icon: LogOut },
];
const AccountLayout = ({ children }) => {
  const currentTheme = "theme2";
  const { AccountsLayout } = themes[currentTheme];
  return <AccountsLayout tabs={tabs}>{children}</AccountsLayout>;
}
export default AccountLayout;
