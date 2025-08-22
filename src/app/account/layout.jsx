"use client";
import LayoutTheme1 from "../theme/theme1/Accounts/LayoutTheme1";
import LayoutTheme2 from "../theme/theme2/Accounts/LayoutTheme2";
import { User, MapPin, Package, Heart, LogOut } from "lucide-react";

const currentTheme = "theme1";

const tabs = [
  { name: "Account Details", href: "/account/account-details",icon:User},
  { name: "Address", href: "/account/address",icon:MapPin  },
  { name: "Orders", href: "/account/orders",icon:Package  },
  { name: "Wishlist", href: "/account/wishlist",icon :Heart },
  { name: "Logout", href: "/",icon:LogOut  },
];

export default function AccountLayout({ children }) {
  switch (currentTheme) {
    case "theme1":
      return <LayoutTheme1 tabs={tabs}>{children}</LayoutTheme1>;
    case "theme2":
      return <LayoutTheme2 tabs={tabs}>{children}</LayoutTheme2>;
    default:
      return <LayoutTheme1 tabs={tabs}>{children}</LayoutTheme1>;
  }
}
