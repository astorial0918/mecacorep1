import React, { useState } from 'react';

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
          [Vista interactiva del calendario en desarrollo]
        </div>
      </div>
    </div>
  </div>
);

const EnConstruccion = ({ titulo }) => (
  <div className="text-center py-20 animate-fade-in">
    <h2 className="text-3xl font-bold text-gray-700 mb-4">{titulo}</h2>
    <p className="text-gray-500">Esta sección está siendo desarrollada por el equipo MecaCore.</p>
  </div>
);

const LoginAdmin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'mccore@admin.com' && password === 'MecaCore2004') {
      onLogin(true);
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100 mt-10 animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Acceso MecaCore</h2>
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Correo Institucional / Admin</label>
          <input 
            type="email" 
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input 
            type="password" 
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-blue-900 text-white font-bold py-2 rounded-lg hover:bg-blue-800 transition">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

const PanelAdmin = ({ onLogout }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 animate-fade-in">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-blue-900">Panel de Control MecaCore</h2>
      <button onClick={onLogout} className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition">
        Cerrar Sesión
      </button>
    </div>
    <p className="text-gray-600 mb-6">Bienvenido, Master Admin. Aquí podrás gestionar solicitudes y publicaciones pronto.</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 font-medium text-blue-800 cursor-not-allowed opacity-70">
        Gestionar Solicitudes (Próximamente)
      </div>
      <div className="p-4 bg-green-50 rounded-lg border border-green-100 font-medium text-green-800 cursor-not-allowed opacity-70">
        Nueva Publicación (Próximamente)
      </div>
      <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 font-medium text-purple-800 cursor-not-allowed opacity-70">
        Ver Registros (Próximamente)
      </div>
    </div>
  </div>
);

// --- APLICACIÓN PRINCIPAL ---

export default function App() {
  const [vistaActual, setVistaActual] = useState('inicio');
  const [isAdminLogged, setIsAdminLogged] = useState(false);

  const navegar = (vista) => setVistaActual(vista);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Navegación */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4 overflow-x-auto">
            <div className="font-black text-xl text-blue-900 cursor-pointer flex-shrink-0 mr-6" onClick={() => navegar('inicio')}>
              MecaCore
            </div>
            <div className="flex space-x-1 md:space-x-4 min-w-max">
              <button onClick={() => navegar('inicio')} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${vistaActual === 'inicio' ? 'bg-blue-50 text-blue-900' : 'text-gray-600 hover:bg-gray-100'}`}>Inicio</button>
              <button onClick={() => navegar('social')} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${vistaActual === 'social' ? 'bg-blue-50 text-blue-900' : 'text-gray-600 hover:bg-gray-100'}`}>Social y Cultural</button>
              <button onClick={() => navegar('talleres')} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${vistaActual === 'talleres' ? 'bg-blue-50 text-blue-900' : 'text-gray-600 hover:bg-gray-100'}`}>Talleres</button>
              <button onClick={() => navegar('conferencias')} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${vistaActual === 'conferencias' ? 'bg-blue-50 text-blue-900' : 'text-gray-600 hover:bg-gray-100'}`}>Conferencias</button>
              <button onClick={() => navegar('admin')} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${vistaActual === 'admin' ? 'bg-blue-900 text-white' : 'text-blue-900 bg-blue-50 hover:bg-blue-100'}`}>
                {isAdminLogged ? 'Panel' : 'Admin'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
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