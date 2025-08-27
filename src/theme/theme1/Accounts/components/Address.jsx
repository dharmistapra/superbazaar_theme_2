"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { addressschema } from "@/schema/schema";
import { SquarePen } from "lucide-react";
import AddressList from "./AddressCards";

const AddressTheme1 = () => {
  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const initialValues = {
    email: "",
    fullName: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    address1: "",
    address2: "",
    companyname: "",
    GstNumber: "",
    mobile: "",
    whatsapp: "",
    defaultBilling: false,
    defaultShipping: false,
  };

  const {
    errors,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    resetForm,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema: addressschema,
    onSubmit: (values) => {
      if (editIndex !== null) {
        const updated = [...addresses];
        updated[editIndex] = values;
        setAddresses(updated);
        setEditIndex(null);
      } else {
        setAddresses([...addresses, values]);
      }
      resetForm();
      setShowForm(false);
    },
  });

  const handleEdit = (index) => {
    setValues(addresses[index]);
    setEditIndex(index);
    setShowForm(true);
  };


  const handleDelete = () => {
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold mb-4">Address Page</h1>

        <button
          onClick={() => {
            resetForm();
            setEditIndex(null);
            setShowForm(!showForm);
          }}
          className="mb-4 px-5 py-2 bg-zinc-800 text-white rounded-lg shadow-md hover:bg-zinc-600 transition"
        >
          {showForm ? "Cancel" : "Add Address"}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ${showForm
          ? "max-h-[1500px] opacity-100 scale-100"
          : "max-h-0 opacity-0 scale-95"
          }`}
      >
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4 border rounded-xl p-6 shadow-lg bg-white mb-6 mt-2"
        >
          <div className="relative">
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Full Name"
              className="peer w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-zinc-500"
            />
            {touched.fullName && errors.fullName && (
              <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
            )}
          </div>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
              className="peer w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-zinc-500"
            />
            {touched.email && errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={values.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Mobile"
              className="peer w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-zinc-500"
            />
            {touched.mobile && errors.mobile && (
              <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              id="country"
              name="country"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Country"
              className="peer w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-zinc-500"
            />
            {touched.country && errors.country && (
              <p className="text-xs text-red-500 mt-1">{errors.country}</p>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              id="state"
              name="state"
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="State"
              className="peer w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-zinc-500"
            />
            {touched.state && errors.state && (
              <p className="text-xs text-red-500 mt-1">{errors.state}</p>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              id="city"
              name="city"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="City"
              className="peer w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-zinc-500"
            />
            {touched.city && errors.city && (
              <p className="text-xs text-red-500 mt-1">{errors.city}</p>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={values.zipCode}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Zip Code"
              className="peer w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-zinc-500"
            />
            {touched.zipCode && errors.zipCode && (
              <p className="text-xs text-red-500 mt-1">{errors.zipCode}</p>
            )}
          </div>
          <div className="relative md:col-span-2">
            <input
              type="text"
              id="address1"
              name="address1"
              value={values.address1}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Address Line 1"
              className="peer w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-zinc-500"
            />
            {touched.address1 && errors.address1 && (
              <p className="text-xs text-red-500 mt-1">{errors.address1}</p>
            )}
          </div>
          <div className="relative md:col-span-2">
            <input
              type="text"
              id="address2"
              name="address2"
              value={values.address2}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Address Line 2"
              className="peer w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-zinc-500"
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-500 transition"
            >
              {editIndex !== null ? "Update Address" : "Save Address"}
            </button>
          </div>
        </form>
      </div>
      <AddressList addresses={addresses} handleEdit={handleEdit} handleDelete={handleDelete} />

    </div>
  );
};

export default AddressTheme1;
