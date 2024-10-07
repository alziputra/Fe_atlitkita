import { Outlet, useLocation } from "react-router-dom";
import Header from "./layout/Header";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();

  // Jangan tampilkan Header di halaman login
  const showHeader = location.pathname !== "/login";

  return (
    <AuthProvider>
      {showHeader && <Header />} {/* Hanya tampilkan Header jika bukan di halaman login */}
      <main>
        <Outlet />
      </main>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
