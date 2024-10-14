import { Outlet, useLocation } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { AuthProvider } from "./context/AuthContext";
import { AthleteProvider } from "./context/AthleteContext";
import { CompetitionProvider } from "./context/CompetitionContext";
import { Toaster } from "react-hot-toast";
import { MatchProvider } from "./context/MatchContext";
import { ResultProvider } from "./context/ResultContext";
import { ScoreProvider } from "./context/ScoreContext";

function App() {
  const location = useLocation();

  // Jangan tampilkan Header dan footer di halaman login
  const showHeader = location.pathname !== "/login";
  const showFooter = location.pathname !== "/login";

  return (
    <AuthProvider>
      <AthleteProvider>
        <CompetitionProvider>
          <MatchProvider>
            <ScoreProvider>
              <ResultProvider>
                {showHeader && <Header />} 
                <main className="bg-gradient-to-r from-[#d4e4fb] to-[#c3cfe2] min-h-screen">
                  <Outlet /> {/* Tempatkan Outlet di dalam provider */}
                </main>
                <Toaster />
                {showFooter && <Footer />}
              </ResultProvider>
            </ScoreProvider>
          </MatchProvider>
        </CompetitionProvider>
      </AthleteProvider>
    </AuthProvider>
  );
}

export default App;
