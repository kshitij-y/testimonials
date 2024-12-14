"use client";
import Basic from "@/components/createSpace/Basic";
import Preview from "@/components/createSpace/preiview";
import Thank from "@/components/createSpace/Thank";
import TPreview from "@/components/createSpace/thanksPreview";
import { useState } from "react";

export default function Page() {

    const [flag, setFlag] = useState(true);
    const changePage = () => {
        setFlag(!flag);
    }

    const [name, setName] = useState("");
    const [logourl, setLogourl] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [questions, setQuestions] = useState([
        "Who are you / what are you working on?",
        "How has [our product / service] helped you?",
        "What is the best thing about [our product / service]",
    ]);

    const [thankGif, setThankGif] = useState("https://media1.giphy.com/media/g9582DNuQppxC/giphy.gif?cid=ecf05e47ibtkj6mhht2m6gpzy157hwtxvlxlzqlijwrfqh8i&rid=giphy.gif");
    const [thankTitle, setThankTitle] = useState("Thank you!");
    const [thankMsg, setThankMsg] = useState("Thank you so much for your shoutout! It means a ton for us! 🙏");
    const [redUrl, setRedUrl] = useState("T");

    const createSpace = async () => {
        
    }



    return (
        <div className="bg-gray-900 w-full min-h-screen h-fit">

            { /*border line*/}
            <div className="w-full border-b border-gray-800"></div>

            <div className=" bg-gray-800 text-white h-full mt-10 mx-auto px-8 md:w-[95%] rounded-lg">

                {/* Back to Dashboard*/}
                <div className="mt-6 text-xl font-medium text-gray-500 p-2 text-right">
                    <a href="/dashboard">
                        &#x2715;
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-10 gap-2 w-full">

                    {/* Live Preview button + Box */}
                    <div className="col-span-1 sm:col-span-2 md:col-span-4 min-w-[300px] h-fit">
                        {flag && 
                            <div className="bg-green-300 text-green-700 font-medium w-fit rounded-xl py-1 px-3 mx-6 absolute">
                                Live preview - Testimonial page
                            </div>
                        }
                        {flag &&
                            <Preview
                                logoUrl={logourl || ""}
                                title={title|| "Header goes Here..."}
                                description={description || "Your custom message goes here..."}
                                questions={questions}
                            />
                        }
                        {!flag && 
                            <div className="bg-green-300 text-green-700 font-medium w-fit rounded-xl py-1 px-3 mx-6 absolute">
                                Live preview - Thank you page
                            </div>
                        }
                        {!flag && 
                            <TPreview
                                thankGif={thankGif}
                                thankTitle={thankTitle}
                                thankMsg={thankMsg}
                            />
                        }
                    </div>

                    {/* Form to create The Space */}
                    <div className="col-span-1 sm:col-span-2 md:col-span-6 min-h-[700px] m-2 mb-8 px-4">

                        {/* NAVIGATION */}
                        <div className="flex flex-1 justify-evenly max-w-fit mx-auto text-lg border border-gray-600 rounded-lg" onClick={changePage}>

                            <div className={`rounded-l-lg px-4 py-2 cursor-pointer transition-all duration-300 ${flag ? 'bg-purple-700' : ''}`}>
                                Basic
                            </div>

                            <div className={` rounded-r-lg px-4 py-2 cursor-pointer transition-all duration-300 ${!flag ? 'bg-purple-700' : ''}`}>
                                Thank You Page
                            </div>

                        </div>

                        {flag && 
                            <Basic
                                setName={setName}
                                setLogourl={setLogourl}
                                setTitle={setTitle}
                                setDescription={setDescription}
                                setQuestions={setQuestions}
                                Questions={questions}
                            />
                        }

                        {!flag && 
                            <Thank
                                thankGif={thankGif}
                                setThankGif={setThankGif}
                                setThankTitle={setThankTitle}
                                setThankMsg={setThankMsg}
                                setRedUrl={setRedUrl}
                            />
                        }

                        <div className="p-6">
                            <button className=" text-xl bg-purple-600 h-12 w-full my-6 mx-auto rounded-lg" type="submit" onClick={createSpace}>
                                &#43; Create a New Space
                            </button>
                        </div>
                    </div>

                </div>



            </div>

        </div>
    );
}