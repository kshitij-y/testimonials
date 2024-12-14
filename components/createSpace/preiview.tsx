
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
            <div className="mt-12">
                <div>
                    <h3 className="text-xl">QUESTIONS : </h3>
                    <div className="border-b-4 border-purple-600 w-28"></div>
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