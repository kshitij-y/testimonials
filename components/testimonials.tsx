import React from 'react';

interface Props {
    id: number;
    spaceId: number;
    name: string;
    email: string;
    content: string;
    videoUrl?: string;
    rating: number;
    show: boolean;
}
const deleteTestimonial = async (id: number) => {
    try {
        const response = await fetch(`/api/user/deleteTestimonial/${id}`, {
            method: "DELETE",
        });
        console.log(response);
    } catch (error) {
        console.error("Error deleting testimonial:", error);
    }
}


const updateTestimonial = async (id: number) => {
    try {
        const response = await fetch(`/api/user/testimonials/show/${id}`, {
            method: "POST",
        });
        console.log(response);
    } catch (error) {
        console.error("Error updating testimonial:", error);
    }
}

export default function Testimonial({ id, spaceId, name, email, content, videoUrl, rating, show }: Props) {
    return (
        <div className="p-4 bg-gray-800 rounded-lg shadow-md w-[400px] mt-4">
            
                <div>
                    <h2 className="text-xl font-bold text-white">{name}</h2>
                    <p className="text-sm text-gray-400">{email}</p>
                    <p className="mt-2 text-white">{content}</p>
                    <p className="mt-2 text-yellow-500">Rating: {rating}/5</p>
                    <button
                        onClick={() => deleteTestimonial(id)}
                        className="text-red-500 hover:text-red-700"
                    >
                        delete
                    </button>
                    <button
                        onClick={() => updateTestimonial(id)}
                        className="text-red-500 hover:text-red-700"
                    >
                        show
                    </button>
                </div>
            
        </div>
    );
}