import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
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

// --- COMPONENTE FOOTER / PIE DE PÁGINA NEÓN ---
const Footer = () => (
  <footer className="bg-zinc-950 text-zinc-300 mt-20 border-t border-zinc-800/80 relative overflow-hidden">
    {/* Resplandor ambiental de fondo */}
    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
    
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm relative z-10">
      <div>
        <h4 className="font-black text-xl bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent mb-3">
          MECACORE CMT
        </h4>
        <p className="text-zinc-400 text-xs leading-relaxed">
          Comité de Ingeniería Mecatrónica en el Instituto Tecnológico de Hermosillo. Impulsando la robótica, automatización y tecnología de vanguardia.
        </p>
      </div>
      <div>
        <h4 className="font-bold text-cyan-400 mb-3 tracking-wider text-xs uppercase">Enlaces Rápidos</h4>
        <ul className="space-y-2 text-xs text-zinc-400">
          <li className="hover:text-pink-400 transition cursor-pointer">⚡ Talleres de Capacitación</li>
          <li className="hover:text-pink-400 transition cursor-pointer">📡 Conferencias Magistrales</li>
          <li className="hover:text-pink-400 transition cursor-pointer">📜 Consulta de Diplomas</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-fuchsia-400 mb-3 tracking-wider text-xs uppercase">Contacto</h4>
        <p className="text-xs text-zinc-400">📍 Instituto Tecnológico de Hermosillo (ITH)</p>
        <p className="text-xs text-zinc-400">✉️ mecacore.ith@gmail.com</p>
      </div>
    </div>
    <div className="bg-zinc-900/60 py-4 text-center text-xs text-zinc-500 border-t border-zinc-800/50">
      © {new Date().getFullYear()} <span className="text-cyan-400 font-bold">MecaCore CMT</span> — Todos los derechos reservados.
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
        <body className="bg-white flex items-center justify-center min-h-screen">
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

        {/* CONTENIDO DEL DIPLOMA */}
        <div id="diploma-imprimible" className="border-4 border-double border-pink-500/60 p-8 rounded-xl bg-zinc-950 text-center relative shadow-inner overflow-hidden">
          {/* Adorno Neón Fondo */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex justify-between items-center mb-6 border-b border-cyan-500/30 pb-4">
            <div className="text-left">
              <h4 className="font-black text-cyan-400 text-xl tracking-wider">MECACORE CMT</h4>
              <p className="text-[10px] text-pink-400 uppercase font-semibold tracking-widest">Comité de Ingeniería Mecatrónica</p>
            </div>
            <div className="text-right">
              <h5 className="font-bold text-zinc-300 text-xs">Instituto Tecnológico de Hermosillo</h5>
              <p className="text-[10px] text-zinc-500">Hermosillo, Sonora</p>
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
              "{evento?.titulo || 'Actividad MecaCore CMT'}"
            </p>
            <p className="text-[11px] text-zinc-400">
              Impartido por: <strong className="text-cyan-300">{evento?.expositor || 'Comité MecaCore'}</strong> — Fecha: <strong className="text-cyan-300">{evento?.fecha || new Date().toLocaleDateString()}</strong>
            </p>
          </div>

          <div className="mt-12 pt-6 grid grid-cols-2 gap-8 max-w-md mx-auto border-t border-zinc-800">
            <div>
              <div className="h-10 border-b border-cyan-500/40 mb-1"></div>
              <p className="text-[10px] font-bold text-cyan-400 uppercase">Master Admin</p>
              <p className="text-[9px] text-zinc-500">Comité MecaCore CMT</p>
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
            titulo: reg.eventoTitulo || 'Evento MecaCore',
            expositor: 'Comité MecaCore CMT',
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
        <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-pink-400 to-red-500 bg-clip-text text-transparent mb-2">📜 Consulta de Diplomas</h2>
        <p className="text-sm text-zinc-400">Portal Oficial de Reconocimientos MecaCore CMT</p>
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
          {buscando ? 'Buscando...' : '🔍 Buscar Diplomas'}
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
                      📜 Descargar Diploma
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

// --- MODAL DE INSCRIPCIÓN PARA ESTUDIANTES ---
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

// --- VISTAS PÚBLICAS ---

const Inicio = () => (
  <div className="space-y-8 animate-fade-in">
    {/* HERO PRINCIPAL */}
    <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-cyan-500/30 text-zinc-100 p-10 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.2)] text-center relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <span className="text-xs font-black uppercase tracking-widest text-pink-500 bg-pink-500/10 border border-pink-500/30 px-3 py-1 rounded-full inline-block mb-3">
        Plataforma Oficial
      </span>
      <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent mb-3">
        Comité MecaCore CMT
      </h1>
      <p className="text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
        Innovación, Robótica y Desarrollo Tecnológico en la carrera de Ingeniería Mecatrónica (ITH).
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-zinc-900/80 p-6 rounded-xl border border-zinc-800 shadow-md">
        <h2 className="text-2xl font-bold mb-3 text-cyan-400">Bienvenido a la Plataforma</h2>
        <p className="text-zinc-400 leading-relaxed text-sm">
          Explora los próximos talleres prácticos de microcontroladores, programación y diseño 3D, asiste a conferencias magistrales e inscríbete para recibir reconocimientos oficiales emitidos por el comité.
        </p>
      </div>

      <div className="bg-zinc-900/80 p-6 rounded-xl border border-zinc-800 shadow-md">
        <h2 className="text-2xl font-bold mb-3 text-pink-400">Accesos Rápidos</h2>
        <ul className="space-y-3 text-sm">
          <li className="p-3 bg-zinc-950/80 rounded-lg text-cyan-300 font-medium flex items-center justify-between border border-cyan-500/20 hover:border-cyan-500/50 transition">
            <span>✨ Explora las próximas conferencias</span>
            <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded font-bold">Ver</span>
          </li>
          <li className="p-3 bg-zinc-950/80 rounded-lg text-pink-300 font-medium flex items-center justify-between border border-pink-500/20 hover:border-pink-500/50 transition">
            <span>🛠️ Inscríbete a los talleres prácticos</span>
            <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-0.5 rounded font-bold">Ver</span>
          </li>
          <li className="p-3 bg-zinc-950/80 rounded-lg text-amber-300 font-medium flex items-center justify-between border border-amber-500/20 hover:border-amber-500/50 transition">
            <span>📜 Consulta tus Diplomas con tu N. Control</span>
            <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold">Buscar</span>
          </li>
        </ul>
      </div>
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
              <span className="text-[10px] font-bold text-fuchsia-400 uppercase bg-fuchsia-500/10 border border-fuchsia-500/30 px-2.5 py-1 rounded-full">Anuncio CMT</span>
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
      setMensaje('¡Solicitud enviada correctamente! Espera la aprobación del Master Admin.');
      setDatos({ nombre: '', numeroControl: '', puesto: '', correoInst: '', correoPers: '', telefono: '' });
    } catch (error) {
      setMensaje('Error al enviar la solicitud.');
    }
    setEnviando(false);
  };

  return (
    <div className="max-w-md mx-auto bg-zinc-900 border border-zinc-800 p-8 rounded-xl shadow-[0_0_25px_rgba(236,72,153,0.15)] mt-10 text-zinc-100">
      <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent mb-1">Solicitar Acceso Staff</h2>
      <p className="text-xs text-center text-zinc-500 mb-6">Para coordinadores y colaboradores de logística</p>
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

    if (inputLimpio === 'mccore@admin.com' && password === 'MecaCore2004') {
      onLogin({ isMaster: true, nombre: 'Master Admin' });
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
          setError('⚠ Tu acceso ha sido revocado o denegado por el Master Admin.');
        } else if (data.estado === 'pendiente') {
          setError('⏳ Tu solicitud sigue pendiente de aprobación por el Master Admin.');
        } else {
          onLogin({ 
            isMaster: false, 
            nombre: data.nombre, 
            puesto: data.puesto,
            permisos: data.permisos || { eventos: false, publicaciones: false, asistencias: true }
          });
        }
      } else {
        setError('Credenciales incorrectas.');
      }
    } catch (err) {
      setError('Error al consultar la base de datos.');
    }
    setCargando(false);
  };

  if (mostrarSolicitud) return <FormularioSolicitud onVolver={() => setMostrarSolicitud(false)} />;

  return (
    <div className="max-w-md mx-auto bg-zinc-900 border border-zinc-800 p-8 rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.15)] mt-10 text-zinc-100">
      <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">Acceso Staff MecaCore</h2>
      {error && <p className="text-rose-400 text-xs mb-4 text-center font-medium bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input required type="text" placeholder="Usuario asignado o Correo" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm text-zinc-100 placeholder-zinc-600 font-mono" value={usuarioInput} onChange={(e) => setUsuarioInput(e.target.value)} />
        <input required type="password" placeholder="Contraseña" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm text-zinc-100 placeholder-zinc-600" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={cargando} type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold py-2.5 rounded-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition disabled:opacity-50 text-sm">
          {cargando ? 'Verificando...' : 'Iniciar Sesión'}
        </button>
      </form>
      <div className="mt-6 text-center border-t border-zinc-800 pt-4">
        <p className="text-xs text-zinc-500 mb-2">¿Nuevo colaborador del comité?</p>
        <button onClick={() => setMostrarSolicitud(true)} className="text-pink-400 text-xs font-bold hover:underline">Solicitar Acceso</button>
      </div>
    </div>
  );
};

// --- PANEL DE CONTROL DE COORDINADORES Y COLABORADORES ---

const PanelCoordinador = ({ usuario, puesto, permisos, onLogout }: { usuario: string; puesto?: string; permisos?: any; onLogout: () => void }) => {
  const userPermisos = permisos || { eventos: false, publicaciones: false, asistencias: true };
  
  const pestanaInicial = userPermisos.asistencias ? 'asistencias' : userPermisos.eventos ? 'eventos' : userPermisos.publicaciones ? 'publicaciones' : 'ninguna';
  const [pestana, setPestana] = useState<'eventos' | 'publicaciones' | 'asistencias' | 'ninguna'>(pestanaInicial);

  // Form Eventos
  const [nuevoEvento, setNuevoEvento] = useState({ titulo: '', categoria: 'talleres', expositor: '', fecha: '', hora: '', cupo: '30', descripcion: '' });
  const [guardandoEvento, setGuardandoEvento] = useState(false);
  const [misEventos, setMisEventos] = useState<any[]>([]);

  // Publicaciones
  const [nuevaPub, setNuevaPub] = useState({ titulo: '', contenido: '' });
  const [guardandoPub, setGuardandoPub] = useState(false);
  const [misPublicaciones, setMisPublicaciones] = useState<any[]>([]);

  // Asistencias y Checkin
  const [eventoSeleccionadoId, setEventoSeleccionadoId] = useState('');
  const [listaAlumnos, setListaAlumnos] = useState<any[]>([]);
  const [cargandoLista, setCargandoLista] = useState(false);
  const [filtroAlumno, setFiltroAlumno] = useState('');
  const [diplomaSeleccionado, setDiplomaSeleccionado] = useState<any>(null);

  const cargarEventos = async () => {
    try {
      const snap = await getDocs(collection(db, "eventos"));
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setMisEventos(docs);
      if (docs.length > 0 && !eventoSeleccionadoId) {
        setEventoSeleccionadoId(docs[0].id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const cargarPublicaciones = async () => {
    try {
      const snap = await getDocs(collection(db, "publicaciones"));
      setMisPublicaciones(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error(e);
    }
  };

  const cargarAsistentes = async (eventId: string) => {
    if (!eventId) return;
    setCargandoLista(true);
    try {
      const q = query(collection(db, "registros_eventos"), where("eventoId", "==", eventId));
      const snap = await getDocs(q);
      setListaAlumnos(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error(e);
    }
    setCargandoLista(false);
  };

  useEffect(() => {
    cargarEventos();
    cargarPublicaciones();
  }, []);

  useEffect(() => {
    if (eventoSeleccionadoId) {
      cargarAsistentes(eventoSeleccionadoId);
    }
  }, [eventoSeleccionadoId]);

  const toggleAsistencia = async (idRegistro: string, estadoActual: boolean) => {
    try {
      await updateDoc(doc(db, "registros_eventos", idRegistro), { asistio: !estadoActual });
      setListaAlumnos(prev => prev.map(al => al.id === idRegistro ? { ...al, asistio: !estadoActual } : al));
    } catch (err) {
      alert("Error al actualizar la asistencia.");
    }
  };

  const handleCrearEvento = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardandoEvento(true);
    try {
      await addDoc(collection(db, "eventos"), {
        ...nuevoEvento,
        creador: usuario,
        puestoCreador: puesto,
        fechaCreacion: new Date().toISOString()
      });
      alert("¡Evento publicado!");
      setNuevoEvento({ titulo: '', categoria: 'talleres', expositor: '', fecha: '', hora: '', cupo: '30', descripcion: '' });
      cargarEventos();
    } catch (err) {
      alert("Error al guardar el evento.");
    }
    setGuardandoEvento(false);
  };

  const eliminarEvento = async (id: string) => {
    if (confirm("¿Eliminar este evento?")) {
      await deleteDoc(doc(db, "eventos", id));
      cargarEventos();
    }
  };

  const handleCrearPublicacion = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardandoPub(true);
    try {
      await addDoc(collection(db, "publicaciones"), {
        ...nuevaPub,
        autor: usuario,
        fecha: new Date().toISOString()
      });
      alert("¡Anuncio publicado!");
      setNuevaPub({ titulo: '', contenido: '' });
      cargarPublicaciones();
    } catch (err) {
      alert("Error al crear la publicación.");
    }
    setGuardandoPub(false);
  };

  const eliminarPublicacion = async (id: string) => {
    if (confirm("¿Eliminar publicación?")) {
      await deleteDoc(doc(db, "publicaciones", id));
      cargarPublicaciones();
    }
  };

  const eliminarAlumnoInscrito = async (idRegistro: string) => {
    if (confirm("¿Eliminar alumno del registro?")) {
      await deleteDoc(doc(db, "registros_eventos", idRegistro));
      cargarAsistentes(eventoSeleccionadoId);
    }
  };

  const exportarCSV = () => {
    if (!listaAlumnos.length) return alert("No hay alumnos inscritos.");
    const eventoActual = misEventos.find(e => e.id === eventoSeleccionadoId);
    const headers = ["No.", "Nombre del Alumno", "Numero de Control", "Correo Electrónico", "Asistió", "Fecha de Registro"];
    const rows = listaAlumnos.map((al, idx) => [
      idx + 1,
      `"${al.nombreAlumno || ''}"`,
      `"${al.controlAlumno || ''}"`,
      `"${al.correoAlumno || ''}"`,
      `"${al.asistio ? 'SI' : 'NO'}"`,
      `"${new Date(al.fechaRegistro).toLocaleDateString()}"`
    ]);
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Asistencia_${(eventoActual?.titulo || 'Evento').replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const alumnosFiltrados = listaAlumnos.filter(al => 
    al.nombreAlumno?.toLowerCase().includes(filtroAlumno.toLowerCase()) ||
    al.controlAlumno?.toLowerCase().includes(filtroAlumno.toLowerCase())
  );

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-xl space-y-6 text-zinc-100 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-800 pb-4 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400">¡Bienvenido, {usuario}!</h2>
          <p className="text-xs text-zinc-400">Puesto: <span className="font-semibold text-pink-400">{puesto || 'Colaborador Staff'}</span></p>
        </div>
        <button onClick={onLogout} className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-4 py-2 rounded-lg font-bold hover:bg-rose-500/20 transition text-xs">
          Cerrar Sesión
        </button>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-3">
        {userPermisos.asistencias && (
          <button onClick={() => setPestana('asistencias')} className={`px-4 py-2 rounded-lg text-xs font-bold transition ${pestana === 'asistencias' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200'}`}>
            📋 Pase de Lista
          </button>
        )}
        {userPermisos.eventos && (
          <button onClick={() => setPestana('eventos')} className={`px-4 py-2 rounded-lg text-xs font-bold transition ${pestana === 'eventos' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200'}`}>
            📅 Crear Eventos
          </button>
        )}
        {userPermisos.publicaciones && (
          <button onClick={() => setPestana('publicaciones')} className={`px-4 py-2 rounded-lg text-xs font-bold transition ${pestana === 'publicaciones' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200'}`}>
            📰 Publicar Anuncios
          </button>
        )}
      </div>

      {/* MÓDULO CHECK-IN Y ASISTENCIAS */}
      {pestana === 'asistencias' && userPermisos.asistencias && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-zinc-100">Pase de Lista en Tiempo Real</h3>
              <p className="text-xs text-zinc-500">Confirma la presencia de los alumnos para habilitar sus certificados.</p>
            </div>
            {listaAlumnos.length > 0 && (
              <button onClick={exportarCSV} className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-500/20 transition flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                📊 Exportar a Excel (CSV)
              </button>
            )}
          </div>
          
          {misEventos.length === 0 ? (
            <p className="text-zinc-500">Aún no hay eventos registrados.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-950/80 p-4 rounded-xl border border-zinc-800">
                <div>
                  <label className="block text-xs font-bold text-cyan-400 mb-1">Selecciona el Evento:</label>
                  <select className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 font-medium text-sm text-zinc-100" value={eventoSeleccionadoId} onChange={e => setEventoSeleccionadoId(e.target.value)}>
                    {misEventos.map(ev => (
                      <option key={ev.id} value={ev.id}>{ev.titulo} ({ev.categoria})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-pink-400 mb-1">🔍 Buscar en Lista:</label>
                  <input
                    type="text"
                    placeholder="Nombre o N. Control..."
                    className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg outline-none focus:border-pink-500 text-sm text-zinc-100 placeholder-zinc-600 font-mono"
                    value={filtroAlumno}
                    onChange={e => setFiltroAlumno(e.target.value)}
                  />
                </div>
              </div>

              <div className="border border-zinc-800 rounded-lg overflow-hidden mt-4">
                <table className="w-full text-left text-sm text-zinc-300">
                  <thead className="bg-zinc-950 text-cyan-400 uppercase text-xs border-b border-zinc-800">
                    <tr>
                      <th className="p-3">#</th>
                      <th className="p-3">Nombre del Alumno</th>
                      <th className="p-3">N. Control</th>
                      <th className="p-3">Estado Asistencia</th>
                      <th className="p-3 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {cargandoLista ? (
                      <tr><td colSpan={5} className="p-4 text-center text-zinc-500">Cargando lista...</td></tr>
                    ) : alumnosFiltrados.length === 0 ? (
                      <tr><td colSpan={5} className="p-4 text-center text-zinc-500">No se encontraron alumnos registrados.</td></tr>
                    ) : (
                      alumnosFiltrados.map((al, index) => (
                        <tr key={al.id} className={`hover:bg-zinc-800/40 transition ${al.asistio ? 'bg-emerald-500/5' : ''}`}>
                          <td className="p-3 font-bold text-zinc-400">{index + 1}</td>
                          <td className="p-3 font-medium text-zinc-100">{al.nombreAlumno}</td>
                          <td className="p-3 font-mono text-xs text-zinc-400">{al.controlAlumno}</td>
                          <td className="p-3">
                            <button
                              onClick={() => toggleAsistencia(al.id, al.asistio ?? false)}
                              className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                                al.asistio 
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                              }`}
                            >
                              {al.asistio ? '✅ Confirmado' : '⏳ Marcar Asistencia'}
                            </button>
                          </td>
                          <td className="p-3 text-right flex justify-end gap-2">
                            <button onClick={() => setDiplomaSeleccionado({ alumno: al, evento: misEventos.find(e => e.id === eventoSeleccionadoId) })} className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-2.5 py-1 rounded text-xs font-bold hover:bg-amber-500/20 transition">
                              📜 Diploma
                            </button>
                            <button onClick={() => eliminarAlumnoInscrito(al.id)} className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-2 py-1 rounded text-xs font-bold hover:bg-rose-500/20 transition">
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {diplomaSeleccionado && <ModalDiploma datos={diplomaSeleccionado} onClose={() => setDiplomaSeleccionado(null)} />}
        </div>
      )}

      {/* MÓDULO EVENTOS */}
      {pestana === 'eventos' && userPermisos.eventos && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={handleCrearEvento} className="space-y-4">
            <h3 className="text-xl font-bold text-zinc-100">Crear Taller o Conferencia</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Título</label>
                <input required type="text" placeholder="Ej. Taller Arduino" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm text-zinc-100 placeholder-zinc-600" value={nuevoEvento.titulo} onChange={e => setNuevoEvento({...nuevoEvento, titulo: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Categoría</label>
                <select className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm text-zinc-100" value={nuevoEvento.categoria} onChange={e => setNuevoEvento({...nuevoEvento, categoria: e.target.value as any})}>
                  <option value="talleres">Taller</option>
                  <option value="conferencias">Conferencia</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Expositor</label>
                <input required type="text" placeholder="Ponente" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm text-zinc-100 placeholder-zinc-600" value={nuevoEvento.expositor} onChange={e => setNuevoEvento({...nuevoEvento, expositor: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Cupo</label>
                <input required type="number" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm text-zinc-100" value={nuevoEvento.cupo} onChange={e => setNuevoEvento({...nuevoEvento, cupo: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Fecha</label>
                <input required type="date" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm text-zinc-100" value={nuevoEvento.fecha} onChange={e => setNuevoEvento({...nuevoEvento, fecha: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Hora</label>
                <input required type="text" placeholder="Ej. 11:00 AM" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm text-zinc-100 placeholder-zinc-600" value={nuevoEvento.hora} onChange={e => setNuevoEvento({...nuevoEvento, hora: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-1">Descripción</label>
              <textarea required rows={3} placeholder="Detalles o requisitos..." className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm text-zinc-100 placeholder-zinc-600" value={nuevoEvento.descripcion} onChange={e => setNuevoEvento({...nuevoEvento, descripcion: e.target.value})}></textarea>
            </div>
            <button disabled={guardandoEvento} type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold py-2.5 rounded-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition disabled:opacity-50 text-sm">
              {guardandoEvento ? 'Publicando...' : 'Publicar Evento'}
            </button>
          </form>

          <div className="space-y-3 border-l border-zinc-800 pl-0 lg:pl-6">
            <h3 className="text-xl font-bold text-zinc-100 mb-2">Eventos Publicados ({misEventos.length})</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {misEventos.map(ev => (
                <div key={ev.id} className="p-3 border border-zinc-800 rounded-lg bg-zinc-950 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-cyan-400">{ev.titulo}</span> <span className="text-zinc-500">({ev.categoria})</span>
                    <p className="text-zinc-400">{ev.fecha} - {ev.hora} | Cupo: {ev.cupo}</p>
                  </div>
                  <button onClick={() => eliminarEvento(ev.id)} className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-2.5 py-1 rounded font-bold hover:bg-rose-500/20 transition">
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MÓDULO PUBLICACIONES */}
      {pestana === 'publicaciones' && userPermisos.publicaciones && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={handleCrearPublicacion} className="space-y-4">
            <h3 className="text-xl font-bold text-zinc-100">Publicar Anuncio</h3>
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-1">Título</label>
              <input required type="text" placeholder="Ej. Torneo Robótica" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm text-zinc-100 placeholder-zinc-600" value={nuevaPub.titulo} onChange={e => setNuevaPub({...nuevaPub, titulo: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-1">Contenido</label>
              <textarea required rows={5} placeholder="Escribe el mensaje..." className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm text-zinc-100 placeholder-zinc-600" value={nuevaPub.contenido} onChange={e => setNuevaPub({...nuevaPub, contenido: e.target.value})}></textarea>
            </div>
            <button disabled={guardandoPub} type="submit" className="w-full bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-extrabold py-2.5 rounded-lg hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] transition disabled:opacity-50 text-sm">
              {guardandoPub ? 'Publicando...' : 'Publicar Anuncio'}
            </button>
          </form>

          <div className="space-y-3 border-l border-zinc-800 pl-0 lg:pl-6">
            <h3 className="text-xl font-bold text-zinc-100 mb-2">Anuncios Activos ({misPublicaciones.length})</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {misPublicaciones.map(pub => (
                <div key={pub.id} className="p-3 border border-zinc-800 rounded-lg bg-zinc-950 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-fuchsia-400">{pub.titulo}</p>
                    <p className="text-zinc-500 line-clamp-1">{pub.contenido}</p>
                  </div>
                  <button onClick={() => eliminarPublicacion(pub.id)} className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-2.5 py-1 rounded font-bold hover:bg-rose-500/20 transition">
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- PANEL MASTER ADMIN COMPLETO ---

const PanelMaster = ({ onLogout }: { onLogout: () => void }) => {
  const [pestanaMaster, setPestanaMaster] = useState<'coordinadores' | 'eventos' | 'publicaciones' | 'asistencias'>('coordinadores');

  // Solicitudes
  const [solicitudes, setSolicitudes] = useState<any[]>([]);

  // Eventos / Publicaciones / Asistencias Master
  const [eventosMaster, setEventosMaster] = useState<any[]>([]);
  const [publicacionesMaster, setPublicacionesMaster] = useState<any[]>([]);
  const [eventoSeleccionadoId, setEventoSeleccionadoId] = useState('');
  const [listaAlumnos, setListaAlumnos] = useState<any[]>([]);
  const [cargandoLista, setCargandoLista] = useState(false);
  const [filtroAlumno, setFiltroAlumno] = useState('');
  const [diplomaSeleccionado, setDiplomaSeleccionado] = useState<any>(null);

  // Forms Master
  const [nuevoEvento, setNuevoEvento] = useState({ titulo: '', categoria: 'talleres', expositor: '', fecha: '', hora: '', cupo: '30', descripcion: '' });
  const [nuevaPub, setNuevaPub] = useState({ titulo: '', contenido: '' });

  const cargarSolicitudes = async () => {
    try {
      const snap = await getDocs(collection(db, "solicitudes_admin"));
      setSolicitudes(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error(err);
    }
  };

  const cargarEventosMaster = async () => {
    try {
      const snap = await getDocs(collection(db, "eventos"));
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setEventosMaster(docs);
      if (docs.length > 0 && !eventoSeleccionadoId) {
        setEventoSeleccionadoId(docs[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const cargarPublicacionesMaster = async () => {
    try {
      const snap = await getDocs(collection(db, "publicaciones"));
      setPublicacionesMaster(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
    }
  };

  const cargarAsistentesMaster = async (eventId: string) => {
    if (!eventId) return;
    setCargandoLista(true);
    try {
      const q = query(collection(db, "registros_eventos"), where("eventoId", "==", eventId));
      const snap = await getDocs(q);
      setListaAlumnos(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error(e);
    }
    setCargandoLista(false);
  };

  useEffect(() => {
    cargarSolicitudes();
    cargarEventosMaster();
    cargarPublicacionesMaster();
  }, []);

  useEffect(() => {
    if (eventoSeleccionadoId) {
      cargarAsistentesMaster(eventoSeleccionadoId);
    }
  }, [eventoSeleccionadoId]);

  const toggleAsistenciaMaster = async (idRegistro: string, estadoActual: boolean) => {
    try {
      await updateDoc(doc(db, "registros_eventos", idRegistro), { asistio: !estadoActual });
      setListaAlumnos(prev => prev.map(al => al.id === idRegistro ? { ...al, asistio: !estadoActual } : al));
    } catch (err) {
      alert("Error al actualizar la asistencia.");
    }
  };

  const cambiarEstado = async (id: string, nuevoEstado: 'aprobado' | 'denegado', sol?: any) => {
    let updateData: any = { estado: nuevoEstado };
    if (nuevoEstado === 'aprobado' && !sol?.usuarioGenerado) {
      const letras = 'abcdefghijklmnopqrstuvwxyz';
      const l1 = letras[Math.floor(Math.random() * letras.length)];
      const l2 = letras[Math.floor(Math.random() * letras.length)];
      const pre = (sol?.puesto || 'staff').substring(0, 5).toLowerCase().replace(/\s+/g, '');
      
      updateData.usuarioGenerado = `p#${sol?.numeroControl || '0000'}${l1}${l2}`;
      updateData.passwordGenerada = `${pre}#${sol?.numeroControl || '0000'}${l1}${l2}`;
      updateData.permisos = sol?.permisos || { eventos: false, publicaciones: false, asistencias: true };
    }
    await updateDoc(doc(db, "solicitudes_admin", id), updateData);
    cargarSolicitudes();
  };

  const togglePermiso = async (id: string, permisoKey: string, valorActual: boolean, permisosPrevios: any) => {
    const nuevosPermisos = {
      ...(permisosPrevios || { eventos: false, publicaciones: false, asistencias: true }),
      [permisoKey]: !valorActual
    };
    await updateDoc(doc(db, "solicitudes_admin", id), { permisos: nuevosPermisos });
    cargarSolicitudes();
  };

  const eliminarRegistro = async (id: string) => {
    if (confirm("¿Eliminar usuario definitivamente?")) {
      await deleteDoc(doc(db, "solicitudes_admin", id));
      cargarSolicitudes();
    }
  };

  const handleCrearEventoMaster = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, "eventos"), {
      ...nuevoEvento,
      creador: "Master Admin",
      puestoCreador: "Administrador Principal",
      fechaCreacion: new Date().toISOString()
    });
    alert("¡Evento publicado!");
    setNuevoEvento({ titulo: '', categoria: 'talleres', expositor: '', fecha: '', hora: '', cupo: '30', descripcion: '' });
    cargarEventosMaster();
  };

  const eliminarEventoMaster = async (id: string) => {
    if (confirm("¿Eliminar evento?")) {
      await deleteDoc(doc(db, "eventos", id));
      cargarEventosMaster();
    }
  };

  const handleCrearPublicacionMaster = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, "publicaciones"), {
      ...nuevaPub,
      autor: "Master Admin",
      fecha: new Date().toISOString()
    });
    alert("¡Anuncio publicado!");
    setNuevaPub({ titulo: '', contenido: '' });
    cargarPublicacionesMaster();
  };

  const eliminarPublicacionMaster = async (id: string) => {
    if (confirm("¿Eliminar anuncio?")) {
      await deleteDoc(doc(db, "publicaciones", id));
      cargarPublicacionesMaster();
    }
  };

  const eliminarAlumnoInscritoMaster = async (idRegistro: string) => {
    if (confirm("¿Eliminar alumno registrado?")) {
      await deleteDoc(doc(db, "registros_eventos", idRegistro));
      cargarAsistentesMaster(eventoSeleccionadoId);
    }
  };

  const exportarCSVMaster = () => {
    if (!listaAlumnos.length) return alert("No hay inscritos en este evento.");
    const eventoActual = eventosMaster.find(e => e.id === eventoSeleccionadoId);
    const headers = ["No.", "Nombre del Alumno", "Numero de Control", "Correo Electrónico", "Asistió", "Fecha de Registro"];
    const rows = listaAlumnos.map((al, idx) => [
      idx + 1,
      `"${al.nombreAlumno || ''}"`,
      `"${al.controlAlumno || ''}"`,
      `"${al.correoAlumno || ''}"`,
      `"${al.asistio ? 'SI' : 'NO'}"`,
      `"${new Date(al.fechaRegistro).toLocaleDateString()}"`
    ]);
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Master_Asistencia_${(eventoActual?.titulo || 'Evento').replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const alumnosFiltradosMaster = listaAlumnos.filter(al => 
    al.nombreAlumno?.toLowerCase().includes(filtroAlumno.toLowerCase()) ||
    al.controlAlumno?.toLowerCase().includes(filtroAlumno.toLowerCase())
  );

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl shadow-2xl space-y-6 text-zinc-100 animate-fade-in">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">Panel Master Admin</h2>
          <p className="text-xs text-zinc-400">Control General de Permisos y Administración CMT</p>
        </div>
        <button onClick={onLogout} className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-4 py-2 rounded-lg font-bold hover:bg-rose-500/20 transition text-xs">
          Cerrar Sesión
        </button>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-3">
        <button onClick={() => setPestanaMaster('coordinadores')} className={`px-4 py-2 rounded-lg text-xs font-bold transition ${pestanaMaster === 'coordinadores' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200'}`}>
          👥 Cuentas y Permisos Staff
        </button>
        <button onClick={() => setPestanaMaster('asistencias')} className={`px-4 py-2 rounded-lg text-xs font-bold transition ${pestanaMaster === 'asistencias' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200'}`}>
          📋 Control Asistencia & Diplomas
        </button>
        <button onClick={() => setPestanaMaster('eventos')} className={`px-4 py-2 rounded-lg text-xs font-bold transition ${pestanaMaster === 'eventos' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200'}`}>
          📅 Gestionar Eventos
        </button>
        <button onClick={() => setPestanaMaster('publicaciones')} className={`px-4 py-2 rounded-lg text-xs font-bold transition ${pestanaMaster === 'publicaciones' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200'}`}>
          📰 Gestionar Anuncios
        </button>
      </div>

      {/* TAB 1: COORDINADORES Y PERMISOS DIVERSIFICADOS */}
      {pestanaMaster === 'coordinadores' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-zinc-200">Solicitudes de Registro de Staff</h3>
          {solicitudes.length === 0 ? <p className="text-zinc-500">No hay solicitudes registradas aún.</p> : null}
          {solicitudes.map((sol) => {
            const permisos = sol.permisos || { eventos: false, publicaciones: false, asistencias: true };
            return (
              <div key={sol.id} className="p-5 border border-zinc-800 rounded-xl bg-zinc-950 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-cyan-400 text-lg">{sol.nombre}</p>
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${sol.estado === 'aprobado' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : sol.estado === 'denegado' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                        {sol.estado || 'pendiente'}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">Puesto: <strong className="text-pink-400">{sol.puesto}</strong> | Control: <span className="font-mono">{sol.numeroControl}</span></p>
                    <p className="text-[11px] text-zinc-500">Inst: {sol.correoInst} | Pers: {sol.correoPers} | Tel: {sol.telefono}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {sol.estado === 'pendiente' && (
                      <>
                        <button onClick={() => cambiarEstado(sol.id, 'aprobado', sol)} className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-500/30 transition">
                          ✓ Aprobar
                        </button>
                        <button onClick={() => cambiarEstado(sol.id, 'denegado')} className="bg-rose-500/20 border border-rose-500/40 text-rose-300 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-rose-500/30 transition">
                          ✕ Denegar
                        </button>
                      </>
                    )}
                    {sol.estado === 'aprobado' && (
                      <button onClick={() => cambiarEstado(sol.id, 'denegado')} className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-rose-500/20 transition">
                        🚫 Revocar
                      </button>
                    )}
                    {sol.estado === 'denegado' && (
                      <button onClick={() => cambiarEstado(sol.id, 'aprobado', sol)} className="bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-cyan-500/30 transition">
                        🔄 Reaprobar
                      </button>
                    )}
                    <button onClick={() => eliminarRegistro(sol.id)} className="bg-zinc-800 text-zinc-400 px-2.5 py-1.5 rounded-lg text-xs font-bold hover:bg-zinc-700 transition">
                      🗑️️
                    </button>
                  </div>
                </div>

                {sol.estado === 'aprobado' && (
                  <div className="pt-3 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-900/60 p-3 rounded-lg">
                    <div>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Credenciales Generadas:</p>
                      <p className="text-xs text-zinc-300"><strong>Usuario:</strong> <code className="bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 rounded text-cyan-400 font-mono">{sol.usuarioGenerado}</code></p>
                      <p className="text-xs text-zinc-300 mt-1"><strong>Contraseña:</strong> <code className="bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 rounded text-cyan-400 font-mono">{sol.passwordGenerada}</code></p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase mb-2">Permisos del Colaborador:</p>
                      <div className="flex flex-wrap gap-4 text-xs">
                        <label className="flex items-center gap-1.5 cursor-pointer text-zinc-300">
                          <input type="checkbox" checked={permisos.asistencias ?? true} onChange={() => togglePermiso(sol.id, 'asistencias', permisos.asistencias ?? true, permisos)} className="rounded text-pink-500 bg-zinc-950 border-zinc-800 focus:ring-pink-500" />
                          <span>📋 Pase de Lista (Check-in)</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer text-zinc-300">
                          <input type="checkbox" checked={permisos.eventos ?? false} onChange={() => togglePermiso(sol.id, 'eventos', permisos.eventos ?? false, permisos)} className="rounded text-pink-500 bg-zinc-950 border-zinc-800 focus:ring-pink-500" />
                          <span>📅 Crear Eventos</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer text-zinc-300">
                          <input type="checkbox" checked={permisos.publicaciones ?? false} onChange={() => togglePermiso(sol.id, 'publicaciones', permisos.publicaciones ?? false, permisos)} className="rounded text-pink-500 bg-zinc-950 border-zinc-800 focus:ring-pink-500" />
                          <span>📰 Crear Anuncios</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: ASISTENCIAS MASTER */}
      {pestanaMaster === 'asistencias' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-zinc-100">Control de Asistencia (Master View)</h3>
              <p className="text-xs text-zinc-500">Supervisión en tiempo real de registros y check-in.</p>
            </div>
            {listaAlumnos.length > 0 && (
              <button onClick={exportarCSVMaster} className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-500/20 transition flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                📊 Exportar a Excel (CSV)
              </button>
            )}
          </div>
          
          {eventosMaster.length === 0 ? (
            <p className="text-zinc-500">Aún no hay eventos registrados.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-950/80 p-4 rounded-xl border border-zinc-800">
                <div>
                  <label className="block text-xs font-bold text-cyan-400 mb-1">Selecciona el Evento:</label>
                  <select className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 font-medium text-sm text-zinc-100" value={eventoSeleccionadoId} onChange={e => setEventoSeleccionadoId(e.target.value)}>
                    {eventosMaster.map(ev => (
                      <option key={ev.id} value={ev.id}>{ev.titulo} ({ev.categoria})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-pink-400 mb-1">🔍 Buscar en Lista:</label>
                  <input
                    type="text"
                    placeholder="Nombre o N. Control..."
                    className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg outline-none focus:border-pink-500 text-sm text-zinc-100 placeholder-zinc-600 font-mono"
                    value={filtroAlumno}
                    onChange={e => setFiltroAlumno(e.target.value)}
                  />
                </div>
              </div>

              <div className="border border-zinc-800 rounded-lg overflow-hidden mt-4">
                <table className="w-full text-left text-sm text-zinc-300">
                  <thead className="bg-zinc-950 text-cyan-400 uppercase text-xs border-b border-zinc-800">
                    <tr>
                      <th className="p-3">#</th>
                      <th className="p-3">Nombre del Alumno</th>
                      <th className="p-3">N. Control</th>
                      <th className="p-3">Estado Asistencia</th>
                      <th className="p-3 text-right">Acciones Master</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {cargandoLista ? (
                      <tr><td colSpan={5} className="p-4 text-center text-zinc-500">Cargando lista...</td></tr>
                    ) : alumnosFiltradosMaster.length === 0 ? (
                      <tr><td colSpan={5} className="p-4 text-center text-zinc-500">No hay inscritos que coincidan.</td></tr>
                    ) : (
                      alumnosFiltradosMaster.map((al, index) => (
                        <tr key={al.id} className={`hover:bg-zinc-800/40 transition ${al.asistio ? 'bg-emerald-500/5' : ''}`}>
                          <td className="p-3 font-bold text-zinc-400">{index + 1}</td>
                          <td className="p-3 font-medium text-zinc-100">{al.nombreAlumno}</td>
                          <td className="p-3 font-mono text-xs text-zinc-400">{al.controlAlumno}</td>
                          <td className="p-3">
                            <button
                              onClick={() => toggleAsistenciaMaster(al.id, al.asistio ?? false)}
                              className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                                al.asistio 
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                              }`}
                            >
                              {al.asistio ? '✅ Confirmado' : '⏳ Marcar Asistencia'}
                            </button>
                          </td>
                          <td className="p-3 text-right flex justify-end gap-2">
                            <button onClick={() => setDiplomaSeleccionado({ alumno: al, evento: eventosMaster.find(e => e.id === eventoSeleccionadoId) })} className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-2.5 py-1 rounded text-xs font-bold hover:bg-amber-500/20 transition">
                              📜 Diploma
                            </button>
                            <button onClick={() => eliminarAlumnoInscritoMaster(al.id)} className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-2 py-1 rounded text-xs font-bold hover:bg-rose-500/20 transition">
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {diplomaSeleccionado && <ModalDiploma datos={diplomaSeleccionado} onClose={() => setDiplomaSeleccionado(null)} />}
        </div>
      )}

      {/* TAB 3: EVENTOS MASTER */}
      {pestanaMaster === 'eventos' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={handleCrearEventoMaster} className="space-y-4">
            <h3 className="text-xl font-bold text-zinc-100">Crear Evento (Modo Master)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Título</label>
                <input required type="text" placeholder="Ej. Taller Robótica" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm text-zinc-100 placeholder-zinc-600" value={nuevoEvento.titulo} onChange={e => setNuevoEvento({...nuevoEvento, titulo: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Categoría</label>
                <select className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm text-zinc-100" value={nuevoEvento.categoria} onChange={e => setNuevoEvento({...nuevoEvento, categoria: e.target.value as any})}>
                  <option value="talleres">Taller</option>
                  <option value="conferencias">Conferencia</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Expositor</label>
                <input required type="text" placeholder="Ponente" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm text-zinc-100 placeholder-zinc-600" value={nuevoEvento.expositor} onChange={e => setNuevoEvento({...nuevoEvento, expositor: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Cupo</label>
                <input required type="number" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm text-zinc-100" value={nuevoEvento.cupo} onChange={e => setNuevoEvento({...nuevoEvento, cupo: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Fecha</label>
                <input required type="date" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm text-zinc-100" value={nuevoEvento.fecha} onChange={e => setNuevoEvento({...nuevoEvento, fecha: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Hora</label>
                <input required type="text" placeholder="Ej. 11:00 AM" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm text-zinc-100 placeholder-zinc-600" value={nuevoEvento.hora} onChange={e => setNuevoEvento({...nuevoEvento, hora: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-1">Descripción</label>
              <textarea required rows={3} placeholder="Detalles..." className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm text-zinc-100 placeholder-zinc-600" value={nuevoEvento.descripcion} onChange={e => setNuevoEvento({...nuevoEvento, descripcion: e.target.value})}></textarea>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold py-2.5 rounded-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition text-sm">
              Publicar Evento
            </button>
          </form>

          <div className="space-y-3 border-l border-zinc-800 pl-0 lg:pl-6">
            <h3 className="text-xl font-bold text-zinc-100 mb-2">Todos los Eventos ({eventosMaster.length})</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {eventosMaster.map(ev => (
                <div key={ev.id} className="p-3 border border-zinc-800 rounded-lg bg-zinc-950 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-cyan-400">{ev.titulo}</span> <span className="text-zinc-500">({ev.categoria})</span>
                    <p className="text-zinc-400">{ev.fecha} - {ev.hora} | Por: {ev.creador}</p>
                  </div>
                  <button onClick={() => eliminarEventoMaster(ev.id)} className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-2.5 py-1 rounded font-bold hover:bg-rose-500/20 transition">
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ANUNCIOS MASTER */}
      {pestanaMaster === 'publicaciones' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={handleCrearPublicacionMaster} className="space-y-4">
            <h3 className="text-xl font-bold text-zinc-100">Nueva Publicación Cultural</h3>
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-1">Título</label>
              <input required type="text" placeholder="Ej. Torneo de Robótica" className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm text-zinc-100 placeholder-zinc-600" value={nuevaPub.titulo} onChange={e => setNuevaPub({...nuevaPub, titulo: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-1">Contenido</label>
              <textarea required rows={5} placeholder="Escribe el mensaje..." className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg outline-none focus:border-cyan-500 text-sm text-zinc-100 placeholder-zinc-600" value={nuevaPub.contenido} onChange={e => setNuevaPub({...nuevaPub, contenido: e.target.value})}></textarea>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-extrabold py-2.5 rounded-lg hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] transition text-sm">
              Publicar Anuncio
            </button>
          </form>

          <div className="space-y-3 border-l border-zinc-800 pl-0 lg:pl-6">
            <h3 className="text-xl font-bold text-zinc-100 mb-2">Todos los Anuncios ({publicacionesMaster.length})</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {publicacionesMaster.map(pub => (
                <div key={pub.id} className="p-3 border border-zinc-800 rounded-lg bg-zinc-950 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-fuchsia-400">{pub.titulo}</p>
                    <p className="text-zinc-500 line-clamp-1">{pub.contenido}</p>
                  </div>
                  <button onClick={() => eliminarPublicacionMaster(pub.id)} className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-2.5 py-1 rounded font-bold hover:bg-rose-500/20 transition">
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- APLICACIÓN PRINCIPAL ---

export default function App() {
  const [vistaActual, setVistaActual] = useState('inicio');
  const [sesion, setSesion] = useState<{ activa: boolean; isMaster: boolean; nombre: string; puesto?: string; permisos?: any }>({
    activa: false,
    isMaster: false,
    nombre: ''
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between selection:bg-pink-500 selection:text-white">
      <div>
        {/* NAVEGACIÓN FUTURISTA */}
        <nav className="bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center py-4 overflow-x-auto">
            <div className="font-black text-xl bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent cursor-pointer flex-shrink-0 mr-6 tracking-wider" onClick={() => setVistaActual('inicio')}>
              MECACORE CMT
            </div>
            <div className="flex space-x-1 md:space-x-3 min-w-max">
              <button onClick={() => setVistaActual('inicio')} className={`px-3 py-2 rounded-lg text-xs font-bold transition ${vistaActual === 'inicio' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'}`}>Inicio</button>
              <button onClick={() => setVistaActual('social')} className={`px-3 py-2 rounded-lg text-xs font-bold transition ${vistaActual === 'social' ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/50 shadow-[0_0_10px_rgba(217,70,239,0.3)]' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'}`}>Social y Cultural</button>
              <button onClick={() => setVistaActual('talleres')} className={`px-3 py-2 rounded-lg text-xs font-bold transition ${vistaActual === 'talleres' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'}`}>Talleres</button>
              <button onClick={() => setVistaActual('conferencias')} className={`px-3 py-2 rounded-lg text-xs font-bold transition ${vistaActual === 'conferencias' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'}`}>Conferencias</button>
              <button onClick={() => setVistaActual('diplomas')} className={`px-3 py-2 rounded-lg text-xs font-bold transition ${vistaActual === 'diplomas' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'text-amber-400 border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10'}`}>Mis Diplomas 📜</button>
              <button onClick={() => setVistaActual('admin')} className={`px-3 py-2 rounded-lg text-xs font-extrabold transition ${vistaActual === 'admin' ? 'bg-gradient-to-r from-pink-500 to-red-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]' : 'bg-pink-500/10 text-pink-400 border border-pink-500/30 hover:bg-pink-500/20'}`}>
                {sesion.activa ? (sesion.isMaster ? 'Panel Master' : 'Mi Panel Staff') : 'Acceso'}
              </button>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-4 py-8">
          {vistaActual === 'inicio' && <Inicio />}
          {vistaActual === 'social' && <VistaPublicaciones />}
          {vistaActual === 'talleres' && <VistaEventosPublicos categoria="talleres" />}
          {vistaActual === 'conferencias' && <VistaEventosPublicos categoria="conferencias" />}
          {vistaActual === 'diplomas' && <VistaConsultaDiplomas />}
          {vistaActual === 'admin' && (
            sesion.activa ? (
              sesion.isMaster ? (
                <PanelMaster onLogout={() => setSesion({ activa: false, isMaster: false, nombre: '' })} />
              ) : (
                <PanelCoordinador usuario={sesion.nombre} puesto={sesion.puesto} permisos={sesion.permisos} onLogout={() => setSesion({ activa: false, isMaster: false, nombre: '' })} />
              )
            ) : (
              <LoginAdmin onLogin={(info) => setSesion({ activa: true, ...info })} />
            )
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}