import Input from "./Input";

interface props {
    setName: React.Dispatch<React.SetStateAction<string>>;
    setLogourl: React.Dispatch<React.SetStateAction<string>>;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    setQuestions: React.Dispatch<React.SetStateAction<string[]>>;
    Questions: string[];
}

export default function Basic(prop: props) {

    const handleQuestionChange = (index: number, value: string) => {
        prop.setQuestions((prev) => prev.map((q, i) => (i === index ? value : q)));
    };
    const addQuestion = () => {
        prop.setQuestions((prev) => [...prev, ""]);
    };
    const deleteQuestion = (index: number) => {
        prop.setQuestions((prev) => prev.filter((_, i) => i !== index));
    };


    return (
        <div className="py-2 px-6">
            
            <div className="my-8">
                <div className="text-4xl font-bold text-gray-300 text-center">
                    Create a new Space
                </div>
                <div className="text-xl text-gray-500 text-center my-6">
                    After the Space is created, it will generate a dedicated page for collecting testimonials.
                </div>
            </div>

            <Input label="space Name" setValue={prop.setName} palceholder={""} />
            <Input label="Logo Url" setValue={prop.setLogourl} palceholder={""} />
            <Input label="Header title" setValue={prop.setTitle} palceholder={""} />
            <Input label="Your custom message" setValue={prop.setDescription} palceholder={""} />
            <div>
                Questions:
                <ul className="list-none mt-4">
                    {prop.Questions.map((question, index) => (
                        <li key={index} className="mb-2 flex gap-1">
                            <input
                                type="text"
                                value={question}
                                onChange={(e) => handleQuestionChange(index, e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg p-2 text-gray-200"
                                placeholder={`Question ${index + 1}`}
                                
                                />
                            <button
                                onClick={() => deleteQuestion(index)}
                                className="text-red-500 hover:text-red-700"
                            >
                                &#x1F5D1;
                            </button>
                        </li>
                    ))}
                </ul>
                {prop.Questions.length < 5 && 
                    <button
                        onClick={addQuestion}
                        className="text-blue-500 hover:underline text-sm"
                    >
                        + Add Question( max 5 questions )
                    </button>                
                }
            </div>
        </div>
    );
}
