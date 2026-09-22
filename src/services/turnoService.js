import { TURNOS } from "../data/turnos.js";

// RFS puede cambiar la ventana a 30 o 45 minutos sin tocar el resto de la lógica.
export const VENTANA_MIN = 60;

export const CON_CONTENEDOR = ["IMPORTACION", "REPOSICION"];
export const llevaContenedor = (op) => CON_CONTENEDOR.includes(op);

export const REDES = [
  { patio: "RFS 1", red: "RFS-1-CONDUCTORES" },
  { patio: "RFS 2", red: "RFS-2-CONDUCTORES" },
  { patio: "RFS 3", red: "RFS-3-CONDUCTORES" },
];

export const TEXTO_AYUDA =
  "Para probar: 000458 y 000463 (a tiempo) · 000459 (muy temprano) · 000460 (vencido)";

export function formatearTurno(valor) {
  const num = String(valor).replace(/\D/g, "").slice(0, 6);
  return num ? `TRN-${num}` : "";
}

function padHora(fecha) {
  return `${String(fecha.getHours()).padStart(2, "0")}:${String(fecha.getMinutes()).padStart(2, "0")}`;
}

// En producción la hora de referencia debe venir del servidor, no del reloj del celular:
// el chofer puede cambiar la hora de su teléfono.
function minutosHasta(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const t = new Date();
  t.setHours(h, m, 0, 0);
  return Math.round((t - new Date()) / 60000);
}

export function restarMinutos(hhmm, min) {
  const [h, m] = hhmm.split(":").map(Number);
  const t = new Date();
  t.setHours(h, m + min, 0, 0);
  return padHora(t);
}

export function ventanaIngreso(horaTurno) {
  return {
    desde: restarMinutos(horaTurno, -VENTANA_MIN),
    hasta: restarMinutos(horaTurno, VENTANA_MIN),
  };
}

function textoTiempo(min) {
  const h = Math.floor(Math.abs(min) / 60);
  const m = Math.abs(min) % 60;
  return `${h ? `${h} h ` : ""}${m} min`;
}

// Simula la llamada al DMS. Después se reemplaza por el API real.
export function validarTurno(codigo, patioWifi) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const limpio = codigo.trim().toUpperCase();
      const encontrado = TURNOS.find((t) => t.turno === limpio);

      if (!encontrado) {
        resolve({ ok: false, mensaje: "El turno no existe. Verifique el número." });
        return;
      }
      if (encontrado.estado === "USADO") {
        resolve({ ok: false, mensaje: "Este turno ya fue registrado hoy." });
        return;
      }
      if (encontrado.estado === "ANULADO") {
        resolve({ ok: false, mensaje: "Turno anulado. Acérquese a la garita." });
        return;
      }

      if (encontrado.patio !== patioWifi) {
        resolve({
          ok: false,
          mensaje: `Patio erróneo. Su turno es del patio ${encontrado.patio} y usted está conectado a la red WiFi de ${patioWifi}. Conéctese a la red de ${encontrado.patio}.`,
        });
        return;
      }

      const faltan = minutosHasta(encontrado.horaTurno);
      const { desde, hasta } = ventanaIngreso(encontrado.horaTurno);

      if (faltan > VENTANA_MIN) {
        resolve({
          ok: false,
          mensaje: `Su turno no está dentro del tiempo estimado. Es a las ${encontrado.horaTurno} y puede registrarse desde las ${desde} (faltan ${textoTiempo(faltan)}). Espere su turno.`,
        });
        return;
      }
      if (faltan < -VENTANA_MIN) {
        resolve({
          ok: false,
          mensaje: `Su turno no está dentro del tiempo estimado. Era a las ${encontrado.horaTurno} y el plazo venció a las ${hasta}. Acérquese a la garita.`,
        });
        return;
      }

      resolve({ ok: true, turno: encontrado });
    }, 900);
  });
}
