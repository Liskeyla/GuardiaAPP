export default function Toast({ visible, tipo, texto, onDeshacer }) {
  return (
    <div
      className={`absolute left-3.5 right-3.5 bottom-5 text-white rounded-xl px-4 py-3.5 text-[13.5px] font-semibold flex gap-2.5 items-center shadow-[0_10px_26px_rgba(0,0,0,0.32)] z-30 transition duration-200 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      } ${tipo === "err" ? "bg-[#4A1512]" : "bg-[#12321F]"}`}
    >
      <span className="flex-1">{texto}</span>
      {onDeshacer && (
        <button
          type="button"
          onClick={onDeshacer}
          className="ml-auto bg-white/18 text-white rounded-[14px] px-3 py-[7px] text-xs font-extrabold tracking-wide"
        >
          DESHACER
        </button>
      )}
    </div>
  );
}
