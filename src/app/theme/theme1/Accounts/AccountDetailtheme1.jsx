"use client";
import { SquarePen, User } from "lucide-react";
import UpdateProfile from "./updateProfile";
import { useState } from "react";

export default function AccountDetailtheme1() {
    const [open,setOpen]=useState()
    const user = {
        name: "Spartan Druid",
        mobile: "+91 9876543210",
        email: "test@example.com",
        clubPoints: 0.0,
        promoPoints: 0.0,
    };

    return (
        <div className="bg-white shadow rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">My Profile</h2>
                <div className="p-10 bg-gray-100">
                    <button onClick={()=>setOpen(!open)} className="w-10 h-10 shadow-2xl flex items-center justify-center rounded-full bg-white hover:bg-black text-black hover:text-white transition">
                        <SquarePen />
                    </button>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center">
                    <User className="w-10 h-10 text-zinc-400" />
                </div>
                <div className="flex-1 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-6 text-sm text-zinc-900">
                        <p className="col-span-1 sm:col-span-2">
                            <span className="font-medium">Full Name :</span> {user.name}
                        </p>
                        <p className="col-span-1">
                            <span className="font-medium">Mobile No :</span> {user.mobile}
                        </p>
                        <p className="col-span-1 sm:col-span-3">
                            <span className="font-medium">Email ID :</span> {user.email}
                        </p>
                    </div>
                </div>

            </div>

            <hr className="my-4 border-zinc-300" />

             <UpdateProfile
        open={open}
        onClose={() => setOpen(false)}
        user={user}
      />
        </div>
    );
}
