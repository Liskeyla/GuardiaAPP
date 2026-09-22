import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { colaPatio, guardarPatioGuardia, leerPatioGuardia } from "../store/registros";
import PhoneFrame from "../components/PhoneFrame.jsx";

const BOTONES = [
  { to: "/garita/cola", especial: true, color: "bg-verde", icono: "🕐", titulo: "Poncheos por Validar", sub: "Registros de choferes y de portería" },
  { color: "bg-garita", icono: "🚛", titulo: "Registrar Importación / Exportación" },
  { color: "bg-morado", icono: "🚛", titulo: "Registrar Reposición / Evacuación" },
  { color: "bg-naranja", icono: "🚛", titulo: "Registrar Reposición" },
  { color: "bg-verdeaz", icono: "🚚", titulo: "Registrar Evacuación" },
];

export default function Garita() {
  const navigate = useNavigate();
  const [patio, setPatio] = useState(() => leerPatioGuardia());
  const [count, setCount] = useState(() => colaPatio(leerPatioGuardia()).length);

  useEffect(() => {
    function refrescar() {
      const actual = leerPatioGuardia();
      setPatio(actual);
      setCount(colaPatio(actual).length);
    }
    const id = setInterval(refrescar, 3000);
    window.addEventListener("storage", refrescar);
    return () => {
      clearInterval(id);
      window.removeEventListener("storage", refrescar);
    };
  }, []);

  function cambiarPatio(nuevo) {
    guardarPatioGuardia(nuevo);
    setPatio(nuevo);
    setCount(colaPatio(nuevo).length);
  }

  return (
    <PhoneFrame>
      <header className="bg-garita text-white px-4 py-[13px] flex items-center justify-between shrink-0">
        <div>
          <div className="text-[17px] font-bold">Menú principal</div>
          <div className="text-[11.5px] opacity-85 mt-0.5 font-semibold tracking-wide">Patio {patio} · pilcoportero</div>
        </div>
        <button
          type="button"
          onClick={() => navigate("/garita/cola")}
          className="bg-white/16 text-white rounded-2xl px-3 py-[7px] text-[11.5px] font-extrabold tracking-wide"
        >
          ◀ COLA
        </button>
      </header>

      <main className="flex-1 overflow-y-auto bg-[#F4F6FA]">
        <div className="px-[18px] pt-[26px] pb-5 bg-white">
          <div className="flex gap-3.5 items-baseline mb-[5px]">
            <span className="text-[18px] font-bold text-[#5D6173] w-[74px] shrink-0">Usuario</span>
            <span className="text-[22px] text-[#6B6F7C]">pilcoportero</span>
          </div>
          <div className="flex gap-3.5 items-baseline mb-[5px]">
            <span className="text-[13px] text-[#8A8FA0] w-[74px] shrink-0">Versión</span>
            <span className="text-sm text-[#6B6F7C]">1.6.1 (161)</span>
          </div>
          <div className="flex gap-3.5 items-baseline">
            <span className="text-[13px] text-[#8A8FA0] w-[74px] shrink-0">Patio</span>
            <span className="text-sm text-[#6B6F7C]">{patio}</span>
          </div>
        </div>

        <div className="flex flex-col gap-[9px] pt-3.5 pb-[22px]">
          {BOTONES.map((b) => {
            const contenido = (
              <>
                <span className="text-2xl shrink-0">{b.icono}</span>
                <span className={b.especial ? "text-[17px] font-bold leading-snug" : "text-[15.5px] font-medium leading-snug"}>
                  {b.titulo}
                  {b.sub ? <span className="block text-[11.5px] opacity-90 font-semibold mt-[3px]">{b.sub}</span> : null}
                </span>
                {b.especial ? (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-verde min-w-[38px] h-[38px] rounded-[19px] flex items-center justify-center text-lg font-extrabold px-2.5">
                    {count}
                  </span>
                ) : null}
              </>
            );

            const clase = `w-full ${b.especial ? "min-h-[88px]" : "min-h-[72px]"} flex items-center gap-[15px] px-[18px] py-3.5 text-white relative ${b.color}`;

            if (b.to) {
              return (
                <Link key={b.titulo} to={b.to} className={clase}>
                  {contenido}
                </Link>
              );
            }
            return (
              <button key={b.titulo} type="button" className={clase}>
                {contenido}
              </button>
            );
          })}

          <div className="px-[18px] pt-3.5 flex gap-2 items-center">
            <span className="text-[11px] font-extrabold text-[#8A8FA0] tracking-wide">SESIÓN DEMO</span>
            {["RFS 1", "RFS 2", "RFS 3"].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => cambiarPatio(p)}
                className={`rounded-[14px] px-[13px] py-[7px] text-xs font-extrabold ${
                  patio === p ? "bg-garita text-white" : "bg-[#EEF0F5] text-[#5D6173]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </main>
    </PhoneFrame>
  );
}
