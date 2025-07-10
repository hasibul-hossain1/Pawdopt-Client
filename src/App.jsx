import { RouterProvider } from "react-router";
import { router } from "./router/router";
import { ThemeProvider } from "./components/ThemeProvider";


function App() {
  return (
    <ThemeProvider>
      <div className="w-full max-w-[1600px] mx-auto px-4">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
