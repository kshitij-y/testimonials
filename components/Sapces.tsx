"use client";
import SpacePlate from "./SpacePlate";

type SpaceType = {
  title: string;
  id: string;
};

export default function Space({ spaces }: { spaces: SpaceType[] }) {
  console.log(spaces);

  return (
    <div className="w-full">
      <div className="w-full px-1">
        <input
          className="bg-gray-800 w-full my-2 mx-auto p-3 rounded-lg border border-gray-500"
          placeholder="search all your spaces"
        />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-6 p-2">
        {spaces.map((space, index) => (
          <SpacePlate
            key={index}
            id={space.id}
            title={space.title}
            videos={0}
            texts={0}
            img={""}
          />
        ))}
      </div>
    </div>
  );
}
