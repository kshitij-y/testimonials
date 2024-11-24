export default function TopBar() {
    return (
        <div className="flex mx-14 p-4 bg-gray-900 justify-between items-center">
            <div className="flex">
                <img loading="lazy" className="h-10 fill-current text-purple-600 bg-gray-900" src="/logo.5ff3c18e.svg" alt="Logo"></img>
            </div>
            <div>
                <a href="/features" className="text-white font-semibold py-2 px-4">Features</a>
                <a href="/integrations" className="text-white font-semibold py-2 px-4">Integrations</a>
                <a href="/pricing" className="text-white font-semibold py-2 px-4">Pricing</a>
            </div>
            <div className="flex space-x-4 items-center">
                <a href="/signin" className="text-white font-semibold py-2 px-4">Sign in</a>
                <a href="/signup" className=" text-white font-semibold rounded-sm bg-purple-600 py-2 px-4 hover:bg-purple-800 ">Sign up</a>
            </div>
        </div>
    );
}