{/*
    
    need to give proper data to the plates

*/}
import Plate from "@/components/plate";
import TopBar from "@/components/topBar2";
import { cookies } from "next/headers";
export default async function Page() {

    const cookieStore = await cookies();
    const imageUrl = cookieStore.get("avatarUrl")?.value || "";
    const decodedAvatarUrl = decodeURIComponent(imageUrl);
    const spaces = 0;
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

                    <Plate title={"Total videos"} imageUrl={decodedAvatarUrl} />

                    <Plate title={"Total videos"} imageUrl={decodedAvatarUrl} />

                </div>
            </div>


            {/* Spaces */}
            <div className="flex flex-col bg-gray-900 text-white h-full max-w-[80%] mt-4 mx-auto px-8 md:w-[95%] sm:w-full">
                <div className="mt-12 text-3xl font-semibold p-2">
                    Spaces
                </div>
                <div className="mt-4 text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-700 shadow-sm">
                    {spaces == 0 ? (
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-12 h-12 mx-auto text-gray-400 mb-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"></path></svg>
                            <h3 className="mx-auto text-xl font-semibold text-white mb-2">No spaces yet</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">Create your first space to start collecting testimonials</p>
                        </div>
                    ): (
                        <h3 className="text-xl font-semibold mx-auto text-white mb-2">No spaces yet</h3>
                    )}
                    <a href="/spaces" className=" text-white font-semibold rounded-md bg-purple-600 py-2 px-4 hover:bg-purple-800">+ Create New Spaces</a>
                </div>
            </div>


            {/**  footer section*/}
            <div className="h-20">

            </div>




        </div>
    )
}

