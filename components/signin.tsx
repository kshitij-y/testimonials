import TopBar from "./topBar";

export function Signin() {
    return (
        <div className="bg-gray-900 flex flex-col">
            <TopBar />
            <div className="flex flex-col items-center justify-center h-screen max-w-6xl mx-auto ">
                <h1 className="text-white text-4xl font-semibold">Welcome back 👋</h1>
                <div className="flex flex-col bg-gray-700 rounded-md items-center justify-center w-[500px] px-8 py-6 mt-24">
                    <div className="bg-white w-[438px] my-5 text-center text-xl  py-2 rounded-sm">
                        Sign in with Google
                    </div>
                    <div className="text-gray-500">
                        Or, sign in with your email
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email *</label>
                        <input type="email" id="email" placeholder="you@example.com" required className="w-[438px] px-4 py-2 rounded-md bg-white text-white border border-gray-600 focus:ring-2 focus:ring-purple-600 focus:outline-none" />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">Password *</label>
                        <input type="password" id="password" placeholder="Password" required className="w-[438px] px-4 py-2 rounded-md bg-white text-white border border-gray-600 focus:ring-2 focus:ring-purple-600 focus:outline-none" />
                    </div>
                    {/* Forgot Password */}
                    <div className="text-left text-purple-400 mb-4 w-[438px]">
                        <a href="/forgotpassword" className="hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    {/* Sign Up Button */}
                    <div className="mb-6">
                        <button
                            type="submit"
                            className="w-[438px] px-4 py-2 bg-purple-600 text-white rounded-md shadow hover:shadow-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                        >
                            Sign in
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-400">
                        Don't have an account?{" "}
                            <a
                                href="/signup"
                                className="text-purple-500 hover:underline"
                            >
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}