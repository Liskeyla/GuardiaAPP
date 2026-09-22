function hhmm(desfaseMin) {
  const d = new Date(Date.now() + desfaseMin * 60000);
  return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
}

// Horas relativas a "ahora" para que la demo funcione a cualquier hora del día.
export const TURNOS = [
  {
    turno: "TRN-000458",
    operacion: "EXPORTACION",
    patio: "RFS 2",
    horaTurno: hhmm(20),
    contenedor: null,
    placa: "GSZ-0871",
    cedula: "0916584732",
    nombre: "LUIS CEDEÑO VERA",
    estado: "VIGENTE",
  },
  {
    turno: "TRN-000463",
    operacion: "IMPORTACION",
    patio: "RFS 2",
    horaTurno: hhmm(-35),
    contenedor: "TCNU-3320588",
    placa: "GTL-4460",
    cedula: "0921199034",
    nombre: "MARCOS INTRIAGO LÓPEZ",
    estado: "VIGENTE",
  },
  {
    turno: "TRN-000459",
    operacion: "IMPORTACION",
    patio: "RFS 1",
    horaTurno: hhmm(150),
    contenedor: "MSCU-4417820",
    placa: "GBA-4412",
    cedula: "0923457781",
    nombre: "JORGE MORÁN SUÁREZ",
    estado: "VIGENTE",
  },
  {
    turno: "TRN-000460",
    operacion: "REPOSICION",
    patio: "RFS 3",
    horaTurno: hhmm(-150),
    contenedor: "TRLU-7003281",
    placa: "TCE-1180",
    cedula: "0912233440",
    nombre: "ÁNGEL PINCAY ZAMBRANO",
    estado: "VIGENTE",
  },
  {
    turno: "TRN-000461",
    operacion: "EVACUACION",
    patio: "RFS 1",
    horaTurno: hhmm(-20),
    contenedor: null,
    placa: "GSU-0902",
    cedula: "0930011225",
    nombre: "WILMER BRIONES LOOR",
    estado: "USADO",
  },
  {
    turno: "TRN-000462",
    operacion: "EXPORTACION",
    patio: "RFS 2",
    horaTurno: hhmm(-10),
    contenedor: null,
    placa: "GTX-3355",
    cedula: "0945566778",
    nombre: "DARWIN VERA ALCÍVAR",
    estado: "ANULADO",
  },
];
