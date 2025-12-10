import { Routes, Route, Link } from "react-router-dom";
import TotemScreen from "./pages/TotemScreen";
import PainelScreen from "./pages/PainelScreen";

export default function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-left">
          <span className="logo-dot" />
          <span className="topbar-title">Sistema de Atendimento</span>
        </div>

        <nav className="topbar-nav">
          <Link to="/totem">Totem</Link>
          <Link to="/painel">Painel</Link>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<TotemScreen />} />
          <Route path="/totem" element={<TotemScreen />} />
          <Route path="/painel" element={<PainelScreen />} />
        </Routes>
      </main>
    </div>
  );
}
