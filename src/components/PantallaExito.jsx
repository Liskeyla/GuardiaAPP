import { useEffect, useState } from "react";
import { llevaContenedor } from "../services/turnoService";
import { buscarRegistro } from "../store/registros";

function Fila({ etiqueta, valor }) {
  return (
    <div className="flex justify-between px-4 py-2.5 border-t border-[#E3E5EC] text-sm">
      <span className="text-gris">{etiqueta}</span>
      <b className="text-[#1E2130] font-semibold">{valor}</b>
    </div>
  );
}

export default function PantallaExito({ ingreso, onOtro }) {
  const [estado, setEstado] = useState("PENDIENTE");
  const [motivo, setMotivo] = useState("");

  useEffect(() => {
    function leer() {
      const reg = buscarRegistro(ingreso.numero);
      if (!reg) return;
      setEstado(reg.estado);
      setMotivo(reg.motivo || "");
    }

    leer();
    const timer = setInterval(leer, 3000);
    window.addEventListener("storage", leer);
    return () => {
      clearInterval(timer);
      window.removeEventListener("storage", leer);
    };
  }, [ingreso.numero]);

  const pildora =
    estado === "AUTORIZADO"
      ? {
          clase: "bg-[#E7F6EC] text-[#1F7A44]",
          texto: "Ingreso autorizado · acérquese a la garita",
          pulso: false,
        }
      : estado === "RECHAZADO"
        ? {
            clase: "bg-[#FDECEC] text-[#B3261E]",
            texto: `Registro rechazado: ${motivo}. Acérquese a la garita`,
            pulso: false,
          }
        : {
            clase: "bg-[#FFF6E0] text-[#8A6A12]",
            texto: "Esperando autorización de garita",
            pulso: true,
          };

  return (
    <main className="flex-1 overflow-y-auto px-[18px] bg-white">
      <div className="text-center pt-[26px] px-0.5">
        <div className="w-[74px] h-[74px] rounded-full bg-[#1F7A44] text-white text-[40px] flex items-center justify-center mx-auto mb-3.5">
          ✓
        </div>
        <h2 className="text-[21px] text-[#1E2130] mb-1 font-semibold">Registro enviado</h2>

        <div
          className={`inline-flex items-center gap-2 rounded-2xl px-3.5 py-[7px] text-[13px] font-bold mt-3 mb-[18px] ${pildora.clase}`}
        >
          {pildora.pulso && <span className="w-[9px] h-[9px] rounded-full bg-current animate-late" />}
          <span>{pildora.texto}</span>
        </div>

        <div className="border border-[#E3E5EC] rounded-[14px] overflow-hidden text-left">
          <div className="bg-[#F5F7FB] text-center text-[23px] font-extrabold text-barra tracking-wide py-[13px]">
            {ingreso.numero}
          </div>
          <Fila etiqueta="Placa" valor={ingreso.turno.placa} />
          {llevaContenedor(ingreso.turno.operacion) && (
            <Fila etiqueta="Contenedor" valor={ingreso.turno.contenedor} />
          )}
          <Fila etiqueta="Turno" valor={ingreso.turno.turno} />
          <Fila etiqueta="Operación" valor={ingreso.turno.operacion} />
          <Fila etiqueta="Patio" valor={ingreso.turno.patio} />
          <Fila etiqueta="Hora del turno" valor={ingreso.turno.horaTurno} />
        </div>

        <button
          type="button"
          onClick={onOtro}
          className="w-full min-h-[56px] h-[52px] bg-white border-2 border-boton text-boton rounded-xl text-sm font-extrabold mt-4"
        >
          REGISTRAR OTRO TURNO
        </button>
      </div>
    </main>
  );
}
