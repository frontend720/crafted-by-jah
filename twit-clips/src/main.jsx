import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AxiosContextProvider } from "./AxiosContext.jsx";
import { APIContextProvider } from "./APIContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Search from "./Search.jsx";
import Saves from "./Saves.jsx";
import { AuthContextProvider } from "./AuthContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Search />,
      },
      {
        path: "/saves",
        element: <Saves />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <AxiosContextProvider>
      <APIContextProvider>
        <RouterProvider router={router} />
      </APIContextProvider>
    </AxiosContextProvider>
  </AuthContextProvider>
);
