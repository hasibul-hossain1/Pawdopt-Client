import { RouterProvider } from "react-router";
import { router } from "./router/router";
import { ThemeProvider } from "./Providers/ThemeProvider";
import AuthProvider from "./Providers/AuthProvider";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="w-full max-w-[1600px] mx-auto">
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
