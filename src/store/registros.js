// En producción esto se reemplaza por el API del DMS y una notificación push real al dispositivo de garita.

const KEY = "rfs_pendientes_v2";
const PATIO_KEY = "rfs_patio_guardia";
const CON_CONTENEDOR = ["IMPORTACION", "REPOSICION"];

export const llevaContenedor = (op) => CON_CONTENEDOR.includes(op);


function hhmm(desfaseMin) {
  const d = new Date(Date.now() + desfaseMin * 60000);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function crearSemilla() {
  const base = [
    { id: "ING-482190", turno: "TRN-000459", operacion: "IMPORTACION", patio: "RFS 1", horaTurno: hhmm(-40), contenedor: "MSCU-4417820", placa: "GBA-4412", cedula: "0923457781", nombre: "JORGE MORÁN SUÁREZ", min: 26 },
    { id: "ING-482191", turno: "TRN-000463", operacion: "EXPORTACION", patio: "RFS 1", horaTurno: hhmm(-15), contenedor: null, placa: "GSN-2214", cedula: "0918876451", nombre: "CARLOS ÁVILA PONCE", min: 18 },
    { id: "ING-482193", turno: "TRN-000466", operacion: "EVACUACION", patio: "RFS 1", horaTurno: hhmm(10), contenedor: null, placa: "GQR-8801", cedula: "0927788112", nombre: "JAIME SOLÓRZANO RUIZ", min: 11 },
    { id: "ING-482196", turno: "TRN-000470", operacion: "IMPORTACION", patio: "RFS 1", horaTurno: hhmm(35), contenedor: "HLXU-2298336", placa: "GYA-5507", cedula: "0934455901", nombre: "PEDRO MENDOZA CHANG", min: 6 },
    { id: "ING-482199", turno: "TRN-000474", operacion: "REPOSICION", patio: "RFS 1", horaTurno: hhmm(55), contenedor: "SUDU-8845120", placa: "GBC-1929", cedula: "0913344778", nombre: "RONALD ZAMBRANO CEDEÑO", min: 2 },
    { id: "ING-482185", turno: "TRN-000458", operacion: "EXPORTACION", patio: "RFS 2", horaTurno: hhmm(-50), contenedor: null, placa: "GSZ-0871", cedula: "0916584732", nombre: "LUIS CEDEÑO VERA", min: 31 },
    { id: "ING-482192", turno: "TRN-000464", operacion: "IMPORTACION", patio: "RFS 2", horaTurno: hhmm(-25), contenedor: "TCNU-3320588", placa: "GTL-4460", cedula: "0921199034", nombre: "MARCOS INTRIAGO LÓPEZ", min: 21 },
    { id: "ING-482195", turno: "TRN-000468", operacion: "EXPORTACION", patio: "RFS 2", horaTurno: hhmm(15), contenedor: null, placa: "GHM-7318", cedula: "0930022556", nombre: "FREDDY QUINTERO BAJAÑA", min: 14 },
    { id: "ING-482198", turno: "TRN-000472", operacion: "EVACUACION", patio: "RFS 2", horaTurno: hhmm(45), contenedor: null, placa: "GJE-9042", cedula: "0946677310", nombre: "IVÁN PAREDES MACÍAS", min: 4 },
    { id: "ING-482187", turno: "TRN-000460", operacion: "REPOSICION", patio: "RFS 3", horaTurno: hhmm(-35), contenedor: "TRLU-7003281", placa: "TCE-1180", cedula: "0912233440", nombre: "ÁNGEL PINCAY ZAMBRANO", min: 28 },
    { id: "ING-482194", turno: "TRN-000467", operacion: "IMPORTACION", patio: "RFS 3", horaTurno: hhmm(5), contenedor: "SEGU-4419865", placa: "GXP-3376", cedula: "0925566089", nombre: "DIEGO VILLACÍS ORTEGA", min: 9 },
    { id: "ING-482197", turno: "TRN-000471", operacion: "EXPORTACION", patio: "RFS 3", horaTurno: hhmm(50), contenedor: null, placa: "GVL-2205", cedula: "0939900214", nombre: "ALEX BURGOS TORRES", min: 1 },
  ];

  return base.map(({ min, ...r }) => ({
    ...r,
    hora: new Date(Date.now() - min * 60000).toISOString(),
    estado: "PENDIENTE",
  }));
}

export function leerPatioGuardia() {
  try {
    return localStorage.getItem(PATIO_KEY) || "RFS 1";
  } catch {
    return "RFS 1";
  }
}

export function guardarPatioGuardia(patio) {
  try {
    localStorage.setItem(PATIO_KEY, patio);
  } catch {
    /* ignore */
  }
}

export function leerRegistros() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const seed = crearSemilla();
      localStorage.setItem(KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  } catch {
    return crearSemilla();
  }
}

export function agregarRegistro(registro) {
  const lista = leerRegistros();
  lista.unshift({ ...registro, estado: "PENDIENTE", hora: new Date().toISOString() });
  localStorage.setItem(KEY, JSON.stringify(lista));
}

export function resolverRegistro(id, estado, motivo) {
  const lista = leerRegistros().map((r) =>
    r.id === id ? { ...r, estado, motivo: motivo || "", resuelto: new Date().toISOString() } : r
  );
  localStorage.setItem(KEY, JSON.stringify(lista));
}

export function pendientes() {
  return leerRegistros().filter((r) => r.estado === "PENDIENTE");
}

export function colaPatio(patioGuardia) {
  return pendientes()
    .filter((r) => r.patio === patioGuardia)
    .sort((a, b) => (a.horaTurno || "99:99").localeCompare(b.horaTurno || "99:99"));
}

export function buscarRegistro(id) {
  return leerRegistros().find((r) => r.id === id) || null;
}
