export default function NoSpace() {
    return (
        <div className="mt-4 text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-700 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-12 h-12 mx-auto text-gray-400 mb-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"></path></svg>

            <h3 className="mx-auto text-xl font-semibold text-white mb-2">No spaces yet</h3>

            <p className="text-gray-500 dark:text-gray-400 mb-6">
                Create your first space to start collecting testimonials
            </p>

            <a href="/createspaces" className=" text-white font-semibold rounded-md bg-purple-600 py-2 px-4 hover:bg-purple-800">
                + Create New Spaces
            </a>

        </div>
    );
}