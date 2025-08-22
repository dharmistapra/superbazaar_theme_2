import AddressTheme1 from "@/app/theme/theme1/Accounts/Address";
import AddressTheme2 from "@/app/theme/theme2/Accounts/Address";
const currentTheme = "theme1"; 

const AddressPage=()=> {
  switch (currentTheme) {
    case "theme1":
      return <AddressTheme1 />;
    case "theme2":
      return <AddressTheme2 />;
    default:
      return <AddressTheme1 />;
  }
}
export default AddressPage