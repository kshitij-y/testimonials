
interface Props{
    logoUrl: string;
    title: string;
    description: string;
    questions:string[];
}


export default function Preview(prop :Props) {
    return (
        <div className="flex flex-col text-gray-300 bg-gray-700 min-w-[300px] h-full rounded-lg m-2 mb-8 py-8 px-6">
           <div className="items-center">
                <div className="flex justify-center mt-2">
                    <img src={prop.logoUrl || "https://testimonial.to/static/media/just-logo.040f4fd2.svg"} alt="Space Logo" className="h-20 w-20 rounded-full" />
                </div>
                <div className="text-4xl text-center items-center font-semibold my-6">
                    <h3>{prop.title}</h3>
                </div>
                <div className="text-xl items-center text-center text-gray-400">
                    {prop.description}
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
                        {prop.questions.map((question, index) => (
                            <li key={index} className="text-lg text-gray-400 mt-2">
                                {question}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col mt-12 gap-6">
                    <button className="flex justify-center items-center text-xl px-6 py-2 bg-purple-600 w-full mb-4 sm:w-auto sm:mb-0 rounded-md">Record a Video</button>

                    <button className="flex justify-center items-center text-xl px-6 py-2 bg-gray-900 w-full mb-4 sm:w-auto sm:mb-0 rounded-md">Write a Text</button>
                </div>
            </div>
        </div>
    );
}