import { number, string } from "zod";
import SpacePlate from "./SpacePlate";
import { z } from "zod";

// Define the type for the space prop
const spaceSchema = z.object({
    title: z.string(),
});

type SpaceType = z.infer<typeof spaceSchema>;

export default function Space({ spaces }: { spaces: SpaceType[] }) {
    return (
        <div className="w-full">
            <div className="w-full px-1">
                <input className="bg-gray-800 w-full my-2 mx-auto p-3 rounded-lg border border-gray-500" placeholder="search all your spaces" />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-6 p-2">
                {spaces.map((space, index) => (
                    <SpacePlate key={index} title={space.title} videos={0} texts={0} img={""} />
                ))}
            </div>
        </div>
    );
}