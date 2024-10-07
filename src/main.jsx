import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "./App";
import "./index.css";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard";
import Athletes from "./pages/Athletes/Athletes";
import Competitions from "./pages/Competitions/Competitions";
import Results from "./pages/Results/Results";
import Scores from "./pages/Scores/Scores";
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
        path: "dashboard", // Semua pengguna yang sudah login bisa mengakses Dashboard
        element: <Dashboard />,
      },
      {
        path: "athletes", // Hanya admin yang bisa akses
        element: <Athletes />,
      },
      {
        path: "competitions", // Hanya admin yang bisa akses
        element: <Competitions />,
      },
      {
        path: "results", // Hanya admin yang bisa akses
        element: <Results />,
      },
      {
        path: "scores", // Hanya judge yang bisa akses
        element: <Scores />,
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
