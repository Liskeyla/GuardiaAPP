export default function TurnoInput({ valor, onChange, paso, inputRef }) {
  const ok = paso === "valido";
  const bad = paso === "error";
  const validando = paso === "validando";

  return (
    <div className="relative">
      <input
        ref={inputRef}
        id="turno"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        autoFocus
        placeholder="TRN-000000"
        maxLength={10}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-[76px] rounded-xl pl-[18px] pr-[54px] text-[28px] font-extrabold tracking-[2px] text-[#1E2130] outline-none border-2 ${
          ok
            ? "border-[#1F7A44] bg-[#F5FCF7]"
            : bad
              ? "border-[#B3261E] bg-[#FEF7F7]"
              : "border-[#C3C7D2] bg-white focus:border-acento focus:shadow-[0_0_0_4px_rgba(46,95,110,0.14)]"
        }`}
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-[30px] h-[30px] flex items-center justify-center">
        {validando && (
          <div className="w-6 h-6 rounded-full border-[3px] border-[#DCE0E8] border-t-acento animate-spin" />
        )}
        {ok && (
          <span className="w-[30px] h-[30px] rounded-full bg-[#1F7A44] text-white text-[17px] flex items-center justify-center">
            ✓
          </span>
        )}
        {bad && (
          <span className="w-[30px] h-[30px] rounded-full bg-[#B3261E] text-white text-[17px] flex items-center justify-center">
            !
          </span>
        )}
      </div>
    </div>
  );
}
