"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();

    const thankGif = searchParams.get("gif");
    const thankTitle = searchParams.get("title");
    const thankMsg = searchParams.get("msg");
    const redirectUrl = searchParams.get("redirect");
    
    

    const router = useRouter();

    useEffect(() => {
        if (redirectUrl) {
            const timer = setTimeout(() => {
                router.push(redirectUrl);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [redirectUrl, router]);

  return (
    <div className="flex bg-gray-900 min-w-screen min-h-screen text-white">
      <div className="flex flex-col justify-center text-gray-300 bg-gray-800 rounded-lg h-[500px]  py-8 px-6 mt-[5%] mx-auto">
        <div className="items-center">
          <div className="flex justify-center m-6">
            <img
              src={
                thankGif ||
                "https://media1.giphy.com/media/g9582DNuQppxC/giphy.gif?cid=ecf05e47ibtkj6mhht2m6gpzy157hwtxvlxlzqlijwrfqh8i&rid=giphy.gif"
              }
              alt="Thank you"
              className="h-54 w-96"
            />
          </div>
          <div className="text-4xl text-center items-center font-semibold my-12">
            <h3>{thankTitle || "Thank you!"}</h3>
          </div>
          <div className="text-xl items-center text-center text-gray-400 px-12">
            {thankMsg ||
              "Thank you so much for your shoutout! It means a ton for us! 🙏"}
          </div>
        </div>
      </div>
    </div>
  );
}
