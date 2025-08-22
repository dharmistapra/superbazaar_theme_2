import AccountDetailtheme1 from "@/app/theme/theme1/Accounts/AccountDetailtheme1";
import AccountDetailtheme2 from "@/app/theme/theme2/Accounts/AccountDetailtheme2";
const currentTheme = "theme1"; 

const AccountDetailsPag=()=> {
  switch (currentTheme) {
    case "theme1":
      return <AccountDetailtheme1 />;
    case "theme2":
      return <AccountDetailtheme2 />;
    default:
      return <ProfileTheme1 />;
  }
}
export default AccountDetailsPag