"use client"
import { useEffect, useState } from "react";
import dotenv from "dotenv";
dotenv.config();
import NoSpace from "./NoSpace";
import Space from "./Sapces";
import axios from "axios";
import Loading from "./loading";

export default function SpaceSection() {
    const [space, setSpace] = useState([]);

    const [loading, setloading] = useState(true);

    useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get(`api/user/spaces`);
        setSpace(response.data);
        setloading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("Error fetching spaces:", error.response?.data || error.message);
        }
      }
    };

    fetchSpaces();
    }, []);
    
    if (loading) {
        return (
          <div className="flex flex-col items-center text-center bg-gray-900 rounded-lg border border-gray-600 w-[75%] min-w-[600px] mt-6 mx-auto p-12 h-[400px] shadow-lg">
            <Loading />
          </div>
        );
    }

    const spaces: number = space.length;
    return (
      <div className="flex flex-col bg-gray-900 text-white h-full max-w-[80%] mt-4 mx-auto px-8 md:w-[95%] sm:w-full">
        <div className="flex w-full mt-12 p-2 items-center justify-between">
          <div className="text-3xl font-semibold py-1">Spaces</div>
          <div>
            {spaces != 0 && (
              <a
                href="/createspaces"
                className="flex items-center text-white text-1xl rounded-md bg-purple-600 py-1 px-2 hover:bg-purple-800"
              >
                + Create a new spaces
              </a>
            )}
          </div>
        </div>

        <div>
          {spaces == 0 ? <NoSpace /> : <Space spaces={space} />}
        </div>
      </div>
    );
}