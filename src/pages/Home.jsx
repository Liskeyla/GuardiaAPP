import { Link } from "react-router-dom";
import PhoneFrame from "../components/PhoneFrame.jsx";

export default function Home() {
  return (
    <PhoneFrame>
      <div className="flex-1 bg-white px-6 py-10 flex flex-col">
        <p className="text-[11px] font-extrabold tracking-[1.3px] text-[#8A8FA0]">RFS ECUADOR · DEMO</p>
        <h1 className="text-[26px] font-extrabold text-[#1E2130] mt-2 leading-tight">¿Quién está usando la app?</h1>
        <p className="text-[13.5px] text-gris mt-2 leading-snug">
          Chofer y garita comparten la misma cola. Ábralos en dos pestañas del mismo navegador para ver el flujo.
        </p>

        <Link
          to="/chofer"
          className="mt-8 min-h-[88px] rounded-2xl bg-barra text-white px-5 py-4 flex flex-col justify-center"
        >
          <span className="text-[18px] font-extrabold">Soy chofer</span>
          <span className="text-[13px] opacity-90 mt-1">Digite su turno y confirme el ingreso</span>
        </Link>

        <Link
          to="/garita/cola"
          className="mt-3 min-h-[88px] rounded-2xl bg-verde text-white px-5 py-4 flex flex-col justify-center"
        >
          <span className="text-[18px] font-extrabold">Soy guardia</span>
          <span className="text-[13px] opacity-90 mt-1">Cola de poncheos por validar</span>
        </Link>

        <p className="mt-auto text-[12px] text-[#9AA0AE] leading-snug">
          Siguiente paso: un backend real para sincronizar celular del chofer y tablet de garita.
        </p>
      </div>
    </PhoneFrame>
  );
}
