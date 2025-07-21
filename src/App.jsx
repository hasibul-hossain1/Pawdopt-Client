import { RouterProvider } from "react-router";
import { router } from "./router/router";
import { Toaster } from "sonner";
import { useAuth } from "./hooks/Auth";
import Loader from "./Shared/Loader";
import RoleProvider from "./Providers/RoleProvider";
import { useEffect } from "react";
import Aos from "aos";

function App() {
  const currentUser = useAuth();
  

  useEffect(() => {
    Aos.refresh();
  }, [currentUser.loading]);
  
  if (currentUser.loading) {
    return <Loader />;
  }

  return (
    <RoleProvider>
      <div className="w-full max-w-[1600px] mx-auto">
        <Toaster position="top-center" />
        <RouterProvider router={router} />
      </div>
    </RoleProvider>
  );
}

export default App;
