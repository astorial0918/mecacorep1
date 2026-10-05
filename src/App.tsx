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
    <div className="bg-blue-900 text-white p-10 rounded-2xl shadow-xl text-center">
      <h1 className="text-4xl font-bold mb-4">Comité MecaCore</h1>
      <p className="text-lg opacity-90">Innovación, Tecnología y Desarrollo en Mecatrónica</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Bienvenido a la Plataforma</h2>
        <p className="text-gray-600 leading-relaxed">
          Consulta y participa en todas las actividades organizadas por el comité de Mecatrónica. Regístrate a talleres, asiste a conferencias y entérate de las últimas noticias del área social y cultural.
        </p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Accesos Rápidos</h2>
        <ul className="space-y-3">
          <li className="p-3 bg-blue-50 rounded-lg text-blue-900 font-medium">✨ Explora las próximas conferencias</li>
          <li className="p-3 bg-green-50 rounded-lg text-green-900 font-medium">🛠️ Inscríbete a los talleres prácticos</li>
          <li className="p-3 bg-purple-50 rounded-lg text-purple-900 font-medium">📰 Mantente informado en la sección Cultural</li>
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
        permisos: { eventos: true, publicaciones: true, asistencias: true },
        fecha: new Date().toISOString()
      });
      setMensaje('¡Solicitud enviada correctamente! Espera la aprobación del Master Admin.');
      setDatos({ nombre: '', numeroControl: '', puesto: '', correoInst: '', correoPers: '', telefono: '' });
    } catch (error) {
      setMensaje('Error al enviar la solicitud. Verifica la conexión con la base de datos.');
    }
    setEnviando(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100 mt-10 animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-blue-900 mb-2">Solicitar Acceso</h2>
      <p className="text-sm text-center text-gray-500 mb-6">Para nuevos coordinadores y mesa directiva</p>
      {mensaje && <p className="text-green-600 font-medium text-sm mb-4 text-center">{mensaje}</p>}
      <form onSubmit={enviarSolicitud} className="space-y-4">
        <input required type="text" placeholder="Nombre completo" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={datos.nombre} onChange={e => setDatos({...datos, nombre: e.target.value})} />
        <input required type="text" placeholder="Número de Control" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={datos.numeroControl} onChange={e => setDatos({...datos, numeroControl: e.target.value})} />
        <input required type="text" placeholder="Puesto (Ej. Presi, Coordi de Talleres)" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={datos.puesto} onChange={e => setDatos({...datos, puesto: e.target.value})} />
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
          setError('⚠️️ Tu acceso ha sido revocado o denegado por el Master Admin.');
        } else if (data.estado === 'pendiente') {
          setError('⏳ Tu solicitud sigue pendiente de aprobación por el Master Admin.');
        } else {
          onLogin({ 
            isMaster: false, 
            nombre: data.nombre, 
            puesto: data.puesto,
            permisos: data.permisos || { eventos: true, publicaciones: true, asistencias: true }
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
      <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Acceso MecaCore</h2>
      {error && <p className="text-red-500 text-sm mb-4 text-center font-medium bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input required type="text" placeholder="Usuario asignado o Correo" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={usuarioInput} onChange={(e) => setUsuarioInput(e.target.value)} />
        <input required type="password" placeholder="Contraseña" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={cargando} type="submit" className="w-full bg-blue-900 text-white font-bold py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-50">
          {cargando ? 'Verificando...' : 'Iniciar Sesión'}
        </button>
      </form>
      <div className="mt-6 text-center border-t pt-4">
        <p className="text-sm text-gray-600 mb-2">¿Eres nuevo coordinador?</p>
        <button onClick={() => setMostrarSolicitud(true)} className="text-blue-600 text-sm font-bold hover:underline">Solicitar Acceso</button>
      </div>
    </div>
  );
};

// --- PANEL DE CONTROL DEL COORDINADOR ---

const PanelCoordinador = ({ usuario, puesto, permisos, onLogout }: { usuario: string; puesto?: string; permisos?: any; onLogout: () => void }) => {
  const userPermisos = permisos || { eventos: true, publicaciones: true, asistencias: true };
  
  // Seleccionar primera pestaña disponible
  const pestanaInicial = userPermisos.eventos ? 'eventos' : userPermisos.publicaciones ? 'publicaciones' : userPermisos.asistencias ? 'asistencias' : 'ninguna';
  const [pestana, setPestana] = useState<'eventos' | 'publicaciones' | 'asistencias' | 'ninguna'>(pestanaInicial);

  // Form Eventos
  const [nuevoEvento, setNuevoEvento] = useState({ titulo: '', categoria: 'talleres', expositor: '', fecha: '', hora: '', cupo: '30', descripcion: '' });
  const [guardandoEvento, setGuardandoEvento] = useState(false);

  // Form Publicaciones
  const [nuevaPub, setNuevaPub] = useState({ titulo: '', contenido: '' });
  const [guardandoPub, setGuardandoPub] = useState(false);

  // Asistencias
  const [misEventos, setMisEventos] = useState<any[]>([]);
  const [eventoSeleccionadoId, setEventoSeleccionadoId] = useState('');
  const [listaAlumnos, setListaAlumnos] = useState<any[]>([]);
  const [cargandoLista, setCargandoLista] = useState(false);

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

  useEffect(() => {
    if (userPermisos.asistencias) cargarEventos();
  }, [userPermisos.asistencias]);

  useEffect(() => {
    if (!eventoSeleccionadoId) return;
    const cargarAsistentes = async () => {
      setCargandoLista(true);
      try {
        const q = query(collection(db, "registros_eventos"), where("eventoId", "==", eventoSeleccionadoId));
        const snap = await getDocs(q);
        setListaAlumnos(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error(e);
      }
      setCargandoLista(false);
    };
    cargarAsistentes();
  }, [eventoSeleccionadoId]);

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

  const handleCrearPublicacion = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardandoPub(true);
    try {
      await addDoc(collection(db, "publicaciones"), {
        ...nuevaPub,
        autor: usuario,
        fecha: new Date().toISOString()
      });
      alert("¡Anuncio publicado en la sección Social y Cultural!");
      setNuevaPub({ titulo: '', contenido: '' });
    } catch (err) {
      alert("Error al crear la publicación.");
    }
    setGuardandoPub(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">¡Bienvenido, {usuario}!</h2>
          <p className="text-sm text-gray-500">Rol: <span className="font-semibold text-blue-700">{puesto}</span></p>
        </div>
        <button onClick={onLogout} className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition">
          Cerrar Sesión
        </button>
      </div>

      {/* Menú de Sub-secciones según Permisos */}
      <div className="flex flex-wrap gap-2 border-b pb-3">
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
        {userPermisos.asistencias && (
          <button onClick={() => setPestana('asistencias')} className={`px-4 py-2 rounded-lg text-sm font-bold transition ${pestana === 'asistencias' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            📋 Listas y Asistencias
          </button>
        )}
      </div>

      {pestana === 'ninguna' && (
        <div className="text-center py-10 text-gray-500">
          <p className="text-lg font-bold">Sin permisos asignados</p>
          <p className="text-sm">Actualmente no tienes accesos habilitados. Solicítale al Master Admin que active tus permisos.</p>
        </div>
      )}

      {/* MÓDULO 1: CREAR EVENTO */}
      {pestana === 'eventos' && userPermisos.eventos && (
        <form onSubmit={handleCrearEvento} className="space-y-4 max-w-2xl">
          <h3 className="text-xl font-bold text-gray-800">Crear Nuevo Taller o Conferencia</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Título del Evento</label>
              <input required type="text" placeholder="Ej. Taller de Arduino Básico" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={nuevoEvento.titulo} onChange={e => setNuevoEvento({...nuevoEvento, titulo: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Categoría</label>
              <select className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white" value={nuevoEvento.categoria} onChange={e => setNuevoEvento({...nuevoEvento, categoria: e.target.value as any})}>
                <option value="talleres">Taller</option>
                <option value="conferencias">Conferencia</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Expositor / Imparte</label>
              <input required type="text" placeholder="Nombre del ponente" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={nuevoEvento.expositor} onChange={e => setNuevoEvento({...nuevoEvento, expositor: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Cupo Máximo</label>
              <input required type="number" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={nuevoEvento.cupo} onChange={e => setNuevoEvento({...nuevoEvento, cupo: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Fecha</label>
              <input required type="date" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={nuevoEvento.fecha} onChange={e => setNuevoEvento({...nuevoEvento, fecha: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Hora</label>
              <input required type="text" placeholder="Ej. 11:00 AM" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={nuevoEvento.hora} onChange={e => setNuevoEvento({...nuevoEvento, hora: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Descripción corta</label>
            <textarea required rows={3} placeholder="Detalles, requisitos o temario..." className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={nuevoEvento.descripcion} onChange={e => setNuevoEvento({...nuevoEvento, descripcion: e.target.value})}></textarea>
          </div>
          <button disabled={guardandoEvento} type="submit" className="bg-blue-900 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-50">
            {guardandoEvento ? 'Publicando...' : 'Publicar Evento'}
          </button>
        </form>
      )}

      {/* MÓDULO 2: CREAR PUBLICACIÓN */}
      {pestana === 'publicaciones' && userPermisos.publicaciones && (
        <form onSubmit={handleCrearPublicacion} className="space-y-4 max-w-2xl">
          <h3 className="text-xl font-bold text-gray-800">Nueva Publicación Cultural / Anuncio</h3>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Título de la Noticia o Anuncio</label>
            <input required type="text" placeholder="Ej. Convocatoria Torneo de Robótica" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={nuevaPub.titulo} onChange={e => setNuevaPub({...nuevaPub, titulo: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Contenido del Anuncio</label>
            <textarea required rows={5} placeholder="Escribe el mensaje o información detallada..." className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={nuevaPub.contenido} onChange={e => setNuevaPub({...nuevaPub, contenido: e.target.value})}></textarea>
          </div>
          <button disabled={guardandoPub} type="submit" className="bg-blue-900 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-50">
            {guardandoPub ? 'Publicando...' : 'Publicar Anuncio'}
          </button>
        </form>
      )}

      {/* MÓDULO 3: CONSULTAR ASISTENCIAS */}
      {pestana === 'asistencias' && userPermisos.asistencias && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Alumnos Inscritos por Evento</h3>
          {misEventos.length === 0 ? (
            <p className="text-gray-500">Aún no hay eventos registrados.</p>
          ) : (
            <>
              <div className="max-w-md">
                <label className="block text-xs font-bold text-gray-600 mb-1">Selecciona un Evento:</label>
                <select className="w-full p-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 font-medium" value={eventoSeleccionadoId} onChange={e => setEventoSeleccionadoId(e.target.value)}>
                  {misEventos.map(ev => (
                    <option key={ev.id} value={ev.id}>{ev.titulo} ({ev.categoria})</option>
                  ))}
                </select>
              </div>

              <div className="border rounded-lg overflow-hidden mt-4">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
                    <tr>
                      <th className="p-3">#</th>
                      <th className="p-3">Nombre del Alumno</th>
                      <th className="p-3">N. Control</th>
                      <th className="p-3">Correo</th>
                      <th className="p-3">Fecha Inscripción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {cargandoLista ? (
                      <tr><td colSpan={5} className="p-4 text-center">Cargando lista...</td></tr>
                    ) : listaAlumnos.length === 0 ? (
                      <tr><td colSpan={5} className="p-4 text-center text-gray-400">No hay alumnos inscritos en este evento todavía.</td></tr>
                    ) : (
                      listaAlumnos.map((al, index) => (
                        <tr key={al.id} className="hover:bg-gray-50">
                          <td className="p-3 font-bold">{index + 1}</td>
                          <td className="p-3 font-medium text-gray-900">{al.nombreAlumno}</td>
                          <td className="p-3">{al.controlAlumno}</td>
                          <td className="p-3">{al.correoAlumno}</td>
                          <td className="p-3 text-xs text-gray-400">{new Date(al.fechaRegistro).toLocaleDateString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// --- PANEL MASTER ADMIN COMPLETO ---

const PanelMaster = ({ onLogout }: { onLogout: () => void }) => {
  const [solicitudes, setSolicitudes] = useState<any[]>([]);

  const cargarSolicitudes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "solicitudes_admin"));
      setSolicitudes(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error("Error al cargar solicitudes", err);
    }
  };

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const cambiarEstado = async (id: string, nuevoEstado: 'aprobado' | 'denegado', sol?: any) => {
    let updateData: any = { estado: nuevoEstado };

    if (nuevoEstado === 'aprobado' && !sol?.usuarioGenerado) {
      const letras = 'abcdefghijklmnopqrstuvwxyz';
      const l1 = letras[Math.floor(Math.random() * letras.length)];
      const l2 = letras[Math.floor(Math.random() * letras.length)];
      const pre = (sol?.puesto || 'coord').substring(0, 5).toLowerCase().replace(/\s+/g, '');
      
      updateData.usuarioGenerado = `p#${sol?.numeroControl || '0000'}${l1}${l2}`;
      updateData.passwordGenerada = `${pre}#${sol?.numeroControl || '0000'}${l1}${l2}`;
      updateData.permisos = sol?.permisos || { eventos: true, publicaciones: true, asistencias: true };
    }

    await updateDoc(doc(db, "solicitudes_admin", id), updateData);
    cargarSolicitudes();
  };

  const togglePermiso = async (id: string, permisoKey: string, valorActual: boolean, permisosPrevios: any) => {
    const nuevosPermisos = {
      ...(permisosPrevios || { eventos: true, publicaciones: true, asistencias: true }),
      [permisoKey]: !valorActual
    };

    await updateDoc(doc(db, "solicitudes_admin", id), {
      permisos: nuevosPermisos
    });
    cargarSolicitudes();
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Panel Master MecaCore</h2>
          <p className="text-xs text-gray-500">Gestión de Accesos y Permisos para Coordinadores</p>
        </div>
        <button onClick={onLogout} className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition">Cerrar Sesión</button>
      </div>
      
      <h3 className="text-xl font-bold mb-4 text-gray-700">Solicitudes de Coordinadores</h3>
      <div className="space-y-4">
        {solicitudes.length === 0 ? <p className="text-gray-500">No hay solicitudes registradas aún.</p> : null}
        {solicitudes.map((sol) => {
          const permisos = sol.permisos || { eventos: true, publicaciones: true, asistencias: true };
          
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

                {/* BOTONES DE ACCIÓN PRINCIPALES */}
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
                      🔄 Reaprobar Acceso
                    </button>
                  )}
                </div>
              </div>

              {/* CREDENCIALES Y PERMISOS SI ESTÁ APROBADO */}
              {sol.estado === 'aprobado' && (
                <div className="pt-3 border-t grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-3 rounded-lg border">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">Credenciales Generadas:</p>
                    <p className="text-xs text-gray-800"><strong>Usuario:</strong> <code className="bg-gray-100 px-1 py-0.5 rounded text-blue-900">{sol.usuarioGenerado}</code></p>
                    <p className="text-xs text-gray-800"><strong>Contraseña:</strong> <code className="bg-gray-100 px-1 py-0.5 rounded text-blue-900">{sol.passwordGenerada}</code></p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">Permisos Habilitados:</p>
                    <div className="flex flex-wrap gap-4 text-xs">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="checkbox" checked={permisos.eventos ?? true} onChange={() => togglePermiso(sol.id, 'eventos', permisos.eventos ?? true, permisos)} className="rounded text-blue-900 focus:ring-blue-500" />
                        <span>📅 Eventos</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="checkbox" checked={permisos.publicaciones ?? true} onChange={() => togglePermiso(sol.id, 'publicaciones', permisos.publicaciones ?? true, permisos)} className="rounded text-blue-900 focus:ring-blue-500" />
                        <span>📰 Anuncios</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="checkbox" checked={permisos.asistencias ?? true} onChange={() => togglePermiso(sol.id, 'asistencias', permisos.asistencias ?? true, permisos)} className="rounded text-blue-900 focus:ring-blue-500" />
                        <span>📋 Asistencias</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
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
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center py-4 overflow-x-auto">
          <div className="font-black text-xl text-blue-900 cursor-pointer flex-shrink-0 mr-6" onClick={() => setVistaActual('inicio')}>MecaCore</div>
          <div className="flex space-x-1 md:space-x-4 min-w-max">
            <button onClick={() => setVistaActual('inicio')} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${vistaActual === 'inicio' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}>Inicio</button>
            <button onClick={() => setVistaActual('social')} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${vistaActual === 'social' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}>Social y Cultural</button>
            <button onClick={() => setVistaActual('talleres')} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${vistaActual === 'talleres' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}>Talleres</button>
            <button onClick={() => setVistaActual('conferencias')} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${vistaActual === 'conferencias' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}>Conferencias</button>
            <button onClick={() => setVistaActual('admin')} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${vistaActual === 'admin' ? 'bg-blue-900 text-white font-bold' : 'text-blue-900 bg-blue-50 hover:bg-blue-100'}`}>
              {sesion.activa ? (sesion.isMaster ? 'Panel Master' : 'Mi Panel') : 'Acceso'}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {vistaActual === 'inicio' && <Inicio />}
        {vistaActual === 'social' && <VistaPublicaciones />}
        {vistaActual === 'talleres' && <VistaEventosPublicos categoria="talleres" />}
        {vistaActual === 'conferencias' && <VistaEventosPublicos categoria="conferencias" />}
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
  );
}