export default function AlertaEstado({ tipo, mensaje }) {
  if (!mensaje) return null;

  return (
    <p
      className={`text-[13.5px] font-semibold mt-2.5 leading-snug ${
        tipo === "bad" ? "text-[#B3261E]" : "text-gris"
      }`}
    >
      {mensaje}
    </p>
  );
}
