interface Props{
    thankGif: string;
    thankTitle: string;
    thankMsg: string;
}

export default function TPreview(prop: Props) {
    return (
        <div className="flex flex-col text-gray-300 bg-gray-700 min-w-[300px] h-full rounded-lg m-2 mb-8 py-8 px-6">
            <div className="items-center">
                <div className="flex justify-center m-6">
                    <img src={prop.thankGif || "https://media1.giphy.com/media/g9582DNuQppxC/giphy.gif?cid=ecf05e47ibtkj6mhht2m6gpzy157hwtxvlxlzqlijwrfqh8i&rid=giphy.gif"} alt="Thank you" className="h-54 w-96" />
                </div>
                <div className="text-4xl text-center items-center font-semibold my-12">
                    <h3>{prop.thankTitle}</h3>
                </div>
                <div className="text-xl items-center text-center text-gray-400 px-12">
                    {prop.thankMsg}
                </div>
            </div>


        </div>
    );
}