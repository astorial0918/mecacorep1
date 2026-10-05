import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';

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

// --- COMPONENTES DE VISTAS ---

const Inicio = () => (
  <div className="space-y-8 animate-fade-in">
    <div className="bg-blue-900 text-white p-10 rounded-2xl shadow-xl text-center">
      <h1 className="text-4xl font-bold mb-4">Comité MecaCore</h1>
      <p className="text-lg opacity-90">Innovación, Tecnología y Desarrollo en Mecatrónica</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Actividades Recientes</h2>
        <ul className="space-y-3">
          <li className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
            <strong>Taller de Soldadura</strong> - 12 de Octubre
          </li>
          <li className="p-3 bg-gray-50 rounded-lg border-l-4 border-green-500">
            <strong>Conferencia de Robótica</strong> - Próximamente
          </li>
        </ul>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Calendario</h2>
        <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg text-gray-500">
          [Vista interactiva del calendario]
        </div>
      </div>
    </div>
  </div>
);

const EnConstruccion = ({ titulo }: { titulo: string }) => (
  <div className="text-center py-20 animate-fade-in">
    <h2 className="text-3xl font-bold text-gray-700 mb-4">{titulo}</h2>
    <p className="text-gray-500">Esta sección está siendo desarrollada por el equipo MecaCore.</p>
  </div>
);

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
        fecha: new Date().toISOString()
      });
      setMensaje('¡Solicitud enviada correctamente! Espera la aprobación del Master Admin.');
      setDatos({ nombre: '', numeroControl: '', puesto: '', correoInst: '', correoPers: '', telefono: '' });
    } catch (error) {
      setMensaje('Error al enviar la solicitud. Verifica las reglas en Firebase.');
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
        <button type="button" onClick={onVolver} className="w-full text-blue-600 text-sm mt-2 hover:underline">
          Volver al Login
        </button>
      </form>
    </div>
  );
};

const LoginAdmin = ({ onLogin }: { onLogin: (estado: boolean) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mostrarSolicitud, setMostrarSolicitud] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'mccore@admin.com' && password === 'MecaCore2004') {
      onLogin(true);
    } else {
      setError('Credenciales incorrectas');
    }
  };

  if (mostrarSolicitud) return <FormularioSolicitud onVolver={() => setMostrarSolicitud(false)} />;

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100 mt-10 animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Acceso MecaCore</h2>
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input required type="email" placeholder="Correo Admin (ej. mccore@admin.com)" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input required type="password" placeholder="Contraseña" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-blue-900 text-white font-bold py-2 rounded-lg hover:bg-blue-800 transition">
          Iniciar Sesión
        </button>
      </form>
      <div className="mt-6 text-center border-t pt-4">
        <p className="text-sm text-gray-600 mb-2">¿Eres nuevo coordinador?</p>
        <button onClick={() => setMostrarSolicitud(true)} className="text-blue-600 text-sm font-bold hover:underline">
          Solicitar Acceso
        </button>
      </div>
    </div>
  );
};

const PanelAdmin = ({ onLogout }: { onLogout: () => void }) => {
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

  const aprobarSolicitud = async (id: string, numeroControl: string, puesto: string) => {
    const letras = 'abcdefghijklmnopqrstuvwxyz';
    const l1 = letras[Math.floor(Math.random() * letras.length)];
    const l2 = letras[Math.floor(Math.random() * letras.length)];
    const pre = puesto.substring(0, 5).toLowerCase();
    
    const usuario = `p#${numeroControl}${l1}${l2}`;
    const password = `${pre}#${numeroControl}${l1}${l2}`;

    await updateDoc(doc(db, "solicitudes_admin", id), {
      estado: 'aprobado',
      usuarioGenerado: usuario,
      passwordGenerada: password
    });
    
    alert(`¡Aprobado con éxito!\n\nDatos de acceso creados:\nUsuario: ${usuario}\nContraseña: ${password}\n\nEntrega estas credenciales al nuevo coordinador.`);
    cargarSolicitudes();
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-900">Panel Master MecaCore</h2>
        <button onClick={onLogout} className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition">Cerrar Sesión</button>
      </div>
      
      <h3 className="text-xl font-bold mb-4 text-gray-700">Solicitudes de Coordinadores</h3>
      <div className="space-y-4">
        {solicitudes.length === 0 ? <p className="text-gray-500">No hay solicitudes registradas aún.</p> : null}
        {solicitudes.map((sol) => (
          <div key={sol.id} className="p-4 border rounded-lg bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="font-bold text-blue-900">{sol.nombre} <span className="text-sm font-normal text-gray-500">({sol.puesto})</span></p>
              <p className="text-sm text-gray-600">Control: {sol.numeroControl} | Institucional: {sol.correoInst}</p>
              <p className="text-xs text-gray-500">Personal: {sol.correoPers} | Tel: {sol.telefono}</p>
              {sol.estado === 'aprobado' && (
                <div className="mt-2 p-2 bg-green-100 border border-green-200 rounded text-xs text-green-800 font-bold">
                  ✓ Aprobado — Usuario: {sol.usuarioGenerado} | Contraseña: {sol.passwordGenerada}
                </div>
              )}
            </div>
            {sol.estado === 'pendiente' && (
              <button onClick={() => aprobarSolicitud(sol.id, sol.numeroControl, sol.puesto)} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition">
                Aprobar y Generar Acceso
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- APLICACIÓN PRINCIPAL ---
export default function App() {
  const [vistaActual, setVistaActual] = useState('inicio');
  const [isAdminLogged, setIsAdminLogged] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center py-4 overflow-x-auto">
          <div className="font-black text-xl text-blue-900 cursor-pointer flex-shrink-0 mr-6" onClick={() => setVistaActual('inicio')}>MecaCore</div>
          <div className="flex space-x-1 md:space-x-4 min-w-max">
            <button onClick={() => setVistaActual('inicio')} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${vistaActual === 'inicio' ? 'bg-blue-50 text-blue-900' : 'text-gray-600 hover:bg-gray-100'}`}>Inicio</button>
            <button onClick={() => setVistaActual('social')} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${vistaActual === 'social' ? 'bg-blue-50 text-blue-900' : 'text-gray-600 hover:bg-gray-100'}`}>Social y Cultural</button>
            <button onClick={() => setVistaActual('talleres')} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${vistaActual === 'talleres' ? 'bg-blue-50 text-blue-900' : 'text-gray-600 hover:bg-gray-100'}`}>Talleres</button>
            <button onClick={() => setVistaActual('conferencias')} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${vistaActual === 'conferencias' ? 'bg-blue-50 text-blue-900' : 'text-gray-600 hover:bg-gray-100'}`}>Conferencias</button>
            <button onClick={() => setVistaActual('admin')} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${vistaActual === 'admin' ? 'bg-blue-900 text-white' : 'text-blue-900 bg-blue-50 hover:bg-blue-100'}`}>
              {isAdminLogged ? 'Panel Master' : 'Admin'}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {vistaActual === 'inicio' && <Inicio />}
        {vistaActual === 'social' && <EnConstruccion titulo="Área Social y Cultural" />}
        {vistaActual === 'talleres' && <EnConstruccion titulo="Talleres" />}
        {vistaActual === 'conferencias' && <EnConstruccion titulo="Conferencias" />}
        {vistaActual === 'admin' && (
          isAdminLogged ? <PanelAdmin onLogout={() => setIsAdminLogged(false)} /> : <LoginAdmin onLogin={setIsAdminLogged} />
        )}
      </main>
    </div>
  );
}