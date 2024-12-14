"use client"
import TopBar from "./topBar";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { z } from "zod";

const SigninSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [oauthUrl, setOauthUrl] = useState("");

    
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (emailRef.current) {
            setEmail(emailRef.current.value); 
        }
        if (passwordRef.current) {
            setPassword(passwordRef.current.value);
        }
    }, []);


    

    async function handleSignin() {
        try {
            setMessage("");
            SigninSchema.parse({ email, password });
            const res = await axios.post("http://localhost:3000/api/user/signin", {
                email,
                password,
            });
            setMessage(res.data.message);
            if (res.data.token) {
                window.location.href = "/dashboard";
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                setMessage(error.errors[0].message);
            } else {
                console.error(error);
            }
        }
    }
    
    async function hangleGoogleAuth() {
        try {
            setMessage("");
            const res = await axios.get("http://localhost:3000/api/user/googleauth");
            setOauthUrl(res.data.url);
            window.location.href = res.data.url;
        } catch (error) {
            if (error instanceof z.ZodError) {
                setMessage(error.errors[0].message);
            } else if (axios.isAxiosError(error)) {
                setMessage(error.response?.data.message || "An error occurred");
            } else {
                setMessage("An unexpected error occurred");
            }
            console.error(error);
        }
    }

    return (
        <div className="bg-gray-900 flex flex-col">
            <TopBar />
            <div className="flex flex-col items-center justify-center h-screen max-w-6xl mx-auto ">
                <h1 className="text-white text-4xl font-semibold">Welcome back 👋</h1>
                <div className="flex flex-col bg-gray-700 rounded-md items-center justify-center w-[500px] px-8 py-6 mt-24">
                    <div className="bg-white w-[438px] my-5 text-center text-xl  py-2 rounded-md cursor-pointer"
                        onClick={hangleGoogleAuth}
                    >
                        Sign in with Google
                    </div>
                    <div className="text-gray-500">
                        Or, sign in with your email
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email *</label>
                        <input type="email" placeholder="you@example.com" required
                            ref={emailRef}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-[438px] px-4 py-2 rounded-md bg-white  border border-gray-600 focus:ring-2 focus:ring-purple-600 focus:outline-none" />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">Password *</label>
                        <input type="password" id="password" placeholder="Password" required
                            onChange={(e) => setPassword(e.target.value)}
                            ref={passwordRef}
                            className="w-[438px] px-4 py-2 rounded-md bg-white  border border-gray-600 focus:ring-2 focus:ring-purple-600 focus:outline-none" />
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
                            onClick={handleSignin}
                            className="w-[438px] px-4 py-2 bg-purple-600 text-white rounded-md shadow hover:shadow-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                        >
                            Sign in
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-400">
                            {message && <span className="text-red-500">{message}</span>}
                        </p>
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