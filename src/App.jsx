import { Outlet, useLocation } from "react-router-dom";
import Header from "./layout/Header";
import { AuthProvider } from "./context/AuthContext";
import { AthleteProvider } from "./context/AthleteContext";
import { CompetitionProvider } from "./context/CompetitionContext";
import { Toaster } from "react-hot-toast";
import { MatchProvider } from "./context/MatchContext";
import { ResultProvider } from "./context/ResultContext";
import { ScoreProvider } from "./context/ScoreContext";

function App() {
  const location = useLocation();

  // Jangan tampilkan Header di halaman login
  const showHeader = location.pathname !== "/login";

  return (
    <AuthProvider>
      <AthleteProvider>
        <CompetitionProvider>
          <MatchProvider>
            <ScoreProvider>
              <ResultProvider>
                {showHeader && <Header />} {/* Hanya tampilkan Header jika bukan di halaman login */}
                <main className="bg-gray-100 min-h-screen">
                  <Outlet /> {/* Tempatkan Outlet di dalam provider */}
                </main>
                <Toaster />
              </ResultProvider>
            </ScoreProvider>
          </MatchProvider>
        </CompetitionProvider>
      </AthleteProvider>
    </AuthProvider>
  );
}

export default App;
