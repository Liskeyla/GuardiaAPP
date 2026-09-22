import { llevaContenedor } from "../services/turnoService";

function Fila({ etiqueta, valor, resaltado }) {
  return (
    <div className="flex justify-between text-[13.5px] py-[5px]">
      <span className="text-gris">{etiqueta}</span>
      <b className={resaltado ? "text-garita font-extrabold tracking-wide" : "text-[#1E2130] font-semibold"}>
        {valor}
      </b>
    </div>
  );
}

function hace(iso) {
  const min = Math.max(0, Math.round((Date.now() - new Date(iso)) / 60000));
  if (min < 1) return "recién registrado";
  if (min < 60) return `hace ${min} min`;
  return `hace ${Math.floor(min / 60)} h`;
}

export default function CardPendiente({ registro, destacada, onAutorizar, onRechazar }) {
  const demorado = (Date.now() - new Date(registro.hora)) / 60000 > 15;
  const conCarga = llevaContenedor(registro.operacion);

  if (destacada) {
    return (
      <article className="mx-3.5 bg-white rounded-2xl border-2 border-verde shadow-[0_6px_18px_rgba(31,122,68,0.14)] overflow-hidden">
        <div className="flex justify-between items-start px-4 pt-[15px]">
          <div>
            <div className="text-[38px] font-extrabold tracking-[2px] text-[#1E2130] leading-none">
              {registro.placa}
            </div>
            <div className="text-[12.5px] text-gris font-semibold mt-1.5">
              {registro.operacion} · registrado {hace(registro.hora)}
            </div>
          </div>
          <div
            className={`rounded-[14px] px-3 py-1.5 text-[13px] font-extrabold whitespace-nowrap text-white ${
              demorado ? "bg-naranja" : "bg-garita"
            }`}
          >
            🕐 {registro.horaTurno || "--:--"}
          </div>
        </div>

        <div className="px-4 pt-3">
          <Fila etiqueta="Turno" valor={registro.turno} resaltado />
          {conCarga && <Fila etiqueta="Contenedor" valor={registro.contenedor} />}
          <Fila etiqueta="Chofer" valor={registro.nombre} />
          <Fila etiqueta="Cédula" valor={registro.cedula} />
        </div>

        <div className="px-4 pt-3.5 pb-4">
          <button
            type="button"
            onClick={() => onAutorizar(registro)}
            className="w-full h-[60px] min-h-[60px] bg-verde text-white rounded-xl text-[15.5px] font-extrabold tracking-wide flex items-center justify-center gap-2"
          >
            ✓ VALIDAR Y DAR INGRESO
          </button>
          <button
            type="button"
            onClick={() => onRechazar(registro)}
            className="block w-full text-center bg-transparent text-rojo text-[13px] font-bold pt-3 pb-0.5"
          >
            Rechazar este ingreso
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="flex items-center gap-3 bg-white mx-3.5 mb-[9px] rounded-[13px] px-[13px] py-3 border border-[#E5E8EF]">
      <span
        className={`rounded-[11px] px-[9px] py-[5px] text-xs font-extrabold shrink-0 ${
          demorado ? "bg-[#FDEEE0] text-[#B35B08]" : "bg-[#EDF0F7] text-[#4A5270]"
        }`}
      >
        {registro.horaTurno || "--:--"}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-[19px] font-extrabold tracking-wide text-[#1E2130]">{registro.placa}</div>
        <div className="text-[11.5px] text-gris font-semibold mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
          <b className="text-garita font-extrabold tracking-wide">{registro.turno}</b>
          {" · "}
          {registro.operacion}
          {conCarga ? ` · ${registro.contenedor}` : ""}
        </div>
      </div>
      <button
        type="button"
        onClick={() => onAutorizar(registro)}
        className="w-[52px] h-[52px] min-h-[52px] rounded-full bg-verde text-white text-2xl flex items-center justify-center shrink-0"
        aria-label={`Autorizar ${registro.placa}`}
      >
        ✓
      </button>
    </article>
  );
}
