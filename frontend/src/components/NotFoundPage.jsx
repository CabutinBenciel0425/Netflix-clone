import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function NotFoundPage() {
  return (
    // <div className="h-full w-full bg-black">
    //   <Navbar />
    //   <div className="min-h-screen text-white bg-black flex flex-col items-center justify-start mt-40 gap-10">
    //     <h1 className="text-5xl font-semibold ">404 Page not found</h1>
    //     <Link to="/" className="flex items-center text-gray-700 gap-3">
    //       <ArrowLeftIcon size={30} className="mt-1" />
    //       <span className="text-2xl hover:underline">Go back to Home</span>
    //     </Link>
    //   </div>
    // </div>

    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: `url("/404.png")` }}
    >
      <header className="absolute top-0 left-0 p-4 bg-black w-full">
        <Link to="/">
          <img src="/netflix-logo.png" alt="Netflix logo" className="h-8" />
        </Link>
      </header>

      <main className="text-center error-page--content z-10">
        <h1 className="text-7xl font-semibold mb-4">Lost your way?</h1>
        <p className="mb-6 text-xl">
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.
        </p>

        <Link to="/" className="bg-white text-black py-2 px-4 rounded">
          Netflix Home
        </Link>
      </main>
    </div>
  );
}

export default NotFoundPage;
