import Lottie from "lottie-react";
import errorPageAnimation from "../../assets/lotties/Error Page.json";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center">
      <Lottie animationData={errorPageAnimation} loop={true} className="w-full h-auto max-w-md" />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mt-8">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button className="mt-8 px-6 py-3 text-lg">Go to Homepage</Button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
