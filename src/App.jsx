import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Chofer from "./pages/Chofer.jsx";
import Garita from "./pages/Garita.jsx";
import ColaPendientes from "./pages/ColaPendientes.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chofer" element={<Chofer />} />
      <Route path="/garita" element={<Garita />} />
      <Route path="/garita/cola" element={<ColaPendientes />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
