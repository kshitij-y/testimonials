import { cookies } from "next/headers";
import Avatar from "./avatarBox";

export default async function TopBar() {
    const cookieStore = await cookies();
    const imageUrl = cookieStore.get("avatarUrl")?.value || "";
    const decodedAvatarUrl = decodeURIComponent(imageUrl);
    
    return (
        <div className="flex mx-14 p-4 bg-gray-900 justify-between items-center">
            <div className="flex">
                <img loading="lazy" className="h-10 fill-current text-purple-600 bg-gray-900" src="/logo.5ff3c18e.svg" alt="Logo"></img>
            </div>
            <Avatar imageUrl={decodedAvatarUrl} />
        </div>
    );
}