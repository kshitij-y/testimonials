interface PlateProps {

    title: string;
    imageUrl: string;

}



export default function Plate(props: PlateProps) {
    return (
        <div className=" bg-white dark:bg-gray-800 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-4">
            <div className="flex justify-between p-2">
                {props.title}
                <img src={props.imageUrl} className="h-6 w-6 rounded-full" alt="" />
            </div>
            <div className="p-2 font-semibold">
                0/2
            </div>
            
        </div>
    );
}