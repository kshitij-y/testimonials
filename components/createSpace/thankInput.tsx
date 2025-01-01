 
interface props{
    label: string;
    palceholder: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function Input(prop: props){
    return (
        <div className="flex flex-col text-white font-thin">
            <div className="flex">
                {prop.label} <h3 className="text-red-600">*</h3>
            </div>
            <input className="bg-gray-800 border border-gray-600 rounded-lg p-1 my-2 text-lg" type="text"
                onChange={(e) => prop.setValue(e.target.value)}
                placeholder={prop.palceholder} required />
        </div>
    );
}