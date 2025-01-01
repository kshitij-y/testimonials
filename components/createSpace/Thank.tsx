import Input from "./thankInput";

interface props {
    thankGif: string;
    setThankGif: React.Dispatch<React.SetStateAction<string>>;
    setThankTitle: React.Dispatch<React.SetStateAction<string>>;
    setThankMsg: React.Dispatch<React.SetStateAction<string>>;
    setRedUrl: React.Dispatch<React.SetStateAction<string>>;
}

export default function Thank(prop: props){
    return (
        <div className="py-2 px-6">

            <div className="my-8">
                <div className="text-4xl font-bold text-gray-300 text-center">
                    Customize thank you page
                </div>
                <div className="text-xl text-gray-500 text-center my-6">
                    Add your personalized message to show your appreciation
                </div>
            </div>

            <div className="flex w-full gap-2">
                <img src={prop.thankGif || "https://media1.giphy.com/media/g9582DNuQppxC/giphy.gif?cid=ecf05e47ibtkj6mhht2m6gpzy157hwtxvlxlzqlijwrfqh8i&rid=giphy.gif"} alt="Thank you" className="h-[90px] w-[160px]" />
                <Input label="Thank you Gif " setValue={prop.setThankGif} palceholder="custom thank you url"/>

            </div>
            <Input label="thank you title" setValue={prop.setThankTitle} palceholder="Thank you!" />
            <Input label="thank you title" setValue={prop.setThankMsg} palceholder="Thank you so much for your shoutout! It means a ton for us! 🙏" />
            <Input label="Redirect to your own page" setValue={prop.setRedUrl} palceholder="redirect url" />
        </div>
    );
}