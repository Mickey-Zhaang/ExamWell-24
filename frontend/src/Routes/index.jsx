import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";

export const router = createBrowserRouter([
  {
    path: "home",
    element: <Home />,
  },
]);
