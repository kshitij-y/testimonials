"use client";
import { useState } from "react";

const code = `<div id="testimonials" data-api="https://api.testimonial.to/api" data-widget="wall-of-love" data-username="testimonial" data-limit="5"></div>
<div id="testimonials" data-api="https://api.testimonial.to/api" data-widget="wall-of-love" data-username="testimonial" data-limit="5"></div>`


export default function Embeded() {
    const [btntxt, setbtntxt] = useState("Copy Code");
  return (
    <div className="flex text-white w-full justify-center mt-12 px-16 md:px-4">
      <div className="bg-gray-800 max-w-4xl mx-auto py-2 rounded-md ">
        <h1 className="h1 mb-4 text-3xl font-bold px-6">Try our sample embed code</h1>
        <p className="text-xl text-gray-600 px-6">
          Embed the wall of love to your website in 1 minute
        </p>
        <div className=" p-4 rounded-md">
          <pre className="text-left text-sm text-gray-200 bg-gray-900 p-4 rounded-md overflow-auto">
            {code}
          </pre>
          <button
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            onClick={() => {
              navigator.clipboard.writeText(code);
              setbtntxt("Copied!");
            }}
          >
            {btntxt}
          </button>
        </div>
      </div>
    </div>
  );
}