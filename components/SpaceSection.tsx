"use client"
import { useEffect, useState } from "react";
import NoSpace from "./NoSpace";
import Space from "./Sapces";
import axios from "axios";

export default function SpaceSection() {
    const [space, setSpace] = useState([]);

    useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user/spaces");
        setSpace(response.data);

      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("Error fetching spaces:", error.response?.data || error.message);
        }
      }
    };

    fetchSpaces();
    }, []);
    const spaces: number = space.length;
    return (
        <div className="flex flex-col bg-gray-900 text-white h-full max-w-[80%] mt-4 mx-auto px-8 md:w-[95%] sm:w-full">

            <div className="flex w-full mt-12 p-2 items-center justify-between">
                <div className="text-3xl font-semibold py-1">Spaces</div>
                <div>
                    {(spaces != 0) &&
                        <a href="/createspaces" className="flex items-center text-white text-1xl rounded-md bg-purple-600 py-1 px-2 hover:bg-purple-800"> 
                            + Create a new spaces
                        </a>
                    }
                </div>
            </div>

            <div>
                {spaces == 0 ? (
                    <NoSpace />
                ):(
                        <Space spaces={space} />
                )}
                
            </div>

        </div>
    );
}