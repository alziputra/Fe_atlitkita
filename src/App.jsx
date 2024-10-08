import { Outlet, useLocation } from "react-router-dom";
import Header from "./layout/Header";
import { AuthProvider } from "./context/AuthContext";
import { AthleteProvider } from "./context/AthleteContext";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();

  // Jangan tampilkan Header di halaman login
  const showHeader = location.pathname !== "/login";

  return (
    <AuthProvider>
      <AthleteProvider>
        {showHeader && <Header />} {/* Hanya tampilkan Header jika bukan di halaman login */}
        <main>
          <Outlet />
        </main>
        <Toaster />
      </AthleteProvider>
    </AuthProvider>
  );
}

export default App;
