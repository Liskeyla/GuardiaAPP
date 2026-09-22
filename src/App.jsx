import { Navigate, Route, Routes } from "react-router-dom";
import Garita from "./pages/Garita.jsx";
import ColaPendientes from "./pages/ColaPendientes.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/garita/cola" replace />} />
      <Route path="/garita" element={<Garita />} />
      <Route path="/garita/cola" element={<ColaPendientes />} />
      <Route path="*" element={<Navigate to="/garita/cola" replace />} />
    </Routes>
  );
}
