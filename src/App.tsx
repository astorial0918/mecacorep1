import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  query, 
  where 
} from 'firebase/firestore';

// --- CONFIGURACIÓN DE FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyCjfX-kVz_jP0Pcs3xpuGzKK5sAKngk1Cc",
  authDomain: "mecacore-de33d.firebaseapp.com",
  projectId: "mecacore-de33d",
  storageBucket: "mecacore-de33d.firebasestorage.app",
  messagingSenderId: "97715166477",
  appId: "1:97715166477:web:1e08511729c287ffc2e444"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- COMPONENTE FOOTER / PIE DE PÁGINA ---
const Footer = () => (
  <footer className="bg-zinc-950 text-zinc-300 mt-20 border-t border-zinc-800/80 relative overflow-hidden">
    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm relative z-10">
      <div>
        <h4 className="font-black text-xl bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent mb-3">
          COMITÉ DE INGENIERÍA MECATRÓNICA
        </h4>
        <p className="text-zinc-400 text-xs leading-relaxed max-w-md">
          Comité oficial de la carrera de Ingeniería Mecatrónica en el Instituto Tecnológico de Hermosillo. Impulsando la robótica, automatización y desarrollo tecnológico.
        </p>
      </div>
      <div>
        <h4 className="font-bold text-fuchsia-400 mb-3 tracking-wider text-xs uppercase">Contacto</h4>
        <p className="text-xs text-zinc-400">📍 Instituto Tecnológico de Hermosillo (ITH)</p>
        <p className="text-xs text-zinc-400">✉️ comite.mecatronica.ith@gmail.com</p>
      </div>
    </div>
    <div className="bg-zinc-900/60 py-4 text-center text-xs text-zinc-500 border-t border-zinc-800/50">
      © {new Date().getFullYear()} <span className="text-cyan-400 font-bold">Comité de Ingeniería Mecatrónica - ITH</span> — Todos los derechos reservados.
    </div>
  </footer>
);

// --- MODAL DE DIPLOMA / RECONOCIMIENTO IMPRIMIBLE ---
const ModalDiploma = ({ datos, onClose }: { datos: { alumno: any; evento: any }; onClose: () => void }) => {
  const { alumno, evento } = datos;

  const handleImprimir = () => {
    const printContent = document.getElementById('diploma-imprimible');
    if (!printContent) return;
    const ventana = window.open('', '', 'width=950,height=680');
    if (!ventana) return;
    ventana.document.write(`
      <html>
        <head>
          <title>Diploma - ${alumno.nombreAlumno}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @media print {
              @page { size: landscape; margin: 0; }
              body { margin: 1cm; background: #fff !important; color: #000 !important; }
            }
          </style>
        </head>
        <body class="bg-white flex items-center justify-center min-h-screen">
          ${printContent.innerHTML}
          <script>
            setTimeout(() => {
              window.print();
              window.close();
            }, 500);
          </script>
        </body>
      </html>
    `);
    ventana.document.close();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-zinc-900 border border-pink-500/40 rounded-2xl max-w-3xl w-full p-6 shadow-[0_0_30px_rgba(236,72,153,0.3)] relative text-zinc-100">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-pink-400 font-bold text-xl transition">✕</button>
        
        <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
          <h3 className="text-xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">Reconocimiento Oficial</h3>
          <button onClick={handleImprimir} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold px-4 py-2 rounded-lg text-xs hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] transition flex items-center gap-2">
            🖨️ Imprimir / Guardar PDF
          </button>
        </div>

        <div id="diploma-imprimible" className="border-4 border-double border-pink-500/60 p-8 rounded-xl bg-zinc-950 text-center relative shadow-inner overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex justify-between items-center mb-6 border-b border-cyan-500/30 pb-4">
            <div className="text-left">
              <h4 className="font-black text-cyan-400 text-lg tracking-wider">COMITÉ DE INGENIERÍA MECATRÓNICA</h4>
              <p className="text-[10px] text-pink-400 uppercase font-semibold tracking-widest">Instituto Tecnológico de Hermosillo</p>
            </div>
            <div className="text-right">
              <h5 className="font-bold text-zinc-300 text-xs">Hermosillo, Sonora</h5>
            </div>
          </div>

          <div className="my-6 space-y-3">
            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">Otorga el presente</p>
            <h1 className="text-3xl font-black bg-gradient-to-r from-pink-500 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent tracking-widest">
              RECONOCIMIENTO
            </h1>
            <p className="text-xs text-zinc-400 italic">A:</p>
            <h2 className="text-2xl font-extrabold text-cyan-300 capitalize py-2 border-b-2 border-pink-500/50 inline-block px-6">
              {alumno.nombreAlumno}
            </h2>
            <p className="text-xs text-zinc-400 mt-2">N. Control: <strong className="text-zinc-200">{alumno.controlAlumno}</strong></p>
          </div>

          <div className="my-6 max-w-lg mx-auto space-y-2">
            <p className="text-xs text-zinc-300 leading-relaxed">
              Por su valiosa participación y asistencia acreditada en la actividad técnica:
            </p>
            <p className="text-base font-bold text-pink-400 bg-zinc-900/80 p-2.5 rounded-lg border border-pink-500/30 shadow-[0_0_10px_rgba(236,72,153,0.15)]">
              "{evento?.titulo || 'Actividad de Mecatrónica'}"
            </p>
            <p className="text-[11px] text-zinc-400">
              Impartido por: <strong className="text-cyan-300">{evento?.expositor || 'Comité de Ingeniería Mecatrónica'}</strong> — Fecha: <strong className="text-cyan-300">{evento?.fecha || new Date().toLocaleDateString()}</strong>
            </p>
          </div>

          <div className="mt-12 pt-6 grid grid-cols-2 gap-8 max-w-md mx-auto border-t border-zinc-800">
            <div>
              <div className="h-10 border-b border-cyan-500/40 mb-1"></div>
              <p className="text-[10px] font-bold text-cyan-400 uppercase">Presidente del Comité</p>
              <p className="text-[9px] text-zinc-500">Ingeniería Mecatrónica</p>
            </div>
            <div>
              <div className="h-10 border-b border-pink-500/40 mb-1"></div>
              <p className="text-[10px] font-bold text-pink-400 uppercase">Coordinación / Staff</p>
              <p className="text-[9px] text-zinc-500">{evento?.puestoCreador || 'Coordinador'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- CONSULTA PÚBLICA DE DIPLOMAS PARA ALUMNOS ---
const VistaConsultaDiplomas = () => {
  const [controlInput, setControlInput] = useState('');
  const [buscando, setBuscando] = useState(false);
  const [resultados, setResultados] = useState<any[]>([]);
  const [buscado, setBuscado] = useState(false);
  const [diplomaSeleccionado, setDiplomaSeleccionado] = useState<any>(null);

  const handleBuscar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!controlInput.trim()) return;
    setBuscando(true);
    setBuscado(true);

    try {
      const snapReg = await getDocs(collection(db, "registros_eventos"));
      const inputClean = controlInput.trim().toLowerCase();

      const misRegistros = snapReg.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter((r: any) => r.controlAlumno?.trim().toLowerCase() === inputClean);

      if (misRegistros.length > 0) {
        const snapEv = await getDocs(collection(db, "eventos"));
        const eventosMap = new Map();
        snapEv.docs.forEach(d => eventosMap.set(d.id, { id: d.id, ...d.data() }));

        const listaDiplomaData = misRegistros.map((reg: any) => ({
          asistio: reg.asistio ?? false,
          alumno: {
            nombreAlumno: reg.nombreAlumno,
            controlAlumno: reg.controlAlumno,
            correoAlumno: reg.correoAlumno
          },
          evento: eventosMap.get(reg.eventoId) || {
            titulo: reg.eventoTitulo || 'Evento de Mecatrónica',
            expositor: 'Comité de Ingeniería Mecatrónica',
            fecha: new Date(reg.fechaRegistro).toLocaleDateString(),
            puestoCreador: 'Coordinación'
          }
        }));
        setResultados(listaDiplomaData);
      } else {
        setResultados([]);
      }
    } catch (err) {
      console.error(err);
      alert("Error al buscar diplomas.");
    }
    setBuscando(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border border-pink-500/30 p-8 rounded-2xl shadow-[0_0_25px_rgba(236,72,153,0.25)] text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-pink-400 to-red-500 bg-clip-text text-transparent mb-2">Consulta de Diplomas</h2>
        <p className="text-sm text-zinc-400">Portal Oficial de Reconocimientos del Comité de Ingeniería Mecatrónica</p>
      </div>

      <form onSubmit={handleBuscar} className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-xl shadow-lg flex flex-col sm:flex-row gap-3">
        <input
          required
          type="text"
          placeholder="Ingresa tu Número de Control (Ej. 22330701)"
          className="flex-1 p-3 bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-lg outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono text-sm uppercase placeholder-zinc-600"
          value={controlInput}
          onChange={e => setControlInput(e.target.value)}
        />
        <button disabled={buscando} type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold px-6 py-3 rounded-lg transition disabled:opacity-50 text-sm shadow-[0_0_15px_rgba(6,182,212,0.4)] flex-shrink-0">
          {buscando ? 'Buscando...' : 'Buscar Diplomas'}
        </button>
      </form>

      {buscado && (
        <div className="space-y-4">
          {resultados.length === 0 ? (
            <div className="bg-zinc-900/80 border border-zinc-800 p-8 text-center rounded-xl text-zinc-400">
              <p className="text-lg font-bold mb-1 text-pink-400">No se encontraron inscripciones 😕</p>
              <p className="text-xs text-zinc-500">Verifica tu número de control o consulta con el equipo en el área de pase de lista.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Eventos para N. Control: <span className="text-cyan-400">{controlInput.toUpperCase()}</span>
              </p>
              {resultados.map((item, idx) => (
                <div key={idx} className="bg-zinc-900/80 p-5 rounded-xl border border-zinc-800 hover:border-pink-500/40 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {item.asistio ? (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          ✅ Asistencia Confirmada
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          ⏳ Pendiente de Pase de Lista
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{item.evento?.titulo}</h3>
                    <p className="text-xs text-zinc-400">
                      Alumno: <strong className="text-cyan-300">{item.alumno?.nombreAlumno}</strong>
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Fecha: {item.evento?.fecha} | Impartido por: {item.evento?.expositor}
                    </p>
                  </div>
                  {item.asistio ? (
                    <button
                      onClick={() => setDiplomaSeleccionado(item)}
                      className="bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-black font-extrabold px-4 py-2 rounded-lg text-xs transition shadow-[0_0_15px_rgba(245,158,11,0.3)] flex-shrink-0"
                    >
                      Descargar Diploma
                    </button>
                  ) : (
                    <span className="text-xs text-zinc-500 italic">El diploma estará disponible una vez confirmado el pase de lista.</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {diplomaSeleccionado && <ModalDiploma datos={diplomaSeleccionado} onClose={() => setDiplomaSeleccionado(null)} />}
    </div>
  );
};

// --- MODAL DE INSCRIPCIÓN ---
const ModalInscripcion = ({ evento, onClose }: { evento: any; onClose: () => void }) => {
  const [alumno, setAlumno] = useState({ nombre: '', control: '', correo: '' });
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);

  const handleInscribir = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    try {
      await addDoc(collection(db, "registros_eventos"), {
        eventoId: evento.id,
        eventoTitulo: evento.titulo,
        nombreAlumno: alumno.nombre,
        controlAlumno: alumno.control,
        correoAlumno: alumno.correo,
        asistio: false,
        fechaRegistro: new Date().toISOString()
      });
      setExito(true);
    } catch (err) {
      alert("Error al completar la inscripción. Inténtalo de nuevo.");
    }
    setEnviando(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-900 border border-cyan-500/40 rounded-xl max-w-md w-full p-6 shadow-[0_0_30px_rgba(6,182,212,0.3)] relative text-zinc-100">
        <button onClick={onClose} className="absolute top-3 right-3 text-zinc-400 hover:text-cyan-400 font-bold text-xl">✕</button>
        {exito ? (
          <div className="text-center py-6 space-y-4">
            <span className="text-5xl animate-bounce inline-block">🚀</span>
            <h3 className="text-2xl font-bold text-cyan-400">¡Inscripción Exitosa!</h3>
            <p className="text-sm text-zinc-300">Te has registrado correctamente en <strong>{evento.titulo}</strong>.</p>
            <button onClick={onClose} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold py-2 rounded-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition">Cerrar</button>
          </div>
        ) : (
          <form onSubmit={handleInscribir} className="space-y-4">
            <h3 className="text-xl font-bold text-cyan-400">Inscripción a Actividad</h3>
            <p className="text-xs text-zinc-400 mb-2">Evento: <strong className="text-pink-400">{evento.titulo}</strong></p>
            <input required type="text" placeholder="Nombre completo del alumno" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm text-zinc-100 placeholder-zinc-600" value={alumno.nombre} onChange={e => setAlumno({ ...alumno, nombre: e.target.value })} />
            <input required type="text" placeholder="Número de Control" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm font-mono text-zinc-100 placeholder-zinc-600" value={alumno.control} onChange={e => setAlumno({ ...alumno, control: e.target.value })} />
            <input required type="email" placeholder="Correo electrónico" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm text-zinc-100 placeholder-zinc-600" value={alumno.correo} onChange={e => setAlumno({ ...alumno, correo: e.target.value })} />
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={onClose} className="w-1/2 bg-zinc-800 text-zinc-300 py-2 rounded-lg font-bold hover:bg-zinc-700 text-sm">Cancelar</button>
              <button disabled={enviando} type="submit" className="w-1/2 bg-gradient-to-r from-pink-500 to-red-500 text-white font-extrabold py-2 rounded-lg hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] transition disabled:opacity-50 text-sm">
                {enviando ? 'Inscribiendo...' : 'Confirmar'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// --- VISTA INICIO ---
const Inicio = () => (
  <div className="space-y-8 animate-fade-in">
    <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-cyan-500/30 text-zinc-100 p-10 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.2)] text-center relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <span className="text-xs font-black uppercase tracking-widest text-pink-500 bg-pink-500/10 border border-pink-500/30 px-3 py-1 rounded-full inline-block mb-3">
        Plataforma Oficial
      </span>
      <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent mb-3">
        Comité de Ingeniería Mecatrónica
      </h1>
      <p className="text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
        Innovación, Robótica y Desarrollo Tecnológico en el Instituto Tecnológico de Hermosillo.
      </p>
    </div>

    <div className="bg-zinc-900/80 p-8 rounded-xl border border-zinc-800 shadow-md max-w-4xl mx-auto text-center space-y-4">
      <h2 className="text-2xl font-bold text-cyan-400">Bienvenido a la Plataforma</h2>
      <p className="text-zinc-300 leading-relaxed text-sm max-w-2xl mx-auto">
        Explora los próximos talleres prácticos de microcontroladores, programación y diseño 3D, asiste a conferencias magistrales e inscríbete para recibir reconocimientos oficiales emitidos por el Comité de Ingeniería Mecatrónica.
      </p>
    </div>
  </div>
);

const VistaPublicaciones = () => {
  const [publicaciones, setPublicaciones] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerPosts = async () => {
      try {
        const snap = await getDocs(collection(db, "publicaciones"));
        setPublicaciones(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) {
        console.error(e);
      }
      setCargando(false);
    };
    obtenerPosts();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-fuchsia-400 to-pink-500 bg-clip-text text-transparent border-b border-zinc-800 pb-2">
        Social y Cultural
      </h2>
      {cargando ? <p className="text-zinc-500">Cargando publicaciones...</p> : null}
      {!cargando && publicaciones.length === 0 ? <p className="text-zinc-500">No hay publicaciones recientes por el momento.</p> : null}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {publicaciones.map((pub) => (
          <div key={pub.id} className="bg-zinc-900/80 p-6 rounded-xl border border-zinc-800 hover:border-fuchsia-500/40 transition flex flex-col justify-between shadow-lg">
            <div>
              <span className="text-[10px] font-bold text-fuchsia-400 uppercase bg-fuchsia-500/10 border border-fuchsia-500/30 px-2.5 py-1 rounded-full">Anuncio del Comité</span>
              <h3 className="text-xl font-bold text-zinc-100 mt-3 mb-2">{pub.titulo}</h3>
              <p className="text-zinc-400 text-sm whitespace-pre-line leading-relaxed">{pub.contenido}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-800 text-xs text-zinc-500 flex justify-between">
              <span>Por: <strong className="text-cyan-400">{pub.autor || 'Coordinación'}</strong></span>
              <span>{pub.fecha ? new Date(pub.fecha).toLocaleDateString() : ''}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const VistaEventosPublicos = ({ categoria }: { categoria: 'talleres' | 'conferencias' }) => {
  const [eventos, setEventos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [eventoSeleccionado, setEventoSeleccionado] = useState<any>(null);

  useEffect(() => {
    const obtenerEventos = async () => {
      try {
        const q = query(collection(db, "eventos"), where("categoria", "==", categoria));
        const snap = await getDocs(q);
        setEventos(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) {
        console.error(e);
      }
      setCargando(false);
    };
    obtenerEventos();
  }, [categoria]);

  const tituloSeccion = categoria === 'talleres' ? 'Talleres Disponibles' : 'Conferencias Magistrales';

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent border-b border-zinc-800 pb-2">
        {tituloSeccion}
      </h2>
      {cargando ? <p className="text-zinc-500">Cargando actividades...</p> : null}
      {!cargando && eventos.length === 0 ? <p className="text-zinc-500">No hay {categoria} programados por el momento.</p> : null}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventos.map((ev) => (
          <div key={ev.id} className="bg-zinc-900/80 p-6 rounded-xl border border-zinc-800 hover:border-cyan-500/40 transition flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded-full">{ev.categoria}</span>
                <span className="text-xs text-zinc-500 font-medium">{ev.fecha} - {ev.hora}</span>
              </div>
              <h3 className="text-lg font-bold text-zinc-100 mb-1">{ev.titulo}</h3>
              <p className="text-xs text-pink-400 font-semibold mb-2">Impartido por: {ev.expositor}</p>
              <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{ev.descripcion}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-3">Cupo disponible: <strong className="text-zinc-200">{ev.cupo} lugares</strong></p>
              <button onClick={() => setEventoSeleccionado(ev)} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold py-2.5 rounded-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition text-sm">
                Inscribirme
              </button>
            </div>
          </div>
        ))}
      </div>

      {eventoSeleccionado && <ModalInscripcion evento={eventoSeleccionado} onClose={() => setEventoSeleccionado(null)} />}
    </div>
  );
};

// --- SOLICITUD DE ACCESO & LOGIN ---

const FormularioSolicitud = ({ onVolver }: { onVolver: () => void }) => {
  const [datos, setDatos] = useState({ nombre: '', numeroControl: '', puesto: '', correoInst: '', correoPers: '', telefono: '' });
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const enviarSolicitud = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    try {
      await addDoc(collection(db, "solicitudes_admin"), {
        ...datos,
        estado: 'pendiente',
        permisos: { eventos: false, publicaciones: false, asistencias: true },
        fecha: new Date().toISOString()
      });
      setMensaje('¡Solicitud enviada correctamente! Espera la aprobación de la directiva del comité.');
      setDatos({ nombre: '', numeroControl: '', puesto: '', correoInst: '', correoPers: '', telefono: '' });
    } catch (error) {
      setMensaje('Error al enviar la solicitud.');
    }
    setEnviando(false);
  };

  return (
    <div className="max-w-md mx-auto bg-zinc-900 border border-zinc-800 p-8 rounded-xl shadow-[0_0_25px_rgba(236,72,153,0.15)] mt-10 text-zinc-100">
      <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent mb-1">Solicitar Acceso Staff</h2>
      <p className="text-xs text-center text-zinc-500 mb-6">Comité de Ingeniería Mecatrónica</p>
      {mensaje && <p className="text-emerald-400 font-medium text-xs mb-4 text-center bg-emerald-500/10 p-2.5 rounded border border-emerald-500/20">{mensaje}</p>}
      <form onSubmit={enviarSolicitud} className="space-y-3.5">
        <input required type="text" placeholder="Nombre completo" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-pink-500 text-sm text-zinc-100 placeholder-zinc-600" value={datos.nombre} onChange={e => setDatos({...datos, nombre: e.target.value})} />
        <input required type="text" placeholder="Número de Control" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-pink-500 text-sm font-mono text-zinc-100 placeholder-zinc-600" value={datos.numeroControl} onChange={e => setDatos({...datos, numeroControl: e.target.value})} />
        <input required type="text" placeholder="Puesto (Ej. Colaborador Logística, Coord. Talleres)" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-pink-500 text-sm text-zinc-100 placeholder-zinc-600" value={datos.puesto} onChange={e => setDatos({...datos, puesto: e.target.value})} />
        <input required type="email" placeholder="Correo Institucional" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-pink-500 text-sm text-zinc-100 placeholder-zinc-600" value={datos.correoInst} onChange={e => setDatos({...datos, correoInst: e.target.value})} />
        <input required type="email" placeholder="Correo Personal" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-pink-500 text-sm text-zinc-100 placeholder-zinc-600" value={datos.correoPers} onChange={e => setDatos({...datos, correoPers: e.target.value})} />
        <input required type="tel" placeholder="Teléfono" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-pink-500 text-sm text-zinc-100 placeholder-zinc-600" value={datos.telefono} onChange={e => setDatos({...datos, telefono: e.target.value})} />
        <button disabled={enviando} type="submit" className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-extrabold py-2.5 rounded-lg hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] transition disabled:opacity-50 text-sm">
          {enviando ? 'Enviando...' : 'Enviar Solicitud'}
        </button>
        <button type="button" onClick={onVolver} className="w-full text-cyan-400 text-xs mt-2 hover:underline text-center">Volver al Login</button>
      </form>
    </div>
  );
};

const LoginAdmin = ({ onLogin }: { onLogin: (usuarioInfo: { isMaster: boolean; nombre: string; puesto?: string; permisos?: any }) => void }) => {
  const [usuarioInput, setUsuarioInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mostrarSolicitud, setMostrarSolicitud] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCargando(true);
    const inputLimpio = usuarioInput.trim().toLowerCase();

    if (inputLimpio === 'comite@admin.com' && password === 'MecaCore2004') {
      onLogin({ isMaster: true, nombre: 'Administrador del Comité' });
      setCargando(false);
      return;
    }

    try {
      const querySnapshot = await getDocs(collection(db, "solicitudes_admin"));
      const usuarioEncontrado = querySnapshot.docs.find(doc => {
        const data = doc.data();
        return (data.usuarioGenerado?.toLowerCase() === inputLimpio || 
               data.correoInst?.toLowerCase() === inputLimpio || 
               data.correoPers?.toLowerCase() === inputLimpio) &&
              data.passwordGenerada === password;
      });

      if (usuarioEncontrado) {
        const data = usuarioEncontrado.data();
        if (data.estado === 'denegado') {
          setError('⚠ Tu acceso ha sido revocado o denegado.');
        } else if (data.estado === 'pendiente') {
          setError('⏳ Tu solicitud aún está pendiente de aprobación.');
        } else if (data.estado === 'aprobado') {
          onLogin({
            isMaster: false,
            nombre: data.nombre,
            puesto: data.puesto,
            permisos: data.permisos || { eventos: false, publicaciones: false, asistencias: true }
          });
        }
      } else {
        setError('❌ Credenciales incorrectas o usuario no registrado.');
      }
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al verificar credenciales.');
    }
    setCargando(false);
  };

  if (mostrarSolicitud) {
    return <FormularioSolicitud onVolver={() => setMostrarSolicitud(false)} />;
  }

  return (
    <div className="max-w-md mx-auto bg-zinc-900 border border-cyan-500/30 p-8 rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.2)] mt-10 text-zinc-100">
      <h2 className="text-2xl font-black text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1">Acceso Administrativo</h2>
      <p className="text-xs text-center text-zinc-500 mb-6">Comité de Ingeniería Mecatrónica</p>

      {error && <p className="text-red-400 font-medium text-xs mb-4 text-center bg-red-500/10 p-2.5 rounded border border-red-500/20">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs text-zinc-400 mb-1 font-semibold">Correo o Usuario</label>
          <input
            required
            type="text"
            placeholder="comite@admin.com"
            className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm text-zinc-100 placeholder-zinc-600"
            value={usuarioInput}
            onChange={e => setUsuarioInput(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs text-zinc-400 mb-1 font-semibold">Contraseña</label>
          <input
            required
            type="password"
            placeholder="••••••••"
            className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm text-zinc-100 placeholder-zinc-600"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button
          disabled={cargando}
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold py-2.5 rounded-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition disabled:opacity-50 text-sm"
        >
          {cargando ? 'Verificando...' : 'Iniciar Sesión'}
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-zinc-800 text-center">
        <p className="text-xs text-zinc-500 mb-2">¿Eres parte del staff y no tienes cuenta?</p>
        <button
          onClick={() => setMostrarSolicitud(true)}
          className="text-pink-400 hover:text-pink-300 text-xs font-bold transition"
        >
          📝 Solicitar Acceso Staff
        </button>
      </div>
    </div>
  );
};

// --- PANEL DE CONTROL ADMIN & STAFF ---

const PanelAdmin = ({ usuario, onLogout }: { usuario: any; onLogout: () => void }) => {
  const [tab, setTab] = useState<'asistencias' | 'eventos' | 'publicaciones' | 'solicitudes'>('asistencias');
  
  const [registros, setRegistros] = useState<any[]>([]);
  const [filtroEvento, setFiltroEvento] = useState('');
  const [eventosLista, setEventosLista] = useState<any[]>([]);

  const [nuevoEvento, setNuevoEvento] = useState({ titulo: '', categoria: 'talleres', expositor: '', fecha: '', hora: '', cupo: 30, descripcion: '' });
  const [nuevoPost, setNuevoPost] = useState({ titulo: '', contenido: '' });
  const [solicitudes, setSolicitudes] = useState<any[]>([]);

  const cargarDatos = async () => {
    try {
      const snapEv = await getDocs(collection(db, "eventos"));
      setEventosLista(snapEv.docs.map(d => ({ id: d.id, ...d.data() })));

      const snapReg = await getDocs(collection(db, "registros_eventos"));
      setRegistros(snapReg.docs.map(d => ({ id: d.id, ...d.data() })));

      if (usuario.isMaster) {
        const snapSol = await getDocs(collection(db, "solicitudes_admin"));
        setSolicitudes(snapSol.docs.map(d => ({ id: d.id, ...d.data() })));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const toggleAsistencia = async (regId: string, valorActual: boolean) => {
    try {
      await updateDoc(doc(db, "registros_eventos", regId), { asistio: !valorActual });
      setRegistros(prev => prev.map(r => r.id === regId ? { ...r, asistio: !valorActual } : r));
    } catch (err) {
      alert("Error al actualizar asistencia.");
    }
  };

  const handleCrearEvento = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "eventos"), {
        ...nuevoEvento,
        creador: usuario.nombre,
        puestoCreador: usuario.puesto || 'Comité de Mecatrónica',
        fechaCreacion: new Date().toISOString()
      });
      alert("Evento creado con éxito.");
      setNuevoEvento({ titulo: '', categoria: 'talleres', expositor: '', fecha: '', hora: '', cupo: 30, descripcion: '' });
      cargarDatos();
    } catch (err) {
      alert("Error al crear evento.");
    }
  };

  const handleCrearPost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "publicaciones"), {
        ...nuevoPost,
        autor: usuario.nombre,
        fecha: new Date().toISOString()
      });
      alert("Publicación creada.");
      setNuevoPost({ titulo: '', contenido: '' });
    } catch (err) {
      alert("Error al publicar.");
    }
  };

  const responderSolicitud = async (solId: string, nuevoEstado: 'aprobado' | 'denegado', solData: any) => {
    try {
      const userGen = solData.correoInst ? solData.correoInst.split('@')[0] : `user_${Date.now().toString().slice(-4)}`;
      const passGen = `Meca${Math.floor(1000 + Math.random() * 9000)}`;

      await updateDoc(doc(db, "solicitudes_admin", solId), {
        estado: nuevoEstado,
        usuarioGenerado: userGen,
        passwordGenerada: passGen
      });
      alert(`Solicitud ${nuevoEstado}. Usuario: ${userGen} | Pass: ${passGen}`);
      cargarDatos();
    } catch (err) {
      alert("Error al procesar solicitud.");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-pink-400 bg-pink-500/10 border border-pink-500/30 px-3 py-1 rounded-full">
            {usuario.isMaster ? 'Administrador' : `Staff — ${usuario.puesto}`}
          </span>
          <h2 className="text-2xl font-black text-zinc-100 mt-2">Bienvenido, {usuario.nombre}</h2>
        </div>
        <button onClick={onLogout} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold px-4 py-2 rounded-lg text-xs transition">
          Cerrar Sesión
        </button>
      </div>

      <div className="flex border-b border-zinc-800 gap-4 text-sm font-bold overflow-x-auto">
        <button
          onClick={() => setTab('asistencias')}
          className={`pb-3 border-b-2 transition whitespace-nowrap ${tab === 'asistencias' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
        >
          📋 Pase de Lista
        </button>
        {(usuario.isMaster || usuario.permisos?.eventos) && (
          <button
            onClick={() => setTab('eventos')}
            className={`pb-3 border-b-2 transition whitespace-nowrap ${tab === 'eventos' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
          >
            ➕ Crear Eventos
          </button>
        )}
        {(usuario.isMaster || usuario.permisos?.publicaciones) && (
          <button
            onClick={() => setTab('publicaciones')}
            className={`pb-3 border-b-2 transition whitespace-nowrap ${tab === 'publicaciones' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
          >
            📢 Publicar Anuncio
          </button>
        )}
        {usuario.isMaster && (
          <button
            onClick={() => setTab('solicitudes')}
            className={`pb-3 border-b-2 transition whitespace-nowrap ${tab === 'solicitudes' ? 'border-pink-500 text-pink-400' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
          >
            👥 Aprobar Staff
          </button>
        )}
      </div>

      {tab === 'asistencias' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-zinc-900/60 p-4 rounded-lg border border-zinc-800">
            <p className="text-sm text-zinc-400 font-medium">Filtra por evento para pasar lista:</p>
            <select
              className="bg-zinc-950 border border-zinc-800 text-zinc-100 p-2 rounded-lg text-sm outline-none focus:border-cyan-500"
              value={filtroEvento}
              onChange={e => setFiltroEvento(e.target.value)}
            >
              <option value="">Todos los Eventos</option>
              {eventosLista.map(ev => (
                <option key={ev.id} value={ev.id}>{ev.titulo}</option>
              ))}
            </select>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-zinc-300">
                <thead className="bg-zinc-950 text-xs uppercase text-zinc-400 border-b border-zinc-800">
                  <tr>
                    <th className="p-4">Alumno</th>
                    <th className="p-4">N. Control</th>
                    <th className="p-4">Evento</th>
                    <th className="p-4 text-center">Asistencia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {registros
                    .filter(r => !filtroEvento || r.eventoId === filtroEvento)
                    .map(reg => (
                      <tr key={reg.id} className="hover:bg-zinc-800/30">
                        <td className="p-4 font-semibold text-zinc-100">{reg.nombreAlumno}</td>
                        <td className="p-4 font-mono text-xs text-cyan-300">{reg.controlAlumno}</td>
                        <td className="p-4 text-xs text-zinc-400">{reg.eventoTitulo}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => toggleAsistencia(reg.id, reg.asistio)}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                              reg.asistio
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                                : 'bg-zinc-800 text-zinc-500 border border-zinc-700 hover:bg-zinc-700'
                            }`}
                          >
                            {reg.asistio ? '✅ Presente' : '❌ Ausente'}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === 'eventos' && (
        <form onSubmit={handleCrearEvento} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-4 max-w-2xl">
          <h3 className="text-xl font-bold text-cyan-400">Registrar Nuevo Taller o Conferencia</h3>
          <input required type="text" placeholder="Título del evento" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100" value={nuevoEvento.titulo} onChange={e => setNuevoEvento({...nuevoEvento, titulo: e.target.value})} />
          <div className="grid grid-cols-2 gap-4">
            <select className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100" value={nuevoEvento.categoria} onChange={e => setNuevoEvento({...nuevoEvento, categoria: e.target.value})}>
              <option value="talleres">Taller</option>
              <option value="conferencias">Conferencia</option>
            </select>
            <input required type="text" placeholder="Expositor / Impartido por" className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100" value={nuevoEvento.expositor} onChange={e => setNuevoEvento({...nuevoEvento, expositor: e.target.value})} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <input required type="date" className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100" value={nuevoEvento.fecha} onChange={e => setNuevoEvento({...nuevoEvento, fecha: e.target.value})} />
            <input required type="text" placeholder="Hora (Ej. 10:00 AM)" className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100" value={nuevoEvento.hora} onChange={e => setNuevoEvento({...nuevoEvento, hora: e.target.value})} />
            <input required type="number" placeholder="Cupo" className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100" value={nuevoEvento.cupo} onChange={e => setNuevoEvento({...nuevoEvento, cupo: Number(e.target.value)})} />
          </div>
          <textarea required placeholder="Descripción de la actividad" rows={3} className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100" value={nuevoEvento.descripcion} onChange={e => setNuevoEvento({...nuevoEvento, descripcion: e.target.value})}></textarea>
          <button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold px-6 py-2.5 rounded-lg text-sm">Guardar Evento</button>
        </form>
      )}

      {tab === 'publicaciones' && (
        <form onSubmit={handleCrearPost} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-4 max-w-2xl">
          <h3 className="text-xl font-bold text-fuchsia-400">Crear Anuncio Social / Cultural</h3>
          <input required type="text" placeholder="Título de la publicación" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100" value={nuevoPost.titulo} onChange={e => setNuevoPost({...nuevoPost, titulo: e.target.value})} />
          <textarea required placeholder="Contenido o detalles del anuncio..." rows={5} className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100" value={nuevoPost.contenido} onChange={e => setNuevoPost({...nuevoPost, contenido: e.target.value})}></textarea>
          <button type="submit" className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-extrabold px-6 py-2.5 rounded-lg text-sm">Publicar</button>
        </form>
      )}

      {tab === 'solicitudes' && usuario.isMaster && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-pink-400">Solicitudes de Acceso Pendientes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {solicitudes.map(sol => (
              <div key={sol.id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl space-y-2">
                <div className="flex justify-between">
                  <h4 className="font-bold text-zinc-100">{sol.nombre}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${sol.estado === 'pendiente' ? 'bg-amber-500/20 text-amber-400' : sol.estado === 'aprobado' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    {sol.estado}
                  </span>
                </div>
                <p className="text-xs text-zinc-400">Puesto: <strong>{sol.puesto}</strong> | Control: <strong>{sol.numeroControl}</strong></p>
                <p className="text-xs text-zinc-500">Correo: {sol.correoInst || sol.correoPers}</p>
                
                {sol.estado === 'pendiente' && (
                  <div className="flex gap-2 pt-2">
                    <button onClick={() => responderSolicitud(sol.id, 'aprobado', sol)} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded text-xs">Aprobar</button>
                    <button onClick={() => responderSolicitud(sol.id, 'denegado', sol)} className="bg-red-600 hover:bg-red-500 text-white font-bold px-3 py-1.5 rounded text-xs">Denegar</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- COMPONENTE PRINCIPAL (APP) ---

export default function App() {
  const [vista, setVista] = useState('inicio');
  const [usuarioLogueado, setUsuarioLogueado] = useState<any>(null);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between font-sans selection:bg-pink-500 selection:text-white">
      {/* NAVEGACIÓN */}
      <header className="bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800/80 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div onClick={() => setVista('inicio')} className="cursor-pointer flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="font-black text-sm md:text-base bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
              COMITÉ DE MECATRÓNICA
            </span>
          </div>

          <nav className="hidden md:flex gap-6 text-xs font-bold text-zinc-400">
            <button onClick={() => setVista('inicio')} className={`hover:text-cyan-400 transition ${vista === 'inicio' ? 'text-cyan-400' : ''}`}>Inicio</button>
            <button onClick={() => setVista('talleres')} className={`hover:text-cyan-400 transition ${vista === 'talleres' ? 'text-cyan-400' : ''}`}>Talleres</button>
            <button onClick={() => setVista('conferencias')} className={`hover:text-cyan-400 transition ${vista === 'conferencias' ? 'text-cyan-400' : ''}`}>Conferencias</button>
            <button onClick={() => setVista('publicaciones')} className={`hover:text-cyan-400 transition ${vista === 'publicaciones' ? 'text-cyan-400' : ''}`}>Social/Cultural</button>
            <button onClick={() => setVista('diplomas')} className={`hover:text-amber-400 transition ${vista === 'diplomas' ? 'text-amber-400' : ''}`}>Diplomas</button>
          </nav>

          <div>
            {usuarioLogueado ? (
              <button onClick={() => setVista('admin')} className="bg-pink-500/20 text-pink-400 border border-pink-500/40 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-pink-500/30 transition">
                ⚙️ Panel Staff
              </button>
            ) : (
              <button onClick={() => setVista('login')} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 px-3.5 py-1.5 rounded-lg text-xs font-bold transition">
                Acceso Staff
              </button>
            )}
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
        {vista === 'inicio' && <Inicio />}
        {vista === 'talleres' && <VistaEventosPublicos categoria="talleres" />}
        {vista === 'conferencias' && <VistaEventosPublicos categoria="conferencias" />}
        {vista === 'publicaciones' && <VistaPublicaciones />}
        {vista === 'diplomas' && <VistaConsultaDiplomas />}
        {vista === 'login' && !usuarioLogueado && (
          <LoginAdmin onLogin={(info) => {
            setUsuarioLogueado(info);
            setVista('admin');
          }} />
        )}
        {vista === 'admin' && usuarioLogueado && (
          <PanelAdmin usuario={usuarioLogueado} onLogout={() => {
            setUsuarioLogueado(null);
            setVista('inicio');
          }} />
        )}
      </main>

      <Footer />
    </div>
  );
}