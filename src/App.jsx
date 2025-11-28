import { BrowserRouter, Routes, Route } from "react-router-dom";
import TotemScreen from "./pages/TotemScreen";
import PanelScreen from "./pages/PanelScreen";
import AtendenteScreen from "./pages/AtendenteScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TotemScreen />} />
        <Route path="/painel" element={<PanelScreen />} />
        <Route path="/atendente" element={<AtendenteScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
