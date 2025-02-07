"use client";
import { useState } from "react";

export default function Testimonials() {
    const [testimonialId, setTestimonialId] = useState("1");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Testimonials</h1>
            <input 
                type="number" 
                value={testimonialId} 
                onChange={(e) => setTestimonialId(e.target.value)}
                className="p-2 border rounded mb-4"
                placeholder="Enter Testimonial ID"
            />
            <iframe
                id="testimonial-iframe"
                src={`/api/user/getTestimonials/${testimonialId}`}
                width="100%"
                height="600"
                className="border rounded shadow-lg"
            ></iframe>
        </div>
    );
}
