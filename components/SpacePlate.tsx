interface props {
    title: string;
    videos: number;
    texts: number;
    img: string;  
}

export default function SpacePlate(prop: props) {
    return (
        <div className="mt-4 text-center p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-sm">
            <div className="flex justify-between">
                <h1>{prop.title}</h1>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-6 w-6 rounded-md hover:bg-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
                </svg>
            </div>
            <div className="flex justify-between text-gray-400 mt-4">
                <h1>Video: {prop.videos}</h1>
                <h1>Texts: {prop.texts}</h1>
            </div>
        </div>
    );
}