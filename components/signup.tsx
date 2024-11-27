"use client";
import { useState, useRef } from "react";
import TopBar from "./topBar";
import axios from "axios";
import { z } from "zod";

const SignupSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});


export function Signup() {
    const [message, setMessage] = useState("");
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function handleSignup() {
        try {
            setMessage("");
            SignupSchema.parse({
                name: nameRef.current?.value || "",
                email: emailRef.current?.value || "",
                password: passwordRef.current?.value || ""
            });
            const res = await axios.post("http://localhost:3000/api/user/signup", {
                name: nameRef.current?.value || "",
                email: emailRef.current?.value || "",
                password: passwordRef.current?.value || "",
            });
            setMessage(res.data.message);
            window.location.href = "/dashboard";
        } catch (error) {
            console.error(error);
        }
    }

    async function hangleGoogleAuth() {
        try {
            setMessage("");
            const res = await axios.get("http://localhost:3000/api/user/googleauth");
            setMessage(res.data.message);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="bg-gray-900 flex flex-col">
            <TopBar />
            <div className="flex flex-col items-center justify-center h-screen max-w-6xl mx-auto mt-[100px]">
                <h1 className="text-white text-4xl font-semibold">Sign up for free 🤗</h1>
                <h2 className="text-gray-600 text-2xl font-semibold m-3">You will get 2 video and 10 text testimonial credits for FREE!</h2>
                <div className="flex flex-col bg-gray-700 rounded-md items-center justify-center w-[500px] px-8 py-6 my-12">
                    <div className="text-gray-500 w-[438px]">
                        I agree to the Testimonial Terms of Service and I'm aware my personal data is processed in accordance with our Privacy Policy. Please read it carefully.
                    </div>
                    <div className="bg-white w-[438px] my-5 text-center text-xl  py-2 rounded-sm"
                        onClick={hangleGoogleAuth}    
                    >
                        Sign up with Google
                    </div>
                    <div className="text-gray-500">
                        Or, register with your email
                    </div>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-400 mb-1">First name *</label>
                        <input type="text" placeholder="Your first name" required
                            ref={nameRef}
                            className="w-[438px] px-4 py-2 rounded-md bg-white border border-gray-600 focus:ring-2 focus:ring-purple-600 focus:outline-none" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email *</label>
                        <input type="email" id="email" placeholder="you@example.com" required
                            ref={emailRef}
                            className="w-[438px] px-4 py-2 rounded-md bg-white border border-gray-600 focus:ring-2 focus:ring-purple-600 focus:outline-none" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">Password *</label>
                        <input type="password" id="password" placeholder="Password" required
                            ref={passwordRef}
                            className="w-[438px] px-4 py-2 rounded-md bg-white border border-gray-600 focus:ring-2 focus:ring-purple-600 focus:outline-none" />
                    </div>

                    <div className="mb-6">
                        <button type="submit"
                            onClick={handleSignup} 
                            className="w-[438px] px-4 py-2 bg-purple-600 text-white rounded-md shadow hover:shadow-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:outline-none">
                            Sign up
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-400">
                            {message && <span className="text-red-500">{message}</span>}
                        </p>
                    </div>
                    
                    <div className="text-center">
                        <p className="text-sm text-gray-400">
                            Already have an account?{" "}
                            <a href="/signin" className="text-purple-500 hover:underline">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}