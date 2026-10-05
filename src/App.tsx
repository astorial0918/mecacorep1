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

// --- COMPONENTE FOOTER / PIE DE PÁGINA ---
const Footer = () => (
  <footer className="bg-blue-950 text-white mt-16 border-t border-blue-900">
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
      <div>
        <h4 className="font-black text-lg text-blue-400 mb-2">Comité MecaCore (CMT)</h4>
        <p className="text-gray-300 text-xs leading-relaxed">
          Comité de Ingeniería Mecatrónica en el Instituto Tecnológico de Hermosillo. Impulsando la innovación, la tecnología y el desarrollo profesional.
        </p>
      </div>
      <div>
        <h4 className="font-bold text-white mb-2">Enlaces Rápidos</h4>
        <ul className="space-y-1 text-xs text-gray-300">
          <li>• Talleres de Capacitación</li>
          <li>• Conferencias Magistrales</li>
          <li>• Consulta de Diplomas</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-white mb-2">Contacto</h4>
        <p className="text-xs text-gray-300">📍 Instituto Tecnológico de Hermosillo (ITH)</p>
        <p className="text-xs text-gray-300">✉️ mecacore.ith@gmail.com</p>
      </div>
    </div>
    <div className="bg-blue-900/50 py-3 text-center text-xs text-gray-400 border-t border-blue-900/40">
      © {new Date().getFullYear()} MecaCore CMT — Todos los derechos reservados.
    </div>
  </footer>
);

// --- MODAL DE DIPLOMA / RECONOCIMIENTO IMPRIMIBLE ---
const ModalDiploma = ({ datos, onClose }: { datos: { alumno: any; evento: any }; onClose: () => void }) => {
  const { alumno, evento } = datos;

  const handleImprimir = () => {
    const printContent = document.getElementById('diploma-imprimible');
    if (!printContent) return;
    const ventana = window.open('', '', 'width=900,height=650');
    if (!ventana) return;
    ventana.document.write(`
      <html>
        <head>
          <title>Diploma - ${alumno.nombreAlumno}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @media print {
              @page { size: landscape; margin: 0; }
              body { margin: 1cm; }
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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl">✕</button>
        
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-blue-900">Reconocimiento Oficial</h3>
          <button onClick={handleImprimir} className="bg-blue-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-800 transition flex items-center gap-2 shadow">
            🖨️ Imprimir / Guardar como PDF
          </button>
        </div>

        {/* CONTENIDO DEL DIPLOMA */}
        <div id="diploma-imprimible" className="border-8 border-double border-blue-900 p-8 rounded-xl bg-gradient-to-b from-slate-50 to-amber-50/20 text-center relative shadow-inner">
          <div className="flex justify-between items-center mb-6 border-b-2 border-amber-400 pb-4">
            <div className="text-left">
              <h4 className="font-black text-blue-900 text-xl tracking-wider">MECACORE CMT</h4>
              <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-widest">Comité de Ingeniería Mecatrónica</p>
            </div>
            <div className="text-right">
              <h5 className="font-bold text-gray-700 text-xs">Instituto Tecnológico de Hermosillo</h5>
              <p className="text-[10px] text-gray-500">Hermosillo, Sonora</p>
            </div>
          </div>

          <div className="my-6 space-y-3">
            <p className="text-xs font-bold text-amber-700 uppercase tracking-widest">Otorga el presente</p>
            <h1 className="text-3xl font-extrabold text-blue-950 font-serif tracking-wide">RECONOCIMIENTO</h1>
            <p className="text-xs text-gray-600 italic">A:</p>
            <h2 className="text-2xl font-bold text-blue-900 underline decoration-amber-400 decoration-2 underline-offset-8 capitalize py-2">
              {alumno.nombreAlumno}
            </h2>
            <p className="text-xs text-gray-500">N. Control: <strong className="text-gray-700">{alumno.controlAlumno}</strong></p>
          </div>

          <div className="my-6 max-w-lg mx-auto space-y-2">
            <p className="text-xs text-gray-700 leading-relaxed">
              Por su valiosa participación y asistencia en la actividad de capacitación técnica:
            </p>
            <p className="text-base font-bold text-blue-900 bg-blue-50/80 p-2 rounded-lg border border-blue-100">
              "{evento?.titulo || 'Actividad MecaCore CMT'}"
            </p>
            <p className="text-[11px] text-gray-500">
              Impartido por: <strong className="text-gray-800">{evento?.expositor || 'Comité MecaCore'}</strong> — Fecha: <strong className="text-gray-800">{evento?.fecha || new Date().toLocaleDateString()}</strong>
            </p>
          </div>

          <div className="mt-12 pt-6 grid grid-cols-2 gap-8 max-w-md mx-auto border-t border-gray-300">
            <div>
              <div className="h-10 border-b border-gray-400 mb-1"></div>
              <p className="text-[10px] font-bold text-blue-900 uppercase">Master Admin</p>
              <p className="text-[9px] text-gray-400">Comité MecaCore CMT</p>
            </div>
            <div>
              <div className="h-10 border-b border-gray-400 mb-1"></div>
              <p className="text-[10px] font-bold text-blue-900 uppercase">Coordinación / Staff</p>
              <p className="text-[9px] text-gray-400">{evento?.puestoCreador || 'Coordinador'}</p>
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
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-amber-700 text-white p-8 rounded-2xl shadow-xl text-center">
        <h2 className="text-3xl font-black mb-2">📜 Consulta de Diplomas</h2>
        <p className="text-sm opacity-90">Portal de Reconocimientos del Comité de Ingeniería Mecatrónica (CMT)</p>
      </div>

      <form onSubmit={handleBuscar} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col sm:flex-row gap-3">
        <input
          required
          type="text"
          placeholder="Ingresa tu Número de Control (Ej. 22330701)"
          className="flex-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-medium uppercase text-sm"
          value={controlInput}
          onChange={e => setControlInput(e.target.value)}
        />
        <button disabled={buscando} type="submit" className="bg-blue-900 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-800 transition disabled:opacity-50 text-sm flex-shrink-0">
          {buscando ? 'Buscando...' : '🔍 Buscar Diplomas'}
        </button>
      </form>

      {buscado && (
        <div className="space-y-4">
          {resultados.length === 0 ? (
            <div className="bg-white p-8 text-center rounded-xl border border-gray-100 text-gray-500">
              <p className="text-lg font-bold mb-1">No se encontraron inscripciones 😕</p>
              <p className="text-xs">Verifica tu número de control o consulta con el comité el día del evento.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Eventos registrados para el N. Control: <span className="text-blue-900">{controlInput.toUpperCase()}</span>
              </p>
              {resultados.map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-blue-200 transition">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {item.asistio ? (
                        <span className="text-[10px] font-bold text-green-800 bg-green-100 border border-green-300 px-2 py-0.5 rounded-full uppercase">
                          ✅ Asistencia Confirmada
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full uppercase">
                          ⏳ Pendiente de Registro/Confirmación
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-blue-950">{item.evento?.titulo}</h3>
                    <p className="text-xs text-gray-600">
                      Alumno: <strong className="text-gray-800">{item.alumno?.nombreAlumno}</strong>
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Fecha: {item.evento?.fecha} | Impartido por: {item.evento?.expositor}
                    </p>
                  </div>
                  {item.asistio ? (
                    <button
                      onClick={() => setDiplomaSeleccionado(item)}
                      className="bg-amber-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-amber-700 transition flex items-center gap-1.5 shadow-sm flex-shrink-0"
                    >
                      📜 Ver / Descargar Diploma
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400 italic">El diploma estará disponible al confirmar tu asistencia en el evento.</span>
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
        asistio: false, // Default false hasta que el staff haga checkin
        fechaRegistro: new Date().toISOString()
      });
      setExito(true);
    } catch (err) {
      alert("Error al completar la inscripción. Inténtalo de nuevo.");
    }
    setEnviando(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 font-bold text-xl">✕</button>
        {exito ? (
          <div className="text-center py-6 space-y-4">
            <span className="text-5xl">🎉</span>
            <h3 className="text-2xl font-bold text-green-600">¡Inscripción Exitosa!</h3>
            <p className="text-sm text-gray-600">Te has registrado correctamente en <strong>{evento.titulo}</strong>.</p>
            <button onClick={onClose} className="w-full bg-blue-900 text-white font-bold py-2 rounded-lg hover:bg-blue-800 transition">Cerrar</button>
          </div>
        ) : (
          <form onSubmit={handleInscribir} className="space-y-4">
            <h3 className="text-xl font-bold text-blue-900">Inscripción a Evento</h3>
            <p className="text-sm text-gray-500 mb-2">Evento: <strong>{evento.titulo}</strong></p>
            <input required type="text" placeholder="Nombre completo del alumno" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={alumno.nombre} onChange={e => setAlumno({ ...alumno, nombre: e.target.value })} />
            <input required type="text" placeholder="Número de Control" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={alumno.control} onChange={e => setAlumno({ ...alumno, control: e.target.value })} />
            <input required type="email" placeholder="Correo electrónico" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={alumno.correo} onChange={e => setAlumno({ ...alumno, correo: e.target.value })} />
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={onClose} className="w-1/2 bg-gray-200 text-gray-700 py-2 rounded-lg font-bold hover:bg-gray-300">Cancelar</button>
              <button disabled={enviando} type="submit" className="w-1/2 bg-blue-900 text-white py-2 rounded-lg font-bold hover:bg-blue-800 transition disabled:opacity-50">
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
    <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-10 rounded-2xl shadow-xl text-center relative overflow-hidden">
      <h1 className="text-4xl font-extrabold mb-3">Comité MecaCore CMT</h1>
      <p className="text-lg opacity-90 max-w-2xl mx-auto">Innovación, Tecnología y Desarrollo en Ingeniería Mecatrónica</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Bienvenido a la Plataforma</h2>
        <p className="text-gray-600 leading-relaxed text-sm">
          Consulta y participa en todas las actividades organizadas por el comité. Regístrate a talleres de electrónica, programación y diseño, asiste a conferencias y mantente al día con los eventos culturales.
        </p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Accesos Rápidos</h2>
        <ul className="space-y-3 text-sm">
          <li className="p-3 bg-blue-50 rounded-lg text-blue-900 font-medium flex items-center justify-between">
            <span>✨ Explora las próximas conferencias</span>
            <span className="text-xs bg-blue-200 px-2 py-0.5 rounded font-bold">Ver</span>
          </li>
          <li className="p-3 bg-green-50 rounded-lg text-green-900 font-medium flex items-center justify-between">
            <span>🛠️ Inscríbete a los talleres prácticos</span>
            <span className="text-xs bg-green-200 px-2 py-0.5 rounded font-bold">Ver</span>
          </li>
          <li className="p-3 bg-amber-50 rounded-lg text-amber-900 font-medium flex items-center justify-between">
            <span>📜 Consulta tus Diplomas con tu N. Control</span>
            <span className="text-xs bg-amber-200 px-2 py-0.5 rounded font-bold">Buscar</span>
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
      <h2 className="text-3xl font-bold text-blue-900 border-b pb-2">Social y Cultural</h2>
      {cargando ? <p className="text-gray-500">Cargando publicaciones...</p> : null}
      {!cargando && publicaciones.length === 0 ? <p className="text-gray-500">No hay publicaciones recientes por el momento.</p> : null}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {publicaciones.map((pub) => (
          <div key={pub.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase bg-purple-50 px-2 py-1 rounded">Anuncio</span>
              <h3 className="text-xl font-bold text-gray-800 mt-2 mb-2">{pub.titulo}</h3>
              <p className="text-gray-600 text-sm whitespace-pre-line">{pub.contenido}</p>
            </div>
            <div className="mt-4 pt-4 border-t text-xs text-gray-400 flex justify-between">
              <span>Por: {pub.autor || 'Coordinación'}</span>
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

  const tituloSeccion = categoria === 'talleres' ? 'Talleres Disponibles' : 'Conferencias';

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-blue-900 border-b pb-2">{tituloSeccion}</h2>
      {cargando ? <p className="text-gray-500">Cargando actividades...</p> : null}
      {!cargando && eventos.length === 0 ? <p className="text-gray-500">No hay {categoria} programados por el momento.</p> : null}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventos.map((ev) => (
          <div key={ev.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-blue-600 uppercase bg-blue-50 px-2 py-1 rounded">{ev.categoria}</span>
                <span className="text-xs text-gray-400 font-medium">{ev.fecha} - {ev.hora}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{ev.titulo}</h3>
              <p className="text-xs text-blue-800 font-semibold mb-2">Expositor/Imparte: {ev.expositor}</p>
              <p className="text-gray-600 text-sm mb-4">{ev.descripcion}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-3">Cupo disponible: <strong className="text-gray-800">{ev.cupo} lugares</strong></p>
              <button onClick={() => setEventoSeleccionado(ev)} className="w-full bg-blue-900 text-white font-bold py-2 rounded-lg hover:bg-blue-800 transition text-sm">
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
        permisos: { eventos: false, publicaciones: false, asistencias: true }, // Default sólo asistencias/checkin
        fecha: new Date().toISOString()
      });
      setMensaje('¡Solicitud enviada correctamente! Espera la aprobación del Master Admin.');
      setDatos({ nombre: '', numeroControl: '', puesto: '', correoInst: '', correoPers: '', telefono: '' });
    } catch (error) {
      setMensaje('Error al enviar la solicitud. Verifica la conexión.');
    }
    setEnviando(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100 mt-10 animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-blue-900 mb-2">Solicitar Acceso Colaborador</h2>
      <p className="text-sm text-center text-gray-500 mb-6">Para coordinadores y colaboradores del staff</p>
      {mensaje && <p className="text-green-600 font-medium text-sm mb-4 text-center">{mensaje}</p>}
      <form onSubmit={enviarSolicitud} className="space-y-4">
        <input required type="text" placeholder="Nombre completo" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={datos.nombre} onChange={e => setDatos({...datos, nombre: e.target.value})} />
        <input required type="text" placeholder="Número de Control" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={datos.numeroControl} onChange={e => setDatos({...datos, numeroControl: e.target.value})} />
        <input required type="text" placeholder="Puesto (Ej. Colaborador Logística, Coord. Talleres)" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={datos.puesto} onChange={e => setDatos({...datos, puesto: e.target.value})} />
        <input required type="email" placeholder="Correo Institucional" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={datos.correoInst} onChange={e => setDatos({...datos, correoInst: e.target.value})} />
        <input required type="email" placeholder="Correo Personal" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={datos.correoPers} onChange={e => setDatos({...datos, correoPers: e.target.value})} />
        <input required type="tel" placeholder="Teléfono" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={datos.telefono} onChange={e => setDatos({...datos, telefono: e.target.value})} />
        <button disabled={enviando} type="submit" className="w-full bg-blue-900 text-white font-bold py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-50">
          {enviando ? 'Enviando...' : 'Enviar Solicitud'}
        </button>
        <button type="button" onClick={onVolver} className="w-full text-blue-600 text-sm mt-2 hover:underline">Volver al Login</button>
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
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100 mt-10 animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Acceso Staff y Coordinación</h2>
      {error && <p className="text-red-500 text-sm mb-4 text-center font-medium bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input required type="text" placeholder="Usuario asignado o Correo" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={usuarioInput} onChange={(e) => setUsuarioInput(e.target.value)} />
        <input required type="password" placeholder="Contraseña" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={cargando} type="submit" className="w-full bg-blue-900 text-white font-bold py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-50">
          {cargando ? 'Verificando...' : 'Iniciar Sesión'}
        </button>
      </form>
      <div className="mt-6 text-center border-t pt-4">
        <p className="text-sm text-gray-600 mb-2">¿Nuevo colaborador del comité?</p>
        <button onClick={() => setMostrarSolicitud(true)} className="text-blue-600 text-sm font-bold hover:underline">Solicitar Acceso</button>
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
      alert("¡Evento creado y publicado con éxito!");
      setNuevoEvento({ titulo: '', categoria: 'talleres', expositor: '', fecha: '', hora: '', cupo: '30', descripcion: '' });
      cargarEventos();
    } catch (err) {
      alert("Error al guardar el evento.");
    }
    setGuardandoEvento(false);
  };

  const eliminarEvento = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este evento?")) {
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
    if (confirm("¿Deseas eliminar esta publicación?")) {
      await deleteDoc(doc(db, "publicaciones", id));
      cargarPublicaciones();
    }
  };

  const eliminarAlumnoInscrito = async (idRegistro: string) => {
    if (confirm("¿Estás seguro de eliminar a este alumno del registro?")) {
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
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">¡Bienvenido, {usuario}!</h2>
          <p className="text-sm text-gray-500">Puesto: <span className="font-semibold text-blue-700">{puesto || 'Colaborador Staff'}</span></p>
        </div>
        <button onClick={onLogout} className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition text-sm">
          Cerrar Sesión
        </button>
      </div>

      <div className="flex flex-wrap gap-2 border-b pb-3">
        {userPermisos.asistencias && (
          <button onClick={() => setPestana('asistencias')} className={`px-4 py-2 rounded-lg text-sm font-bold transition ${pestana === 'asistencias' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            📋 Check-in / Pase de Lista
          </button>
        )}
        {userPermisos.eventos && (
          <button onClick={() => setPestana('eventos')} className={`px-4 py-2 rounded-lg text-sm font-bold transition ${pestana === 'eventos' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            📅 Crear Eventos
          </button>
        )}
        {userPermisos.publicaciones && (
          <button onClick={() => setPestana('publicaciones')} className={`px-4 py-2 rounded-lg text-sm font-bold transition ${pestana === 'publicaciones' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            📰 Publicar Anuncios
          </button>
        )}
      </div>

      {/* MÓDULO CHECK-IN Y ASISTENCIAS */}
      {pestana === 'asistencias' && userPermisos.asistencias && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Control de Asistencia y Confirmación</h3>
              <p className="text-xs text-gray-500">Marca los alumnos presentes en el evento para habilitar sus diplomas.</p>
            </div>
            {listaAlumnos.length > 0 && (
              <button onClick={exportarCSV} className="bg-green-700 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-green-800 transition flex items-center gap-1.5 shadow">
                📊 Exportar Lista a Excel
              </button>
            )}
          </div>
          
          {misEventos.length === 0 ? (
            <p className="text-gray-500">Aún no hay eventos registrados.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Selecciona el Evento:</label>
                  <select className="w-full p-2.5 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm" value={eventoSeleccionadoId} onChange={e => setEventoSeleccionadoId(e.target.value)}>
                    {misEventos.map(ev => (
                      <option key={ev.id} value={ev.id}>{ev.titulo} ({ev.categoria})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">🔍 Buscar Alumno en Lista:</label>
                  <input
                    type="text"
                    placeholder="Escribe Nombre o N. Control..."
                    className="w-full p-2.5 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={filtroAlumno}
                    onChange={e => setFiltroAlumno(e.target.value)}
                  />
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden mt-4 shadow-sm">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
                    <tr>
                      <th className="p-3">#</th>
                      <th className="p-3">Nombre del Alumno</th>
                      <th className="p-3">N. Control</th>
                      <th className="p-3">Estado Asistencia</th>
                      <th className="p-3 text-right">Acciones Staff</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {cargandoLista ? (
                      <tr><td colSpan={5} className="p-4 text-center">Cargando lista...</td></tr>
                    ) : alumnosFiltrados.length === 0 ? (
                      <tr><td colSpan={5} className="p-4 text-center text-gray-400">No se encontraron alumnos para esta búsqueda.</td></tr>
                    ) : (
                      alumnosFiltrados.map((al, index) => (
                        <tr key={al.id} className={`hover:bg-gray-50 ${al.asistio ? 'bg-green-50/30' : ''}`}>
                          <td className="p-3 font-bold">{index + 1}</td>
                          <td className="p-3 font-medium text-gray-900">{al.nombreAlumno}</td>
                          <td className="p-3 font-mono text-xs">{al.controlAlumno}</td>
                          <td className="p-3">
                            <button
                              onClick={() => toggleAsistencia(al.id, al.asistio ?? false)}
                              className={`px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                                al.asistio 
                                  ? 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-300' 
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300'
                              }`}
                            >
                              {al.asistio ? '✅ Confirmado' : '⏳ Marcar Asistencia'}
                            </button>
                          </td>
                          <td className="p-3 text-right flex justify-end gap-2">
                            <button onClick={() => setDiplomaSeleccionado({ alumno: al, evento: misEventos.find(e => e.id === eventoSeleccionadoId) })} className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded text-xs font-bold hover:bg-amber-200 transition">
                              📜 Diploma
                            </button>
                            <button onClick={() => eliminarAlumnoInscrito(al.id)} className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold hover:bg-red-200 transition">
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
            <h3 className="text-xl font-bold text-gray-800">Crear Taller o Conferencia</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Título</label>
                <input required type="text" placeholder="Ej. Taller Arduino" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={nuevoEvento.titulo} onChange={e => setNuevoEvento({...nuevoEvento, titulo: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Categoría</label>
                <select className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" value={nuevoEvento.categoria} onChange={e => setNuevoEvento({...nuevoEvento, categoria: e.target.value as any})}>
                  <option value="talleres">Taller</option>
                  <option value="conferencias">Conferencia</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Expositor</label>
                <input required type="text" placeholder="Ponente" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={nuevoEvento.expositor} onChange={e => setNuevoEvento({...nuevoEvento, expositor: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Cupo</label>
                <input required type="number" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={nuevoEvento.cupo} onChange={e => setNuevoEvento({...nuevoEvento, cupo: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Fecha</label>
                <input required type="date" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={nuevoEvento.fecha} onChange={e => setNuevoEvento({...nuevoEvento, fecha: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Hora</label>
                <input required type="text" placeholder="Ej. 11:00 AM" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={nuevoEvento.hora} onChange={e => setNuevoEvento({...nuevoEvento, hora: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Descripción</label>
              <textarea required rows={3} placeholder="Detalles o requisitos..." className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={nuevoEvento.descripcion} onChange={e => setNuevoEvento({...nuevoEvento, descripcion: e.target.value})}></textarea>
            </div>
            <button disabled={guardandoEvento} type="submit" className="w-full bg-blue-900 text-white font-bold py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-50">
              {guardandoEvento ? 'Publicando...' : 'Publicar Evento'}
            </button>
          </form>

          <div className="space-y-3 border-l pl-0 lg:pl-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Eventos Publicados ({misEventos.length})</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {misEventos.map(ev => (
                <div key={ev.id} className="p-3 border rounded-lg bg-gray-50 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-blue-900">{ev.titulo}</span> <span className="text-gray-400">({ev.categoria})</span>
                    <p className="text-gray-500">{ev.fecha} - {ev.hora} | Cupo: {ev.cupo}</p>
                  </div>
                  <button onClick={() => eliminarEvento(ev.id)} className="bg-red-100 text-red-600 px-2.5 py-1 rounded font-bold hover:bg-red-200 transition">
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
            <h3 className="text-xl font-bold text-gray-800">Publicar Anuncio</h3>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Título</label>
              <input required type="text" placeholder="Ej. Torneo Robótica" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={nuevaPub.titulo} onChange={e => setNuevaPub({...nuevaPub, titulo: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Contenido</label>
              <textarea required rows={5} placeholder="Escribe el mensaje..." className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={nuevaPub.contenido} onChange={e => setNuevaPub({...nuevaPub, contenido: e.target.value})}></textarea>
            </div>
            <button disabled={guardandoPub} type="submit" className="w-full bg-blue-900 text-white font-bold py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-50">
              {guardandoPub ? 'Publicando...' : 'Publicar Anuncio'}
            </button>
          </form>

          <div className="space-y-3 border-l pl-0 lg:pl-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Anuncios Activos ({misPublicaciones.length})</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {misPublicaciones.map(pub => (
                <div key={pub.id} className="p-3 border rounded-lg bg-gray-50 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-purple-900">{pub.titulo}</p>
                    <p className="text-gray-500 line-clamp-1">{pub.contenido}</p>
                  </div>
                  <button onClick={() => eliminarPublicacion(pub.id)} className="bg-red-100 text-red-600 px-2.5 py-1 rounded font-bold hover:bg-red-200 transition">
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
    alert("¡Evento publicado por Master Admin!");
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
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 animate-fade-in space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Panel Master MecaCore</h2>
          <p className="text-xs text-gray-500">Administrador General del Comité CMT</p>
        </div>
        <button onClick={onLogout} className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition text-sm">
          Cerrar Sesión
        </button>
      </div>

      <div className="flex flex-wrap gap-2 border-b pb-3">
        <button onClick={() => setPestanaMaster('coordinadores')} className={`px-4 py-2 rounded-lg text-sm font-bold transition ${pestanaMaster === 'coordinadores' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          👥 Cuentas y Permisos Staff
        </button>
        <button onClick={() => setPestanaMaster('asistencias')} className={`px-4 py-2 rounded-lg text-sm font-bold transition ${pestanaMaster === 'asistencias' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          📋 Control de Asistencia y Diplomas
        </button>
        <button onClick={() => setPestanaMaster('eventos')} className={`px-4 py-2 rounded-lg text-sm font-bold transition ${pestanaMaster === 'eventos' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          📅 Gestionar Eventos
        </button>
        <button onClick={() => setPestanaMaster('publicaciones')} className={`px-4 py-2 rounded-lg text-sm font-bold transition ${pestanaMaster === 'publicaciones' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          📰 Gestionar Anuncios
        </button>
      </div>

      {/* TAB 1: COORDINADORES Y PERMISOS DIVERSIFICADOS */}
      {pestanaMaster === 'coordinadores' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-700">Solicitudes y Cuentas del Comité</h3>
          {solicitudes.length === 0 ? <p className="text-gray-500">No hay solicitudes registradas aún.</p> : null}
          {solicitudes.map((sol) => {
            const permisos = sol.permisos || { eventos: false, publicaciones: false, asistencias: true };
            return (
              <div key={sol.id} className="p-5 border rounded-xl bg-gray-50 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-blue-900 text-lg">{sol.nombre}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase ${sol.estado === 'aprobado' ? 'bg-green-100 text-green-800' : sol.estado === 'denegado' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {sol.estado || 'pendiente'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Puesto: <strong>{sol.puesto}</strong> | Control: {sol.numeroControl}</p>
                    <p className="text-xs text-gray-500">Inst: {sol.correoInst} | Pers: {sol.correoPers} | Tel: {sol.telefono}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {sol.estado === 'pendiente' && (
                      <>
                        <button onClick={() => cambiarEstado(sol.id, 'aprobado', sol)} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-700 transition">
                          ✓ Aprobar Acceso
                        </button>
                        <button onClick={() => cambiarEstado(sol.id, 'denegado')} className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 transition">
                          ✕ Denegar
                        </button>
                      </>
                    )}
                    {sol.estado === 'aprobado' && (
                      <button onClick={() => cambiarEstado(sol.id, 'denegado')} className="bg-red-100 text-red-700 border border-red-200 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-200 transition">
                        🚫 Revocar Acceso
                      </button>
                    )}
                    {sol.estado === 'denegado' && (
                      <button onClick={() => cambiarEstado(sol.id, 'aprobado', sol)} className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition">
                        🔄 Reaprobar
                      </button>
                    )}
                    <button onClick={() => eliminarRegistro(sol.id)} className="bg-gray-200 text-gray-700 px-2.5 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-300 transition">
                      🗑️
                    </button>
                  </div>
                </div>

                {sol.estado === 'aprobado' && (
                  <div className="pt-3 border-t grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-3 rounded-lg border">
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase mb-1">Credenciales Generadas:</p>
                      <p className="text-xs text-gray-800"><strong>Usuario:</strong> <code className="bg-gray-100 px-1 py-0.5 rounded text-blue-900">{sol.usuarioGenerado}</code></p>
                      <p className="text-xs text-gray-800"><strong>Contraseña:</strong> <code className="bg-gray-100 px-1 py-0.5 rounded text-blue-900">{sol.passwordGenerada}</code></p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase mb-2">Asignar Permisos del Colaborador:</p>
                      <div className="flex flex-wrap gap-4 text-xs">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input type="checkbox" checked={permisos.asistencias ?? true} onChange={() => togglePermiso(sol.id, 'asistencias', permisos.asistencias ?? true, permisos)} className="rounded text-blue-900 focus:ring-blue-500" />
                          <span>📋 Pase de Lista (Check-in)</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input type="checkbox" checked={permisos.eventos ?? false} onChange={() => togglePermiso(sol.id, 'eventos', permisos.eventos ?? false, permisos)} className="rounded text-blue-900 focus:ring-blue-500" />
                          <span>📅 Crear Eventos</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input type="checkbox" checked={permisos.publicaciones ?? false} onChange={() => togglePermiso(sol.id, 'publicaciones', permisos.publicaciones ?? false, permisos)} className="rounded text-blue-900 focus:ring-blue-500" />
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
              <h3 className="text-xl font-bold text-gray-800">Pase de Lista y Asistencias (Master View)</h3>
              <p className="text-xs text-gray-500">Modo administrador para confirmación inmediata de asistencia.</p>
            </div>
            {listaAlumnos.length > 0 && (
              <button onClick={exportarCSVMaster} className="bg-green-700 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-green-800 transition flex items-center gap-1.5 shadow">
                📊 Exportar Lista a Excel
              </button>
            )}
          </div>
          
          {eventosMaster.length === 0 ? (
            <p className="text-gray-500">Aún no hay eventos registrados.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Selecciona el Evento:</label>
                  <select className="w-full p-2.5 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm" value={eventoSeleccionadoId} onChange={e => setEventoSeleccionadoId(e.target.value)}>
                    {eventosMaster.map(ev => (
                      <option key={ev.id} value={ev.id}>{ev.titulo} ({ev.categoria})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">🔍 Buscar Alumno en Lista:</label>
                  <input
                    type="text"
                    placeholder="Escribe Nombre o N. Control..."
                    className="w-full p-2.5 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={filtroAlumno}
                    onChange={e => setFiltroAlumno(e.target.value)}
                  />
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden mt-4 shadow-sm">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
                    <tr>
                      <th className="p-3">#</th>
                      <th className="p-3">Nombre del Alumno</th>
                      <th className="p-3">N. Control</th>
                      <th className="p-3">Estado Asistencia</th>
                      <th className="p-3 text-right">Acciones Master</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {cargandoLista ? (
                      <tr><td colSpan={5} className="p-4 text-center">Cargando lista...</td></tr>
                    ) : alumnosFiltradosMaster.length === 0 ? (
                      <tr><td colSpan={5} className="p-4 text-center text-gray-400">No hay inscritos que coincidan.</td></tr>
                    ) : (
                      alumnosFiltradosMaster.map((al, index) => (
                        <tr key={al.id} className={`hover:bg-gray-50 ${al.asistio ? 'bg-green-50/30' : ''}`}>
                          <td className="p-3 font-bold">{index + 1}</td>
                          <td className="p-3 font-medium text-gray-900">{al.nombreAlumno}</td>
                          <td className="p-3 font-mono text-xs">{al.controlAlumno}</td>
                          <td className="p-3">
                            <button
                              onClick={() => toggleAsistenciaMaster(al.id, al.asistio ?? false)}
                              className={`px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                                al.asistio 
                                  ? 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-300' 
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300'
                              }`}
                            >
                              {al.asistio ? '✅ Confirmado' : '⏳ Marcar Asistencia'}
                            </button>
                          </td>
                          <td className="p-3 text-right flex justify-end gap-2">
                            <button onClick={() => setDiplomaSeleccionado({ alumno: al, evento: eventosMaster.find(e => e.id === eventoSeleccionadoId) })} className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded text-xs font-bold hover:bg-amber-200 transition">
                              📜 Diploma
                            </button>
                            <button onClick={() => eliminarAlumnoInscritoMaster(al.id)} className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold hover:bg-red-200 transition">
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
            <h3 className="text-xl font-bold text-gray-800">Crear Taller o Conferencia (Modo Master)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Título</label>
                <input required type="text" placeholder="Ej. Taller Robótica" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={nuevoEvento.titulo} onChange={e => setNuevoEvento({...nuevoEvento, titulo: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Categoría</label>
                <select className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" value={nuevoEvento.categoria} onChange={e => setNuevoEvento({...nuevoEvento, categoria: e.target.value as any})}>
                  <option value="talleres">Taller</option>
                  <option value="conferencias">Conferencia</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Expositor</label>
                <input required type="text" placeholder="Ponente" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={nuevoEvento.expositor} onChange={e => setNuevoEvento({...nuevoEvento, expositor: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Cupo</label>
                <input required type="number" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={nuevoEvento.cupo} onChange={e => setNuevoEvento({...nuevoEvento, cupo: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Fecha</label>
                <input required type="date" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={nuevoEvento.fecha} onChange={e => setNuevoEvento({...nuevoEvento, fecha: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Hora</label>
                <input required type="text" placeholder="Ej. 11:00 AM" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={nuevoEvento.hora} onChange={e => setNuevoEvento({...nuevoEvento, hora: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Descripción</label>
              <textarea required rows={3} placeholder="Detalles..." className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={nuevoEvento.descripcion} onChange={e => setNuevoEvento({...nuevoEvento, descripcion: e.target.value})}></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-900 text-white font-bold py-2 rounded-lg hover:bg-blue-800 transition">
              Publicar Evento
            </button>
          </form>

          <div className="space-y-3 border-l pl-0 lg:pl-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Todos los Eventos ({eventosMaster.length})</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {eventosMaster.map(ev => (
                <div key={ev.id} className="p-3 border rounded-lg bg-gray-50 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-blue-900">{ev.titulo}</span> <span className="text-gray-400">({ev.categoria})</span>
                    <p className="text-gray-500">{ev.fecha} - {ev.hora} | Por: {ev.creador}</p>
                  </div>
                  <button onClick={() => eliminarEventoMaster(ev.id)} className="bg-red-100 text-red-600 px-2.5 py-1 rounded font-bold hover:bg-red-200 transition">
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
            <h3 className="text-xl font-bold text-gray-800">Nueva Publicación Cultural</h3>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Título</label>
              <input required type="text" placeholder="Ej. Torneo de Robótica" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={nuevaPub.titulo} onChange={e => setNuevaPub({...nuevaPub, titulo: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Contenido</label>
              <textarea required rows={5} placeholder="Escribe el mensaje..." className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" value={nuevaPub.contenido} onChange={e => setNuevaPub({...nuevaPub, contenido: e.target.value})}></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-900 text-white font-bold py-2 rounded-lg hover:bg-blue-800 transition">
              Publicar Anuncio
            </button>
          </form>

          <div className="space-y-3 border-l pl-0 lg:pl-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Todos los Anuncios ({publicacionesMaster.length})</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {publicacionesMaster.map(pub => (
                <div key={pub.id} className="p-3 border rounded-lg bg-gray-50 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-purple-900">{pub.titulo}</p>
                    <p className="text-gray-500 line-clamp-1">{pub.contenido}</p>
                  </div>
                  <button onClick={() => eliminarPublicacionMaster(pub.id)} className="bg-red-100 text-red-600 px-2.5 py-1 rounded font-bold hover:bg-red-200 transition">
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
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col justify-between">
      <div>
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center py-4 overflow-x-auto">
            <div className="font-black text-xl text-blue-900 cursor-pointer flex-shrink-0 mr-6" onClick={() => setVistaActual('inicio')}>MecaCore CMT</div>
            <div className="flex space-x-1 md:space-x-4 min-w-max">
              <button onClick={() => setVistaActual('inicio')} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${vistaActual === 'inicio' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}>Inicio</button>
              <button onClick={() => setVistaActual('social')} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${vistaActual === 'social' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}>Social y Cultural</button>
              <button onClick={() => setVistaActual('talleres')} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${vistaActual === 'talleres' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}>Talleres</button>
              <button onClick={() => setVistaActual('conferencias')} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${vistaActual === 'conferencias' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}>Conferencias</button>
              <button onClick={() => setVistaActual('diplomas')} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${vistaActual === 'diplomas' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-amber-800 hover:bg-amber-50'}`}>Mis Diplomas 📜</button>
              <button onClick={() => setVistaActual('admin')} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${vistaActual === 'admin' ? 'bg-blue-900 text-white font-bold' : 'text-blue-900 bg-blue-50 hover:bg-blue-100'}`}>
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