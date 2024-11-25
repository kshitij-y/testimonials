
import Embeded from "./embed";
import TopBar from "./topBar";
export default function Landing() {
  return (
    <div className="bg-gray-900">
      <div className="border-b border-gray-800">
        <TopBar />
      </div>

      {/* landing page content */}
      <div className="flex flex-col bg-gray-900 h-full max-w-[80%] mx-auto px-4">
        <div className="flex text-white w-full justify-center mt-24 px-16 md:px-4">
          <div className="max-w-4xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h1 mb-4 text-5xl font-bold px-6 py-4">Get testimonials from your customers with ease</h1>
            <p className="text-xl text-gray-600 dark:text-gray-600 mb-8">
              Collecting testimonials is hard, we get it! So we built Testimonial. In minutes, you can collect text and video testimonials from your customers with no need for a developer or website hosting.
            </p>
            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div>
                <div className="justify-center sm:flex sm:gap-4">
                  <a className="flex text-center text-2xl font-normal items-center px-6 py-2 bg-purple-600 transform hover:scale-105 w-full mb-4 sm:w-auto sm:mb-0 rounded-md" href="/signup">Try FREE now</a>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Get started with free credits on us. <a className="underline font-semibold" href="/pricing">See our pricing →</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* video section */}
        <div className="w-full h-auto">
          <video className="w-full h-auto" controls autoPlay>
            <source src="https://stream.mux.com/Woifb2gxZArCOh2z1aPMW901UdR9pSeF5Dhx6kaEVZYc/high.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="flex text-white w-full justify-center mt-24 px-16 md:px-4">
          <div className="max-w-4xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h1 mb-4 text-5xl font-bold px-6 py-4">Add testimonials to your website with no coding!</h1>
            <p className="text-xl text-gray-600 dark:text-gray-600">
              Copy and paste our HTML code to add the Wall Of Love to your website. We support any no-code platform (Webflow, WordPress, you name it!)
            </p>
          </div>
        </div>

        <div className="mb-48">
            <div className="flex w-full justify-center">
                <img loading="lazy" className="h-10 fill-current text-purple-600 bg-gray-900" src="/logo.5ff3c18e.svg" alt="Logo"></img>
            </div>
          <Embeded />
        </div>
        

        
      </div>
    </div>
  );
}