import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AxiosContextProvider } from "./AxiosContext.jsx";
import { APIContextProvider } from "./APIContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Search from "./Search.jsx";
import Saves from "./Saves.jsx";

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
  <AxiosContextProvider>
    <APIContextProvider>
      <RouterProvider router={router} />
    </APIContextProvider>
  </AxiosContextProvider>
);
