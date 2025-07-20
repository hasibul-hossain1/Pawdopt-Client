import { RouterProvider } from "react-router";
import { router } from "./router/router";
import { Toaster } from "sonner";
import { useAuth } from "./hooks/Auth";
import Loader from "./Shared/Loader";
import Skeleton from "react-loading-skeleton";

function App() {
  const currentUser =useAuth()
  if (currentUser.loading) {
    return <Loader/>
  }
  return (
    <div className="w-full max-w-[1600px] mx-auto">
      <Toaster position="top-center" />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
