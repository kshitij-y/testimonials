"use client"
import axios from "axios";
import { useState } from "react";

export default function Avatar({ imageUrl }: { imageUrl: string }) {

    const [isBoxVisible, setIsBoxVisible] = useState(false);

    const showBox = () => {
        setIsBoxVisible((prev) => !prev);
    };

    const handleSignOut = async () => {
        const res = await axios.post("/api/user/signout")
        if (res.data.success) {
            window.location.href = "/";
        }
    }

    return (
        <div>
            <div onClick={showBox}>
            {imageUrl != "" ? (
                <img src={imageUrl} alt="User Avatar" className="h-10 w-10 rounded-full" />
            ) : (
                <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
                    U
                </div>
            )}
            </div>


            {/* dropdown Menu */}
            {isBoxVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white shadow-lg rounded-md border-gray-600 p-4">
                    <ul>
                        <li onClick={()=>{window.location.href = "/dashboard";}} className=" px-4 py-1 cursor-pointer">Dashboard</li>
                        <li onClick={()=>{window.location.href = "/settiing";}} className=" px-4 py-1 cursor-pointer">Settings</li>
                        <li  onClick={handleSignOut} className=" px-4 py-1 cursor-pointer">Sign Out</li>
                    </ul>
                </div>
            )}

        </div>
    );
}