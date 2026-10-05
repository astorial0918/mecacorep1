import React, { useState } from 'react';
import { 
  Cog, 
  Menu, 
  X, 
  ShieldCheck, 
  BookOpen, 
  Calendar, 
  Award, 
  Users, 
  MapPin, 
  Mail, 
  ChevronRight, 
  Lock,
  User,
  Search,
  Sparkles,
  Plus,
  Trash2,
  LogOut
} from 'lucide-react';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Inicio');

  // ESTADO DE AUTENTICACIÓN ADMIN
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // ESTADO DINÁMICO DE TALLERES
  const [talleres, setTalleres] = useState([
    {
      id: 1,
      titulo: 'Programación de PLC Siemens S7-1200',
      descripcion: 'Curso intensivo de automatización industrial, lógica de escalones (Ladder) e integración de sensores.',
      lugar: 'Lab de Robótica ITH',
      horarios: 'Sábados 9:00 AM',
      estado: 'Inscripciones Abiertas',
      colorEstado: 'cyan'
    },
    {
      id: 2,
      titulo: 'Diseño y Modelado 3D en SolidWorks',
      descripcion: 'Fundamentos de ensamble mecánico, tolerancias y preparación de piezas para impresión 3D.',
      lugar: 'Centro de Cómputo ITH',
      horarios: 'Viernes 4:00 PM',
      estado: 'Cupo Limitado',
      colorEstado: 'blue'
    }
  ]);

  // FORMULARIO NUEVO TALLER
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevaDesc, setNuevaDesc] = useState('');
  const [nuevoLugar, setNuevoLugar] = useState('');
  const [nuevoHorario, setNuevoHorario] = useState('');
  const [nuevoEstado, setNuevoEstado] = useState('Inscripciones Abiertas');

  const navItems = [
    { name: 'Inicio', icon: BookOpen },
    { name: 'Talleres', icon: Calendar },
    { name: 'Conferencias', icon: Users },
    { name: 'Social/Cultural', icon: Users },
    { name: 'Diplomas', icon: Award },
  ];

  // MANEJADORES DE ACCIONES ADMIN
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() === 'admin@ith.edu.mx' && passInput.trim() === 'admin2026') {
      setIsAdminLoggedIn(true);
      setLoginError('');
      setUserInput('');
      setPassInput('');
    } else {
      setLoginError('Credenciales incorrectas. Verifica tu usuario o contraseña.');
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
  };

  const handleEliminarTaller = (id: number) => {
    setTalleres(talleres.filter((taller) => taller.id !== id));
  };

  const handleAgregarTaller = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoTitulo || !nuevaDesc) return;

    const nuevoItem = {
      id: Date.now(),
      titulo: nuevoTitulo,
      descripcion: nuevaDesc,
      lugar: nuevoLugar || 'Instalaciones ITH',
      horarios: nuevoHorario || 'Por confirmar',
      estado: nuevoEstado,
      colorEstado: nuevoEstado === 'Cupo Limitado' ? 'blue' : 'cyan'
    };

    setTalleres([...talleres, nuevoItem]);
    setNuevoTitulo('');
    setNuevaDesc('');
    setNuevoLugar('');
    setNuevoHorario('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* NAVEGACIÓN PRINCIPAL */}
      <header className="bg-slate-900/90 border-b border-slate-800/80 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* BRANDING / LOGO (Tuerca / Engranaje) */}
            <div 
              className="flex items-center gap-3 cursor-pointer select-none" 
              onClick={() => setActiveTab('Inicio')}
            >
              <div className="p-2 bg-slate-800/80 rounded-xl border border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/10 hover:border-cyan-400 transition">
                <Cog className="w-6 h-6 sm:w-7 sm:h-7 animate-[spin_10s_linear_infinite]" />
              </div>
              <div>
                <h1 className="font-bold text-base sm:text-lg lg:text-xl tracking-wider text-white flex items-center gap-2">
                  COMITÉ DE MECATRÓNICA
                </h1>
                <p className="text-[10px] sm:text-xs text-cyan-400/80 font-mono tracking-widest uppercase">
                  ITH — Hermosillo
                </p>
              </div>
            </div>

            {/* NAV DE ESCRITORIO */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`px-3.5 py-2 text-xs xl:text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === item.name
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* BOTÓN ACCESO STAFF */}
            <div className="hidden md:flex items-center gap-3">
              <button 
                onClick={() => setActiveTab('Acceso Staff')}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all shadow-lg active:scale-95 flex items-center gap-2 ${
                  activeTab === 'Acceso Staff'
                    ? 'bg-cyan-400 text-slate-950 shadow-cyan-500/30'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/20'
                }`}
              >
                {isAdminLoggedIn && <span className="w-2 h-2 rounded-full bg-emerald-950 animate-pulse"></span>}
                Acceso Staff
              </button>
            </div>

            {/* BOTÓN MENÚ MÓVIL */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white focus:outline-none"
                aria-label="Abrir menú"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* MENÚ DESPLEGABLE MÓVIL */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-800 bg-slate-900/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveTab(item.name);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition ${
                    activeTab === item.name
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                      : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              );
            })}
            
            <div className="pt-3 border-t border-slate-800">
              <button 
                onClick={() => {
                  setActiveTab('Acceso Staff');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-cyan-500 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-cyan-500/20"
              >
                Acceso Staff
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ÁREA DE CONTENIDO */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-grow space-y-8 sm:space-y-12">
        
        {/* BANNER ENCABEZADO */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Plataforma Oficial de Gestión
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ingeniería <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Mecatrónica</span> ITH
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              {activeTab === 'Inicio' && "Portal integrado para talleres, conferencias, emisión de diplomas y gestión de la comunidad mecatrónica del Instituto Tecnológico de Hermosillo."}
              {activeTab === 'Talleres' && "Explora la oferta de capacitaciones, cursos prácticos de robótica, automatización e impresión 3D."}
              {activeTab === 'Conferencias' && "Ciclos de ponencias, seminarios técnicos y charlas con expertos de la industria mecatrónica."}
              {activeTab === 'Social/Cultural' && "Eventos de integración, torneos de robótica, convivencias y actividades culturales."}
              {activeTab === 'Diplomas' && "Módulo de consulta y validación oficial de constancias y certificados emitidos por el Comité."}
              {activeTab === 'Acceso Staff' && "Portal exclusivo de inicio de sesión y gestión administrativa para miembros autorizados del Staff."}
            </p>
          </div>
        </div>

        {/* 1. VISTA: INICIO */}
        {activeTab === 'Inicio' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                onClick={() => setActiveTab('Talleres')} 
                className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">Talleres de Formación</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  Actualmente hay {talleres.length} taller(es) disponible(s).
                </p>
                <span className="text-xs text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Ver talleres disponibles <ChevronRight className="w-4 h-4" />
                </span>
              </div>

              <div 
                onClick={() => setActiveTab('Conferencias')} 
                className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/40 transition cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">Conferencias Técnicas</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  Conéctate con egresados e ingenieros del sector industrial, automotriz y aeroespacial.
                </p>
                <span className="text-xs text-blue-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Ver ponencias <ChevronRight className="w-4 h-4" />
                </span>
              </div>

              <div 
                onClick={() => setActiveTab('Diplomas')} 
                className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition cursor-pointer group md:col-span-2 lg:col-span-1"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">Diplomas Digitales</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  Verificación en línea de constancias otorgadas por asistencia a simposios y talleres.
                </p>
                <span className="text-xs text-purple-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Consultar constancia <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* UBICACIÓN Y CONTACTO ITH */}
            <div className="bg-slate-900/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase">
                Contacto Directivo — ITH
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 text-slate-300 text-xs sm:text-sm">
                  <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Instituto Tecnológico de Hermosillo (ITH) — Av. Tecnológico #2, Col. San Benito, Hermosillo, Sonora.</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-xs sm:text-sm">
                  <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span className="font-mono text-cyan-300">comite.mecatronica.ith@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. VISTA: TALLERES (LECTURA DINÁMICA DE ESTADO) */}
        {activeTab === 'Talleres' && (
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-6 h-6 text-cyan-400" /> Cursos y Prácticas Mecatrónicas
            </h3>

            {talleres.length === 0 ? (
              <div className="bg-slate-900/50 p-12 rounded-2xl border border-slate-800 text-center space-y-3">
                <p className="text-slate-400 text-sm">No hay talleres publicados por el momento.</p>
                <p className="text-xs text-slate-600">Puedes publicar nuevos talleres desde el panel de Acceso Staff.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {talleres.map((taller) => (
                  <div key={taller.id} className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-mono border uppercase ${
                        taller.colorEstado === 'blue' 
                          ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
                          : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                      }`}>
                        {taller.estado}
                      </span>
                      <h4 className="text-lg font-bold text-white">{taller.titulo}</h4>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {taller.descripcion}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-500 font-mono">
                      Lugar: {taller.lugar} | Horarios: {taller.horarios}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. VISTA: CONFERENCIAS */}
        {activeTab === 'Conferencias' && (
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-cyan-400" /> Ciclo de Ponencias y Seminarios
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-lg font-bold text-white">Robótica Móvil e Inteligencia Artificial</h4>
                <p className="text-xs sm:text-sm text-slate-400">
                  Ponencia magna sobre navegación autónoma, algoritmos SLAM y visión por computadora aplicada a la industria.
                </p>
                <div className="pt-2 text-xs text-slate-500 font-mono">
                  Lugar: Auditorio Principal ITH
                </div>
              </div>
              <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-lg font-bold text-white">Industria 4.0 e Internet de las Cosas (IoT)</h4>
                <p className="text-xs sm:text-sm text-slate-400">
                  Integración de sistemas embebidos con plataformas en la nube para monitoreo en tiempo real.
                </p>
                <div className="pt-2 text-xs text-slate-500 font-mono">
                  Lugar: Sala Audiovisual ITH
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. VISTA: SOCIAL / CULTURAL */}
        {activeTab === 'Social/Cultural' && (
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-cyan-400" /> Eventos Sociales y Torneos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-lg font-bold text-white">Torneo Anual de Robótica ITH</h4>
                <p className="text-xs sm:text-sm text-slate-400">
                  Competencia interna de robots sumo, seguidores de línea y laberinto.
                </p>
              </div>
              <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-lg font-bold text-white">Convivencia Mecatrónica</h4>
                <p className="text-xs sm:text-sm text-slate-400">
                  Evento de bienvenida para estudiantes de nuevo ingreso y docentes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 5. VISTA: DIPLOMAS */}
        {activeTab === 'Diplomas' && (
          <div className="max-w-2xl mx-auto bg-slate-900/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
            <div className="text-center space-y-2">
              <Award className="w-10 h-10 text-cyan-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Validación Oficial de Certificados</h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Consulta la autenticidad de tu folio o número de control.
              </p>
            </div>
            
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input 
                  type="text" 
                  placeholder="Ej: MEC-2026-9812" 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-600 font-mono"
                />
              </div>
              <button className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-cyan-500/20">
                Buscar
              </button>
            </div>
          </div>
        )}

        {/* 6. VISTA: ACCESO STAFF (FORMULARIO O PANEL DE GESTIÓN) */}
        {activeTab === 'Acceso Staff' && (
          <div>
            {!isAdminLoggedIn ? (
              /* FORMULARIO DE LOGIN */
              <div className="max-w-md mx-auto bg-slate-900/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Lock className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-xl font-bold text-white">Acceso Administrativo</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Ingresa con las credenciales de Staff.
                  </p>
                </div>

                {loginError && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs">
                    {loginError}
                  </div>
                )}

                <form className="space-y-4" onSubmit={handleLogin}>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                      Usuario o Correo
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <input 
                        type="text" 
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="admin@ith.edu.mx" 
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition text-white placeholder-slate-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                      Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <input 
                        type="password" 
                        value={passInput}
                        onChange={(e) => setPassInput(e.target.value)}
                        placeholder="••••••••" 
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition text-white placeholder-slate-600"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 text-sm active:scale-[0.99]"
                  >
                    Iniciar Sesión
                  </button>
                </form>

                <div className="pt-5 border-t border-slate-800/80 text-center space-y-3">
                  <p className="text-xs text-slate-400">
                    ¿Eres miembro del equipo y aún no posees credenciales?
                  </p>
                  <button className="w-full py-2.5 px-4 bg-slate-800/70 hover:bg-slate-800 text-cyan-400 font-semibold rounded-xl border border-cyan-500/30 hover:border-cyan-400/60 transition-all text-xs sm:text-sm">
                    Solicitar Acceso Staff
                  </button>
                </div>
              </div>
            ) : (
              /* PANEL DE ADMINISTRACIÓN ACTIVO */
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/90 p-6 rounded-2xl border border-cyan-500/30">
                  <div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-xl font-bold text-white">Panel de Administración</h3>
                    </div>
                    <p className="text-xs text-slate-400">Sesión iniciada como Staff Activo</p>
                  </div>

                  <button 
                    onClick={handleLogout}
                    className="px-4 py-2 bg-slate-800 hover:bg-rose-950/50 hover:text-rose-400 border border-slate-700 hover:border-rose-500/30 text-slate-300 font-semibold text-xs rounded-xl transition flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar Sesión
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* FORMULARIO AGREGAR TALLER */}
                  <div className="lg:col-span-5 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <h4 className="font-bold text-white text-base flex items-center gap-2">
                      <Plus className="w-4 h-4 text-cyan-400" /> Agregar Nuevo Taller
                    </h4>

                    <form onSubmit={handleAgregarTaller} className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Título del Taller</label>
                        <input 
                          type="text" 
                          value={nuevoTitulo}
                          onChange={(e) => setNuevoTitulo(e.target.value)}
                          placeholder="Ej: Impresión 3D Avanzada"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Descripción</label>
                        <textarea 
                          value={nuevaDesc}
                          onChange={(e) => setNuevaDesc(e.target.value)}
                          placeholder="Resumen del contenido práctico..."
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400 h-20 resize-none"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Lugar</label>
                          <input 
                            type="text" 
                            value={nuevoLugar}
                            onChange={(e) => setNuevoLugar(e.target.value)}
                            placeholder="Lab Robótica"
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Horario</label>
                          <input 
                            type="text" 
                            value={nuevoHorario}
                            onChange={(e) => setNuevoHorario(e.target.value)}
                            placeholder="Sábados 10 AM"
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Estado</label>
                        <select 
                          value={nuevoEstado}
                          onChange={(e) => setNuevoEstado(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                        >
                          <option value="Inscripciones Abiertas">Inscripciones Abiertas</option>
                          <option value="Cupo Limitado">Cupo Limitado</option>
                        </select>
                      </div>

                      <button 
                        type="submit"
                        className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition shadow-lg shadow-cyan-500/20"
                      >
                        Publicar Taller
                      </button>
                    </form>
                  </div>

                  {/* LISTA Y BORRADO DE TALLERES */}
                  <div className="lg:col-span-7 space-y-4">
                    <h4 className="font-bold text-white text-base">Talleres Publicados ({talleres.length})</h4>

                    {talleres.length === 0 ? (
                      <p className="text-xs text-slate-500">No hay talleres cargados actualmente.</p>
                    ) : (
                      <div className="space-y-3">
                        {talleres.map((taller) => (
                          <div key={taller.id} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                            <div>
                              <h5 className="text-sm font-bold text-white">{taller.titulo}</h5>
                              <p className="text-xs text-slate-400 line-clamp-1">{taller.descripcion}</p>
                              <span className="text-[10px] text-cyan-400 font-mono">{taller.estado}</span>
                            </div>

                            <button 
                              onClick={() => handleEliminarTaller(taller.id)}
                              className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/30 transition shrink-0"
                              title="Eliminar Taller"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* PIE DE PÁGINA */}
      <footer className="bg-slate-900/80 border-t border-slate-800 py-6 text-center text-xs text-slate-500 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Cog className="w-4 h-4 text-cyan-400" />
            <span className="font-medium text-slate-400">Comité de Ingeniería Mecatrónica</span>
          </div>
          <p>© {new Date().getFullYear()} ITH — Todos los derechos reservados.</p>
        </div>
      </footer>

    </div>
  );
}