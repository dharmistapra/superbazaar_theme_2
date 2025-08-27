import themes from "@/themeConfig";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { getUserInfo } from "@/services/accountsService";
const AccountDetailsPag = async() => {
  const currentTheme = "theme1";
    const session = await getServerSession(authOptions);
   const {id}=session?.user
   const data=await getUserInfo(id)
  const { AccountDetail } = themes[currentTheme];
  return <AccountDetail data={data}/>
}
export default AccountDetailsPag