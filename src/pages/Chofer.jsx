import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  formatearTurno,
  llevaContenedor,
  TEXTO_AYUDA,
  validarTurno,
} from "../services/turnoService";
import { agregarRegistro } from "../store/registros";
import PhoneFrame from "../components/PhoneFrame.jsx";
import TopBar from "../components/TopBar.jsx";
import TurnoInput from "../components/TurnoInput.jsx";
import AlertaEstado from "../components/AlertaEstado.jsx";
import ResumenTurno from "../components/ResumenTurno.jsx";
import PantallaExito from "../components/PantallaExito.jsx";

export default function Chofer() {
  const [paso, setPaso] = useState("inicial");
  const [codigo, setCodigo] = useState("");
  const [mensaje, setMensaje] = useState(TEXTO_AYUDA);
  const [turno, setTurno] = useState(null);
  const [ingreso, setIngreso] = useState(null);
  const [patioWifi, setPatioWifi] = useState("RFS 2");
  const inputRef = useRef(null);
  const debounceRef = useRef(null);
  const reqIdRef = useRef(0);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function limpiarCarga() {
    setTurno(null);
  }

  function programarValidacion(codigoFormateado, patio) {
    clearTimeout(debounceRef.current);
    const id = ++reqIdRef.current;

    if (codigoFormateado.length < 10) {
      setPaso("inicial");
      setMensaje(TEXTO_AYUDA);
      limpiarCarga();
      return;
    }

    setPaso("validando");
    setMensaje("Validando turno...");
    limpiarCarga();

    debounceRef.current = setTimeout(async () => {
      const resultado = await validarTurno(codigoFormateado, patio);
      if (id !== reqIdRef.current) return;

      if (!resultado.ok) {
        setPaso("error");
        setMensaje(resultado.mensaje);
        setTurno(null);
        return;
      }

      setTurno(resultado.turno);
      setMensaje("Turno válido · revise sus datos y confirme");
      setPaso("valido");
      inputRef.current?.blur();
    }, 400);
  }

  function handleCodigoChange(valor) {
    const formateado = formatearTurno(valor);
    setCodigo(formateado);
    programarValidacion(formateado, patioWifi);
  }

  function handlePatioChange(patio) {
    setPatioWifi(patio);
    if (paso === "enviado") return;
    programarValidacion(codigo, patio);
  }

  function handleConfirmar() {
    if (paso !== "valido" || !turno) return;
    const numero = `ING-${Math.floor(100000 + Math.random() * 900000)}`;
    agregarRegistro({
      id: numero,
      turno: turno.turno,
      operacion: turno.operacion,
      patio: turno.patio,
      horaTurno: turno.horaTurno,
      contenedor: llevaContenedor(turno.operacion) ? turno.contenedor : null,
      placa: turno.placa,
      cedula: turno.cedula,
      nombre: turno.nombre,
    });
    setIngreso({ numero, turno });
    setPaso("enviado");
  }

  function handleOtro() {
    clearTimeout(debounceRef.current);
    reqIdRef.current += 1;
    setCodigo("");
    setIngreso(null);
    setTurno(null);
    setPaso("inicial");
    setMensaje(TEXTO_AYUDA);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  const enviado = paso === "enviado";

  return (
    <PhoneFrame>
      <TopBar
        titulo={enviado ? "Comprobante de Ingreso" : "Registro de Conductor"}
        patio={patioWifi}
        onPatioChange={handlePatioChange}
        atrasTo="/"
      />

      {enviado ? (
        <PantallaExito ingreso={ingreso} onOtro={handleOtro} />
      ) : (
        <>
          <main className="flex-1 overflow-y-auto px-[18px] pt-[22px] pb-2.5">
            <h1 className="text-[22px] font-bold text-[#1E2130] mb-1">Digite su turno</h1>
            <p className="text-[13.5px] text-gris mb-4 leading-snug">
              Solo los números. El sistema completa el código y valida automáticamente.
            </p>

            <TurnoInput
              valor={codigo}
              onChange={handleCodigoChange}
              paso={paso}
              inputRef={inputRef}
            />
            <AlertaEstado tipo={paso === "error" ? "bad" : "ok"} mensaje={mensaje} />
            {paso === "valido" && <ResumenTurno turno={turno} />}
            <p className="mt-4 text-[12px] text-[#9AA0AE]">
              <Link to="/garita/cola" className="underline">
                Abrir cola de garita
              </Link>
            </p>
          </main>

          <footer className="px-[18px] pt-2.5 pb-6 bg-white shrink-0">
            <button
              type="button"
              onClick={handleConfirmar}
              disabled={paso !== "valido"}
              className="w-full h-16 min-h-[64px] rounded-xl text-[18px] font-extrabold tracking-wide flex items-center justify-center bg-[#1F7A44] text-white disabled:bg-[#E6E8EF] disabled:text-[#A9AEBC]"
            >
              CONFIRMAR INGRESO
            </button>
            <p className="text-center text-xs text-[#9AA0AE] mt-[9px]">
              {paso === "valido" ? "Un solo toque para avisar a garita" : "Se envía a la garita de su patio"}
            </p>
          </footer>
        </>
      )}
    </PhoneFrame>
  );
}
