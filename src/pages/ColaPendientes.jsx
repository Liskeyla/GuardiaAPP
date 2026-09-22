import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  colaPatio,
  leerPatioGuardia,
  resolverRegistro,
} from "../store/registros";
import PhoneFrame from "../components/PhoneFrame.jsx";
import CardPendiente from "../components/CardPendiente.jsx";
import ModalRechazo from "../components/ModalRechazo.jsx";
import Toast from "../components/Toast.jsx";

function normalizarPlaca(valor) {
  return valor.toUpperCase().replace(/[-\s]/g, "");
}

export default function ColaPendientes() {
  const navigate = useNavigate();
  const [patio, setPatio] = useState(() => leerPatioGuardia());
  const [lista, setLista] = useState(() => colaPatio(leerPatioGuardia()));
  const [busca, setBusca] = useState("");
  const [rechazando, setRechazando] = useState(null);
  const [toast, setToast] = useState({ visible: false, tipo: "ok", texto: "", id: null });
  const toastTimer = useRef(null);

  function refrescar(patioActual = leerPatioGuardia()) {
    setPatio(patioActual);
    setLista(colaPatio(patioActual));
  }

  useEffect(() => {
    const id = setInterval(() => refrescar(), 3000);
    const onStorage = () => refrescar();
    window.addEventListener("storage", onStorage);
    return () => {
      clearInterval(id);
      window.removeEventListener("storage", onStorage);
      clearTimeout(toastTimer.current);
    };
  }, []);

  function mostrarToast(texto, tipo, idDeshacer) {
    clearTimeout(toastTimer.current);
    setToast({ visible: true, tipo, texto, id: idDeshacer || null });
    toastTimer.current = setTimeout(() => {
      setToast((t) => ({ ...t, visible: false, id: null }));
    }, 5000);
  }

  function autorizar(registro) {
    resolverRegistro(registro.id, "AUTORIZADO");
    refrescar();
    mostrarToast(`Validado ${registro.placa} · pasa a la cola del DMS`, "ok", registro.id);
  }

  function rechazarConMotivo(motivo) {
    if (!rechazando) return;
    resolverRegistro(rechazando.id, "RECHAZADO", motivo);
    mostrarToast(`Rechazado ${rechazando.placa} · ${motivo}`, "err", rechazando.id);
    setRechazando(null);
    refrescar();
  }

  function deshacer() {
    if (!toast.id) return;
    resolverRegistro(toast.id, "PENDIENTE");
    setToast({ visible: false, tipo: "ok", texto: "", id: null });
    refrescar();
  }

  const filtro = normalizarPlaca(busca);
  const visibles = filtro
    ? lista.filter((r) => normalizarPlaca(r.placa).includes(filtro))
    : lista;
  const siguiente = visibles[0];
  const resto = visibles.slice(1);
  const n = lista.length;
  const subtitulo = `Patio ${patio} · ${n} ${n === 1 ? "camión" : "camiones"} en cola`;

  return (
    <PhoneFrame>
      <header className="bg-garita text-white px-4 py-[13px] flex items-center justify-between shrink-0">
        <div>
          <div className="text-[17px] font-bold">Poncheos por validar</div>
          <div className="text-[11.5px] opacity-85 mt-0.5 font-semibold tracking-wide">{subtitulo}</div>
        </div>
        <button
          type="button"
          onClick={() => navigate("/garita")}
          className="bg-white/16 text-white rounded-2xl px-3 py-[7px] text-[11.5px] font-extrabold tracking-wide"
        >
          MENÚ
        </button>
      </header>

      <main className="flex-1 overflow-y-auto bg-[#F4F6FA]">
        <div className="flex items-center gap-[9px] px-3.5 py-2.5 bg-white border-b border-[#E5E8EF]">
          <span className="text-[15px] opacity-50">🔍</span>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value.toUpperCase())}
            placeholder="Buscar placa del camión en garita"
            autoComplete="off"
            className="flex-1 border-0 outline-none text-base font-bold tracking-wide text-[#1E2130] uppercase placeholder:font-normal placeholder:tracking-normal placeholder:normal-case placeholder:text-[#9AA0AE] placeholder:text-[13.5px]"
          />
          {busca.trim() !== "" && (
            <button
              type="button"
              onClick={() => setBusca("")}
              className="bg-[#EEF0F5] text-[#5D6173] rounded-full w-6 h-6 text-[11px] flex items-center justify-center"
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>

        {visibles.length === 0 ? (
          <div className="text-center text-[#8A8FA0] px-[30px] py-[70px] text-sm leading-relaxed">
            <span className="text-[40px] block mb-3">{filtro ? "🚛" : "✅"}</span>
            {filtro ? (
              <>
                Ninguna placa coincide con <b>{filtro}</b>
              </>
            ) : (
              <>
                Sin camiones esperando en {patio}
                <br />
                Los registros llegan aquí solos.
              </>
            )}
          </div>
        ) : (
          <>
            <div className="text-[11px] font-extrabold text-[#8A8FA0] tracking-[1.3px] px-4 pt-3.5 pb-2">
              {filtro ? "RESULTADO" : "SIGUIENTE EN ATENDER"}
            </div>
            <CardPendiente
              registro={siguiente}
              destacada
              onAutorizar={autorizar}
              onRechazar={setRechazando}
            />
            {resto.length > 0 && (
              <>
                <div className="text-[11px] font-extrabold text-[#8A8FA0] tracking-[1.3px] px-4 pt-3.5 pb-2">
                  LUEGO ({resto.length})
                </div>
                {resto.map((r) => (
                  <CardPendiente key={r.id} registro={r} onAutorizar={autorizar} />
                ))}
              </>
            )}
            <div className="h-[26px]" />
          </>
        )}
      </main>

      <Toast
        visible={toast.visible}
        tipo={toast.tipo}
        texto={toast.texto}
        onDeshacer={toast.id ? deshacer : null}
      />
      <ModalRechazo
        registro={rechazando}
        onMotivo={rechazarConMotivo}
        onCancelar={() => setRechazando(null)}
      />
    </PhoneFrame>
  );
}
