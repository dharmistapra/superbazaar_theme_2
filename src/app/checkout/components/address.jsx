import { addressschema } from "@/schema/schema";
import { deleteUserAddress, getUserAddress } from "@/services/accountsService";
import AddressList from "@/theme/theme1/Accounts/components/AddressCards";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Address=()=>{
  const { data: session, } = useSession();
  const [editIndex, setEditIndex] = useState(null);
  const [addresses, setAddresses] = useState([]);

  const fetchAddress = async () => {
      const id = session?.user?.id
      const data = await getUserAddress(id)
      setAddresses(data)
    }
    useEffect(() => {
      if (session?.user?.id) fetchAddress();
    }, [session?.user?.id])

    const handleEdit = (index) => {
    //setValues(addresses[index]);
      setEditIndex(index);
      setShowForm(true);
    };
    const handleDelete = async (id) => {
      try {
        const response = await deleteUserAddress(id)
        fetchAddress()
      } catch (errors) {
        return errors
      }
    }
    return(
        <div className="">
            <div className="grid grid-cols-2 gap-2">
             <AddressList
                   addresses={addresses}
                   handleEdit={handleEdit}
                   handleDelete={handleDelete}
                   fetchAddress={fetchAddress} />
            </div>
        </div>
    )
}
export default Address