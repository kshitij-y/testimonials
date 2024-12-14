import Plate from "@/components/plate";
import SpaceSection from "@/components/SpaceSection";
import TopBar from "@/components/topBar2";
import { cookies } from "next/headers";
export default async function Page() {

    const cookieStore = await cookies();
    const imageUrl = cookieStore.get("avatarUrl")?.value || "";
    const email = cookieStore.get("email")?.value || "";
    const decodedAvatarUrl = decodeURIComponent(imageUrl);
    
    
    return (
        <div className="bg-gray-900 w-full min-h-screen h-full sm:w-full">

            <TopBar />

            { /*border line*/}
            <div className="w-full border-b border-gray-800"></div>

            {/*overview*/}
            <div className="flex flex-col bg-gray-900 text-white h-full max-w-[80%] mt-10 mx-auto px-8 md:w-[95%] sm:w-full">
                <div className="mt-12 text-3xl font-semibold p-2">
                    Overview
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-6 p-2">
                    <Plate title={"Total videos"} imageUrl={decodedAvatarUrl} />

                    <Plate title={"Total Texts"} imageUrl={decodedAvatarUrl} />

                    <Plate title={"Total videos"} imageUrl={decodedAvatarUrl} />

                </div>
            </div>


            {/* Spaces */}
            <SpaceSection />


            {/**  footer section */}
            <div className="h-20">
            </div>

        </div>
    )
}

