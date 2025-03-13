"use client";
import Testimonial from "@/components/testimonials";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Loading from "@/components/loading";
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

interface Space {
  logoUrl: string;
  title: string;
  description: string;
  Questions: string[];
}

function TestimonialsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState<Props[]>([]);
  const [space, setSpace] = useState<Space | null>(null);

  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/user/getTestimonials/${id}`);
          const res = await response.json();
          setData(
            res.testimonials.sort(
              (a: Props, b: Props) => Number(a.id) - Number(b.id)
            )
          );

          const response2 = await fetch(`/api/user/getSpace/${id}`);
          const spaceData = await response2.json();
          setSpace(spaceData);

          setloading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [id]);

  console.log(data);
  if (loading) {
    return (
      <div className="flex flex-col items-center text-center bg-gray-900 border border-gray-600 w-full p-12 h-screen shadow-lg">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 w-full min-h-screen h-screen flex">
      {space && (
        <div className="flex flex-col text-gray-300 bg-gray-800 min-w-[400px] w-[500px] h-fit rounded-lg py-8 px-6 my-auto ml-12">
          <div className="items-center">
            <div className="flex justify-center mt-2">
              <img
                src={
                  space.logoUrl ||
                  "https://testimonial.to/static/media/just-logo.040f4fd2.svg"
                }
                alt="Space Logo"
                className="h-20 w-20 rounded-full"
              />
            </div>
            <div className="text-4xl text-center items-center font-semibold my-6">
              <h3>{space.title}</h3>
            </div>
            <div className="text-xl items-center text-center text-gray-400">
              {space.description}
            </div>
          </div>
          <div>
            <div className="flex justify-center my-4">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className="w-16 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <div>
              <h3 className="text-base">QUESTIONS : </h3>
              <div className="border-b-4 border-purple-600 w-24"></div>
              <ul className="list-disc list-inside mt-4">
                {space.Questions.map((question, index) => (
                  <li key={index} className="text-lg text-gray-400 mt-2">
                    {question}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col mt-12 gap-6">
              <button className="flex justify-center items-center text-xl px-6 py-2 bg-purple-600 w-full mb-4 sm:w-auto sm:mb-0 rounded-md">
                Edit this Space
              </button>

              <button className="flex justify-center items-center text-xl px-6 py-2 bg-red-900 w-full mb-4 sm:w-auto sm:mb-0 rounded-md">
                Delete this Space
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="border border-gray-700 my-12 mx-12"></div>

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 mt-6 p-4 overflow-auto scrollbar-hide my-12">
        {data.map((testimonial, index) => (
          <Testimonial key={testimonial.id || index} {...testimonial} />
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <TestimonialsPage />
    </Suspense>
  );
}