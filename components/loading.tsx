export default function Loading() {
    return (
      <div className="flex flex-col justify-center items-center h-full w-full bg-gray-900 text-white rounded-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50"></div>
        <p className="mt-4 text-lg font-semibold text-gray-300">
          Loading, please wait...
        </p>
      </div>
    );
}
