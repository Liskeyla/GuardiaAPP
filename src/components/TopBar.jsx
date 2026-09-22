import { Link } from "react-router-dom";
import { REDES } from "../services/turnoService";

export default function TopBar({ titulo, patio, onPatioChange, mostrarRed = true, atrasTo }) {
  return (
    <header className="bg-barra text-white px-[18px] pt-4 pb-[14px] shrink-0">
      <div className="flex items-center gap-3 text-[19px] font-semibold">
        {atrasTo ? (
          <Link to={atrasTo} className="text-white no-underline" aria-label="Volver">
            ←
          </Link>
        ) : null}
        <span>{titulo}</span>
      </div>
      {mostrarRed && (
        <div className="mt-2 inline-flex items-center gap-[7px] bg-white/15 rounded-[14px] px-[11px] py-1 text-xs text-[#DFE6FF]">
          <span className="w-[7px] h-[7px] rounded-full bg-[#3DDC84]" />
          <span>WiFi ·</span>
          <select
            value={patio}
            onChange={(e) => onPatioChange(e.target.value)}
            className="bg-transparent border-0 text-white font-bold tracking-wide outline-none text-xs"
            aria-label="Red WiFi del patio"
          >
            {REDES.map((item) => (
              <option key={item.patio} value={item.patio} className="text-[#1E2130]">
                {item.red}
              </option>
            ))}
          </select>
        </div>
      )}
    </header>
  );
}
