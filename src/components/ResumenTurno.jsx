import { llevaContenedor, ventanaIngreso } from "../services/turnoService";

function Fila({ etiqueta, valor }) {
  return (
    <div className="flex justify-between px-4 py-2.5 border-t border-[#E3E5EC] text-sm">
      <span className="text-gris">{etiqueta}</span>
      <b className="text-[#1E2130] font-semibold">{valor}</b>
    </div>
  );
}

export default function ResumenTurno({ turno }) {
  if (!turno) return null;

  const { desde, hasta } = ventanaIngreso(turno.horaTurno);

  return (
    <section className="mt-[22px] border border-[#E3E5EC] rounded-[14px] overflow-hidden animate-entra">
      <div className="bg-[#F5F7FB] px-4 py-[13px] flex justify-between items-center">
        <span className="text-[13px] font-extrabold text-acento tracking-wide">
          {turno.operacion} · {turno.patio}
        </span>
        <span className="bg-barra text-white rounded-[13px] px-[11px] py-[5px] text-[12.5px] font-extrabold">
          🕐 {turno.horaTurno}
        </span>
      </div>

      <div className="text-[34px] font-extrabold tracking-[2px] text-[#1E2130] px-4 pt-4 pb-0.5">
        {turno.placa}
      </div>
      <div className="px-4 pb-3.5 text-gris text-[13px] font-semibold">
        {llevaContenedor(turno.operacion) ? `Contenedor ${turno.contenedor}` : "Sin contenedor asignado"}
      </div>

      <Fila etiqueta="Chofer" valor={turno.nombre} />
      <Fila etiqueta="Cédula" valor={turno.cedula} />
      <Fila etiqueta="Puede ingresar" valor={`${desde} a ${hasta}`} />
    </section>
  );
}
