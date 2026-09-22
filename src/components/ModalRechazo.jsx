const MOTIVOS = [
  "Documentación incompleta",
  "Placa no coincide con el turno",
  "Chofer no autorizado",
  "Fuera del horario del turno",
];

export default function ModalRechazo({ registro, onMotivo, onCancelar }) {
  if (!registro) return null;

  return (
    <div className="absolute inset-0 bg-[rgba(15,20,35,0.5)] flex items-end z-20">
      <div className="bg-white w-full rounded-t-[18px] px-4 pt-[18px] pb-[22px] animate-sube">
        <h3 className="text-[17px] text-[#1E2130] font-semibold">¿Por qué se rechaza?</h3>
        <p className="text-[12.5px] text-gris mt-[3px] mb-3.5">
          {registro.placa} · {registro.turno}
        </p>
        {MOTIVOS.map((motivo) => (
          <button
            key={motivo}
            type="button"
            onClick={() => onMotivo(motivo)}
            className="w-full bg-[#F4F6FA] border border-[#E5E8EF] rounded-[11px] px-3.5 py-[15px] text-[14.5px] font-semibold text-[#1E2130] mb-[9px] flex justify-between items-center"
          >
            {motivo}
            <span className="text-[#B0B5C3] text-xl">›</span>
          </button>
        ))}
        <button
          type="button"
          onClick={onCancelar}
          className="w-full h-12 bg-transparent text-gris text-sm font-bold text-center mt-1"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
