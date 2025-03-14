import React from 'react';

interface Props {
    id: string;
    spaceId: number;
    name: string;
    email: string;
    content: string;
    videoUrl?: string;
    rating: number;
    show: boolean;
}
const deleteTestimonial = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this testimonial?"
    );
    if (!isConfirmed) return;
    try {
        console.log(id);
        await fetch(`/api/user/deleteTestimonial/${id}`, {
            method: "DELETE",
        });
        window.location.reload();
    } catch (error) {
        console.error("Error deleting testimonial:", error);
    }
}


const updateTestimonial = async (id: string) => {
    try {
        await fetch(`/api/user/show/${id}`, {
          method: "POST",
        });
        
        window.location.reload();
    } catch (error) {
        console.error("Error updating testimonial:", error);
    }
}

export default function Testimonial({ id, spaceId, name, email, content, videoUrl, rating, show }: Props) {
    return (
      <div className="p-4 bg-gray-800 rounded-lg shadow-md w-full mt-4 h-fit">
        <div>
          <h2 className="text-xl font-bold text-white">{name}</h2>
          <p className="text-sm text-gray-400">{email}</p>
          <p className="mt-2 text-white">{content}</p>
          <p className="mt-2 text-yellow-500">Rating: {rating}/5</p>

          <div className="flex justify-between mt-2">
            <button
              onClick={() => deleteTestimonial(id)}
              className="text-white hover:text-black bg-red-900 items-center px-4 py-1 rounded-md"
            >
              delete
            </button>
            <button
              onClick={() => updateTestimonial(id)}
              className="text-white hover:text-black bg-purple-600 items-center px-4 py-1 rounded-md"
            >
              <p>{show ? "Hide" : "Show"}</p>
            </button>
          </div>
        </div>
      </div>
    );
}