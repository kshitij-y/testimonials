"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { z } from "zod";
import { toast, ToastContainer, Zoom } from "react-toastify";

export default function Page() {
  const params = useParams<{ id: string }>();
  const spaceId = params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [logourl, setLogourl] = useState(""); //
  const [title, setTitle] = useState("Header title"); //
  const [description, setDescription] = useState("header description"); //
  const [rating, setRating] = useState(0);
  const [questions, setQuestions] = useState([]); //
  const [loading, setLoading] = useState(false);
  const [thankGif, setThankGif] = useState("");
  const [thankTitle, setThankTitle] = useState("");
  const [thankMsg, setThankMsg] = useState("");
  const [redirectUrl, setRedUrl] = useState("");
  const [textarea, settextarea] = useState(true);
  const [content, setcontent] = useState("");
  
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setcontent(e.target.value);
  };

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  const modalClose = () => {
    settextarea(!textarea);
    setName("");
    setRating(0);
    setcontent("");
    setEmail("");
  };

  const submitData = async () => {
    try {
      const testimonialSchema = z.object({
        name: z
          .string()
          .trim()
          .min(2, "Name must be at least 2 characters")
          .max(50, "Name must be at most 50 characters"),
        email: z.string().email("Invalid email address"),
        content: z
          .string()
          .trim()
          .min(10, "Content must be at least 10 characters")
          .max(500, "Content must be at most 500 characters"),
        rating: z
          .number()
          .int()
          .min(1, "Rating must be at least 1")
          .max(5, "Rating must be at most 5"),
      });

      const testimonialData = {
        name,
        email,
        content,
        rating,
      };

      const validationResult = testimonialSchema.safeParse(testimonialData);

      if (!validationResult.success) {
        const errorMessages = validationResult.error.errors
          .map((err) => err.message)
          .join("\n");
        toast.error(errorMessages);
        return;
      }
      setLoading(true);

      const res = await axios.post(`/api/user/createTestimonials/${spaceId}`, {
        spaceId: parseInt(spaceId),
        name,
        email,
        content,
        rating,
        show: false,
        videoUrl: null,
      });
      if (res?.data.status == 200) {
        modalClose();
        toast.success("Testimonial submited succefully");
        setLoading(false);
        showThankYou();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showThankYou = () => {
    const gif = encodeURIComponent(thankGif);
    const title = encodeURIComponent(thankTitle);
    const msg = encodeURIComponent(thankMsg);
    const url = encodeURIComponent(redirectUrl);
    window.location.href = `/link/thankyou?gif=${gif}&title=${title}&msg=${msg}&redirect=${url}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/user/getSpace/${spaceId}`);
        const data = await response.json();
        setLoading(false);
        if (data) {
          setLogourl(data?.logoUrl);
          setTitle(data?.title);
          setDescription(data?.description);
          setQuestions(data?.Questions);
          setThankGif(data?.thankGif);
          setThankTitle(data?.thankTitle);
          setThankMsg(data?.thankMsg);
          setRedUrl(data?.redirectUrl);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [spaceId]);

  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-500"></div>
        </div>
      </>
    );
  }
  return (
    <div className="bg-gray-900 w-full min-h-screen pb-12">
      <div className="flex sm:mx-2 lg:mx-12 p-2 bg-gray-900 justify-between items-center">
        <img
          src="https://testimonial.to/static/media/logo.5ff3c18e.svg"
          alt=""
          className="h-10 w-48"
        />
      </div>

      <div className=" flex flex-col w-full md:w-[400px] lg:w-[600px] mx-auto p-8">
        <div className="items-center">
          <div className="flex justify-center mt-2">
            <img
              src={
                logourl ||
                "https://testimonial.to/static/media/just-logo.040f4fd2.svg"
              }
              alt="Space Logo"
              className="h-20 w-20 rounded-full"
            />
          </div>
          <div className="text-gray-300 text-4xl text-center items-center font-semibold my-6">
            <h3>{title}</h3>
          </div>
          <div className="text-xl items-center text-center text-gray-400">
            {description}
          </div>
        </div>

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

        <div className="mt-8">
          <div>
            <h3 className="text-base text-gray-300">QUESTIONS : </h3>
            <div className="border-b-4 border-purple-600 w-24"></div>
            <ul className="list-disc list-inside mt-4">
              {questions?.map((question, index) => (
                <li key={index} className="text-lg text-gray-400 mt-2">
                  {question}
                </li>
              ))}
            </ul>
          </div>
          <div className=" flex flex-col mt-12 gap-6">
            {/* <button className="flex justify-center items-center text-xl px-6 py-2 bg-purple-600 w-full mb-4 sm:w-auto sm:mb-0 rounded-md">Record a Video</button> */}

            <button
              className="flex justify-center items-center text-gray-300 text-xl px-6 py-2 bg-gray-700 w-full mb-4 sm:w-auto sm:mb-0 rounded-md"
              onClick={() => {
                settextarea(!textarea);
              }}
            >
              Write a Text
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {!textarea && (
          <div className="bg-white m-auto flex flex-col items-center fixed inset-0 h-full  w-full md:w-[400px] lg:w-[600px] mx-auto px-8   overflow-y-scroll scrollbar-hide">
            <div
              className="w-[120%] lg:w-[105%] flex items-end justify-end mt-[2%]"
              onClick={() => {
                modalClose();
              }}
            >
              <a>&#x2716;</a>
            </div>

            <div>
              <div className="flex justify-center">
                <img
                  src={
                    logourl ||
                    "https://testimonial.to/static/media/just-logo.040f4fd2.svg"
                  }
                  alt="Space Logo"
                  className="h-20 w-20 rounded-full"
                />
              </div>
              <div>
                <h3 className="text-base">QUESTIONS : </h3>
                <div className="border-b-4 border-purple-600 w-24"></div>
                <ul className="list-disc list-inside mt-4">
                  {questions.map((question, index) => (
                    <li key={index} className="text-lg text-gray-400 mt-2">
                      {question}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-center my-4">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    onClick={() => handleStarClick(index)}
                    className={`w-16 h-8 cursor-pointer ${
                      index < rating ? "text-yellow-300" : "text-gray-400"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                  </svg>
                ))}
              </div>

              <div className="mt-6">
                <textarea
                  value={content}
                  onChange={handleTextareaChange}
                  placeholder="Leave your content here..."
                  className="w-full p-4 border rounded-md text-gray-800"
                  rows={4}
                />
              </div>

              <div className="flex flex-col  font-thin">
                <div className="flex">
                  Name <h3 className="text-red-600">*</h3>
                </div>
                <input
                  className="border border-gray-600 rounded-lg p-2 my-2 text-lg"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder={"Enter your name"}
                  required
                />
              </div>

              <div className="flex flex-col  font-thin">
                <div className="flex">
                  Email <h3 className="text-red-600">*</h3>
                </div>
                <input
                  className="border border-gray-600 rounded-lg p-2 my-2 text-lg"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={"Enter your email"}
                  required
                />
              </div>

              <div className=" flex flex-col mt-12 gap-6">
                <button
                  className="flex justify-center items-center text-gray-300 text-xl px-6 py-2 bg-gray-700 w-full mb-4 sm:w-auto sm:mb-0 rounded-md"
                  onClick={() => {
                    submitData();
                  }}
                >
                  Send your testimonial
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ToastContainer
        theme="dark"
        autoClose={1000}
        hideProgressBar
        transition={Zoom}
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}
