
export default function Features() {
    return (
        <div className="text-white bg-gar-900">
            <div className="max-w-4xl mx-auto text-center pb-12 md:pb-16">
                <h1 className="h1 mb-4 text-5xl font-bold px-6 py-4">
                    Collect and display testimonials all in one solution
                </h1>
            </div>

            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-24 lg:max-w-none lg:mx-0 lg:px-0">
                    <div>
                        <div className="pt-6">
                            <div className="font-bold text-2xl text-purple-600 mb-2">Quick to setup</div>
                            <h3 className="h3 mb-3 text-3xl font-semibold">A dedicated landing page</h3>
                            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                                Create a dedicated landing page for your business. Share the page link easily via email, social media, or even SMS. Setup can be done in two minutes.
                            </p>
                            <div className="mt-6">
                                <a href="/pricing" target="_blank" className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700">
                                    Try it for free
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-auto">
                    <div className="p-4">
                        <img loading="lazy" className="mt-10 mx-auto relative lg:mt-0" src="https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Ffeatures%2Flanding-page.png?alt=media&amp;token=269a1a1c-4539-4d94-aa9e-ed0425eb1fce" width="540" height="405" alt="quick to set up" />
                    </div>
                </div>
            </div>

            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">

                <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-24 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
                    <div>
                        <div className="pt-6">
                            <div className="font-semibold text-2xl text-purple-600 mb-2">Easy to manage</div>
                            <h3 className="h3 mb-3 font-semibold text-3xl">A dashboard to manage all testimonials</h3>
                            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                                You will have a simple &amp; clean dashboard to manage all testimonials in one place. It&apos;s like your email inbox, but it&apos;s designed for your social proof!
                            </p>
                            <div className="mt-6">
                                <a href="/pricing" target="_blank" className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700">
                                    Try it for free
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-auto lg:col-start-1">
                    <div className="p-4">
                        <img loading="lazy" className="mt-10 mx-auto relative lg:mt-0" src="https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Ffeatures%2FEasy%20to%20manage%20(1).png?alt=media&amp;token=5d3ae5f2-e35b-4e35-8070-acde541c18ec" width="540" alt="easy to manage" />
                    </div>
                </div>

            </div>
        </div>
    );
}