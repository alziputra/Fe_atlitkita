import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "./App";
import "./index.css";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Routing configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace={true} />, // Redirect dari root ke login
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
