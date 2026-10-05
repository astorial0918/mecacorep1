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
  LogOut,
  CheckCircle,
  QrCode,
  FileText,
  Settings,
  UserCheck,
  BarChart3,
  Clock,
  Shield,
  Briefcase,
  AlertCircle
} from 'lucide-react';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Inicio');

  // ESTADOS DE AUTENTICACIÓN Y ROLES
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'Admin' | 'Coordinador' | 'Staff'>('Admin');
  const [userInput, setUserInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // PESTAÑA INTERNA DEL PANEL ADMIN
  const [adminSubTab, setAdminSubTab] = useState<'resumen' | 'talleres' | 'diplomas' | 'asistencia' | 'equipo'>('resumen');

  // BASE DE DATOS DINÁMICA (STATE)
  const [talleres, setTalleres] = useState([
    {
      id: 1,
      titulo: 'Programación de PLC Siemens S7-1200',
      instructor: 'Ing. Carlos Peralta',
      descripcion: 'Curso intensivo de automatización industrial, lógica de escalones (Ladder) e integración de sensores.',
      lugar: 'Lab de Robótica ITH',
      horarios: 'Sábados 9:00 AM',
      cupoMax: 25,
      inscritos: 18,
      estado: 'Inscripciones Abiertas'
    },
    {
      id: 2,
      titulo: 'Diseño y Modelado 3D en SolidWorks',
      instructor: 'Dra. Elena Rostova',
      descripcion: 'Fundamentos de ensamble mecánico, tolerancias y preparación de piezas para impresión 3D.',
      lugar: 'Centro de Cómputo ITH',
      horarios: 'Viernes 4:00 PM',
      cupoMax: 20,
      inscritos: 20,
      estado: 'Cupo Lleno'
    }
  ]);

  const [diplomas, setDiplomas] = useState([
    { folio: 'MEC-2026-001', alumno: 'Juan Pablo Martínez', evento: 'Taller PLC Siemens', fecha: '12 Feb 2026', estado: 'Válido' },
    { folio: 'MEC-2026-002', alumno: 'María Fernanda Gómez', evento: 'Simposio Mecatrónico 2026', fecha: '28 Mar 2026', estado: 'Válido' }
  ]);

  const [asistencia, setAsistencia] = useState([
    { id: 101, numControl: '21330101', nombre: 'Alejandro Ruiz', taller: 'PLC Siemens', asistio: true },
    { id: 102, numControl: '21330105', nombre: 'Sofia Castro', taller: 'SolidWorks', asistio: false },
    { id: 103, numControl: '21330112', nombre: 'Diego Mendoza', taller: 'PLC Siemens', asistio: true }
  ]);

  const [equipoStaff, setEquipoStaff] = useState([
    { id: 1, nombre: 'Ana Valenzuela', rol: 'Presidenta del Comité', correo: 'ana.valenzuela@ith.edu.mx' },
    { id: 2, nombre: 'Roberto Gómez', rol: 'Coordinador de Logística', correo: 'roberto.gomez@ith.edu.mx' },
    { id: 3, nombre: 'Carlos Vega', rol: 'Staff de Apoyo', correo: 'carlos.vega@ith.edu.mx' }
  ]);

  // BÚSQUEDA DE DIPLOMAS PÚBLICA
  const [searchFolio, setSearchFolio] = useState('');
  const [foundDiploma, setFoundDiploma] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // FORMULARIOS DE CREACIÓN (MESA DIRECTIVA)
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevoInstructor, setNuevoInstructor] = useState('');
  const [nuevaDesc, setNuevaDesc] = useState('');
  const [nuevoLugar, setNuevoLugar] = useState('');
  const [nuevoHorario, setNuevoHorario] = useState('');
  const [nuevoCupo, setNuevoCupo] = useState('25');

  // FORMULARIO EMISIÓN DIPLOMAS
  const [nuevoFolio, setNuevoFolio] = useState('');
  const [nuevoAlumno, setNuevoAlumno] = useState('');
  const [nuevoEventoDip, setNuevoEventoDip] = useState('');

  const navItems = [
    { name: 'Inicio', icon: BookOpen },
    { name: 'Talleres', icon: Calendar },
    { name: 'Conferencias', icon: Users },
    { name: 'Social/Cultural', icon: Users },
    { name: 'Diplomas', icon: Award },
  ];

  // MANEJADORES
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() === 'admin@ith.edu.mx' && passInput.trim() === 'admin2026') {
      setIsAdminLoggedIn(true);
      setLoginError('');
      setUserInput('');
      setPassInput('');
    } else {
      setLoginError('Credenciales incorrectas. (Usa admin@ith.edu.mx / admin2026)');
    }
  };

  const handleSearchDiploma = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const result = diplomas.find(d => d.folio.toLowerCase() === searchFolio.trim().toLowerCase());
    setFoundDiploma(result || null);
  };

  const handleAgregarTaller = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoTitulo || !nuevaDesc) return;

    const item = {
      id: Date.now(),
      titulo: nuevoTitulo,
      instructor: nuevoInstructor || 'Coordinación ITH',
      descripcion: nuevaDesc,
      lugar: nuevoLugar || 'Laboratorio Mecatrónica',
      horarios: nuevoHorario || 'Por definir',
      cupoMax: parseInt(nuevoCupo) || 20,
      inscritos: 0,
      estado: 'Inscripciones Abiertas'
    };

    setTalleres([...talleres, item]);
    setNuevoTitulo('');
    setNuevoInstructor('');
    setNuevaDesc('');
    setNuevoLugar('');
    setNuevoHorario('');
  };

  const handleEliminarTaller = (id: number) => {
    setTalleres(talleres.filter(t => t.id !== id));
  };

  const handleEmitirDiploma = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoFolio || !nuevoAlumno || !nuevoEventoDip) return;

    const item = {
      folio: nuevoFolio,
      alumno: nuevoAlumno,
      evento: nuevoEventoDip,
      fecha: new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }),
      estado: 'Válido'
    };

    setDiplomas([item, ...diplomas]);
    setNuevoFolio('');
    setNuevoAlumno('');
    setNuevoEventoDip('');
  };

  const toggleAsistencia = (id: number) => {
    setAsistencia(asistencia.map(item => item.id === id ? { ...item, asistio: !item.asistio } : item));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* NAVEGACIÓN PRINCIPAL */}
      <header className="bg-slate-900/90 border-b border-slate-800/80 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* LOGO */}
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

            {/* NAV ESCRITORIO */}
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
                {isAdminLoggedIn ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>Panel Staff ({userRole})</span>
                  </>
                ) : (
                  <span>Acceso Staff</span>
                )}
              </button>
            </div>

            {/* MENÚ MÓVIL */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
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
                className="w-full py-3 bg-cyan-500 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-cyan-500/20"
              >
                {isAdminLoggedIn ? `Panel Staff (${userRole})` : 'Acceso Staff'}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ÁREA PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-grow space-y-8 sm:space-y-12">
        
        {/* ENCABEZADO SUPERIOR */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Plataforma Integrada de Gestión
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ingeniería <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Mecatrónica</span> ITH
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              {activeTab === 'Inicio' && "Portal del Comité Estudiantil de Ingeniería Mecatrónica del Instituto Tecnológico de Hermosillo."}
              {activeTab === 'Talleres' && "Oferta de talleres técnicos, capacitaciones en robótica, impresión 3D y automatización."}
              {activeTab === 'Conferencias' && "Simposios, ponencias magistrales y charlas especializadas con líderes del sector industrial."}
              {activeTab === 'Social/Cultural' && "Eventos de integración, torneos internos de robótica y actividades culturales."}
              {activeTab === 'Diplomas' && "Módulo oficial de consulta y autenticación de certificados y folios expedidos."}
              {activeTab === 'Acceso Staff' && "Sistema de gestión integral para Administradores, Mesa Directiva y Staff Logístico."}
            </p>
          </div>
        </div>

        {/* 1. VISTA: INICIO */}
        {activeTab === 'Inicio' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div 
                onClick={() => setActiveTab('Talleres')} 
                className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">Talleres de Formación</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  Actualmente hay {talleres.length} taller(es) activo(s) con cupos disponibles.
                </p>
                <span className="text-xs text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explorar capacitaciones <ChevronRight className="w-4 h-4" />
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
                  Aprende de ponentes nacionales e internacionales sobre Inteligencia Artificial e Industria 4.0.
                </p>
                <span className="text-xs text-blue-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Ver ciclo de ponencias <ChevronRight className="w-4 h-4" />
                </span>
              </div>

              <div 
                onClick={() => setActiveTab('Diplomas')} 
                className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 hover:border-purple-500/40 transition cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">Validación de Diplomas</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  Verifica tu folio de constancia o descarga tu certificado emitido por el comité.
                </p>
                <span className="text-xs text-purple-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Verificar constancia <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* CONTACTO */}
            <div className="bg-slate-900/80 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase">
                Ubicación y Contacto Directivo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Instituto Tecnológico de Hermosillo (ITH) — Av. Tecnológico #2, Col. San Benito, Hermosillo, Sonora.</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span className="font-mono text-cyan-300">comite.mecatronica.ith@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. VISTA: TALLERES */}
        {activeTab === 'Talleres' && (
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-6 h-6 text-cyan-400" /> Cursos y Prácticas Mecatrónicas
            </h3>

            {talleres.length === 0 ? (
              <div className="bg-slate-900/50 p-12 rounded-2xl border border-slate-800 text-center space-y-2">
                <p className="text-slate-400 text-sm">No hay talleres publicados por el momento.</p>
                <p className="text-xs text-slate-600">La Mesa Directiva agregará nuevos talleres próximamente.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {talleres.map((taller) => (
                  <div key={taller.id} className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 uppercase">
                          {taller.estado}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">
                          Inscritos: {taller.inscritos}/{taller.cupoMax}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-white">{taller.titulo}</h4>
                      <p className="text-xs text-cyan-300 font-medium">Instructor: {taller.instructor}</p>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {taller.descripcion}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 text-xs text-slate-500 font-mono">
                      📍 {taller.lugar} | ⏰ {taller.horarios}
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
                <div className="pt-2 text-xs text-slate-500 font-mono">Lugar: Auditorio Principal ITH</div>
              </div>
              <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-lg font-bold text-white">Industria 4.0 e Internet de las Cosas (IoT)</h4>
                <p className="text-xs sm:text-sm text-slate-400">
                  Integración de sistemas embebidos con plataformas en la nube para monitoreo en tiempo real.
                </p>
                <div className="pt-2 text-xs text-slate-500 font-mono">Lugar: Sala Audiovisual ITH</div>
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
                  Competencia interna de robots sumo, seguidores de línea y laberinto autónomo.
                </p>
              </div>
              <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-lg font-bold text-white">Convivencia Mecatrónica</h4>
                <p className="text-xs sm:text-sm text-slate-400">
                  Evento de integración y bienvenida para estudiantes de nuevo ingreso.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 5. VISTA: DIPLOMAS (BÚSQUEDA PÚBLICA) */}
        {activeTab === 'Diplomas' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-slate-900/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
              <div className="text-center space-y-2">
                <Award className="w-10 h-10 text-cyan-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Validación Oficial de Certificados</h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Consulta la validez de tu constancia ingresando tu código de folio.
                </p>
              </div>
              
              <form onSubmit={handleSearchDiploma} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input 
                    type="text" 
                    value={searchFolio}
                    onChange={(e) => setSearchFolio(e.target.value)}
                    placeholder="Ej: MEC-2026-001" 
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm focus:outline-none focus:border-cyan-400 text-white font-mono"
                  />
                </div>
                <button type="submit" className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-cyan-500/20">
                  Buscar
                </button>
              </form>
            </div>

            {/* RESULTADO DE BÚSQUEDA */}
            {hasSearched && (
              <div>
                {foundDiploma ? (
                  <div className="bg-emerald-950/30 border border-emerald-500/40 p-6 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <CheckCircle className="w-5 h-5" /> Documento Válido Autenticado
                    </div>
                    <div className="text-xs sm:text-sm text-slate-300 space-y-1 font-mono">
                      <p><strong className="text-white">Folio:</strong> {foundDiploma.folio}</p>
                      <p><strong className="text-white">Alumno:</strong> {foundDiploma.alumno}</p>
                      <p><strong className="text-white">Evento/Taller:</strong> {foundDiploma.evento}</p>
                      <p><strong className="text-white">Fecha de Emisión:</strong> {foundDiploma.fecha}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-rose-950/30 border border-rose-500/40 p-6 rounded-2xl text-center space-y-2">
                    <AlertCircle className="w-6 h-6 text-rose-400 mx-auto" />
                    <p className="text-rose-300 text-sm font-semibold">Folio no encontrado</p>
                    <p className="text-xs text-slate-400">Verifica que hayas escrito el folio exactamente como aparece en el certificado.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 6. VISTA: ACCESO STAFF (ADMIN, MESA DIRECTIVA Y LOGÍSTICA) */}
        {activeTab === 'Acceso Staff' && (
          <div>
            {!isAdminLoggedIn ? (
              /* FORMULARIO DE INICIO DE SESIÓN */
              <div className="max-w-md mx-auto bg-slate-900/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Lock className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-xl font-bold text-white">Acceso Administrativo</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Ingresa con las credenciales asignadas al Comité.
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
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm focus:outline-none focus:border-cyan-400 text-white placeholder-slate-600"
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
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm focus:outline-none focus:border-cyan-400 text-white placeholder-slate-600"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 text-sm"
                  >
                    Iniciar Sesión
                  </button>
                </form>

                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
                  <p className="text-cyan-400 font-bold">Credenciales demo:</p>
                  <p>• Correo: <span className="text-white">admin@ith.edu.mx</span></p>
                  <p>• Password: <span className="text-white">admin2026</span></p>
                </div>
              </div>
            ) : (
              /* DASHBOARD MULTI-ROL (ADMIN, MESA Y STAFF) */
              <div className="space-y-6">
                
                {/* BARRA DE ROL Y USUARIO */}
                <div className="bg-slate-900/90 p-4 sm:p-6 rounded-2xl border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-lg sm:text-xl font-bold text-white">Panel Integrado de Control</h3>
                    </div>
                    <p className="text-xs text-slate-400">Usuario activo: admin@ith.edu.mx</p>
                  </div>

                  {/* SELECTOR DE ROL SIMULADO */}
                  <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 w-full md:w-auto">
                    <span className="text-[10px] text-slate-500 uppercase font-mono px-2">Modo Rol:</span>
                    <button 
                      onClick={() => setUserRole('Admin')}
                      className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition ${userRole === 'Admin' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                    >
                      Admin
                    </button>
                    <button 
                      onClick={() => setUserRole('Coordinador')}
                      className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition ${userRole === 'Coordinador' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                    >
                      Mesa
                    </button>
                    <button 
                      onClick={() => setUserRole('Staff')}
                      className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition ${userRole === 'Staff' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                    >
                      Staff
                    </button>

                    <button 
                      onClick={() => setIsAdminLoggedIn(false)}
                      className="ml-auto p-1.5 text-slate-400 hover:text-rose-400 transition"
                      title="Cerrar Sesión"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* MENÚ DE SUB-PESTAÑAS ADMINISTRATIVAS */}
                <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
                  <button 
                    onClick={() => setAdminSubTab('resumen')}
                    className={`px-3.5 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${adminSubTab === 'resumen' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800'}`}
                  >
                    <BarChart3 className="w-4 h-4" /> Resumen
                  </button>

                  {(userRole === 'Admin' || userRole === 'Coordinador') && (
                    <button 
                      onClick={() => setAdminSubTab('talleres')}
                      className={`px-3.5 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${adminSubTab === 'talleres' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800'}`}
                    >
                      <Calendar className="w-4 h-4" /> Gestión Talleres
                    </button>
                  )}

                  {(userRole === 'Admin' || userRole === 'Coordinador') && (
                    <button 
                      onClick={() => setAdminSubTab('diplomas')}
                      className={`px-3.5 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${adminSubTab === 'diplomas' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800'}`}
                    >
                      <Award className="w-4 h-4" /> Emisión Diplomas
                    </button>
                  )}

                  <button 
                    onClick={() => setAdminSubTab('asistencia')}
                    className={`px-3.5 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${adminSubTab === 'asistencia' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800'}`}
                  >
                    <UserCheck className="w-4 h-4" /> Control Asistencia
                  </button>

                  {userRole === 'Admin' && (
                    <button 
                      onClick={() => setAdminSubTab('equipo')}
                      className={`px-3.5 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${adminSubTab === 'equipo' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800'}`}
                    >
                      <Shield className="w-4 h-4" /> Mesa y Staff
                    </button>
                  )}
                </div>

                {/* CONTENIDO SEGÚN SUB-PESTAÑA */}
                
                {/* 1. RESUMEN METRICAS */}
                {adminSubTab === 'resumen' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-1">
                      <p className="text-xs text-slate-400 font-mono">Talleres Activos</p>
                      <p className="text-2xl font-bold text-cyan-400">{talleres.length}</p>
                    </div>
                    <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-1">
                      <p className="text-xs text-slate-400 font-mono">Diplomas Emitidos</p>
                      <p className="text-2xl font-bold text-purple-400">{diplomas.length}</p>
                    </div>
                    <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-1">
                      <p className="text-xs text-slate-400 font-mono">Alumnos Registrados</p>
                      <p className="text-2xl font-bold text-blue-400">{asistencia.length}</p>
                    </div>
                    <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-1">
                      <p className="text-xs text-slate-400 font-mono">Miembros Staff</p>
                      <p className="text-2xl font-bold text-emerald-400">{equipoStaff.length}</p>
                    </div>
                  </div>
                )}

                {/* 2. GESTIÓN TALLERES (MESA / ADMIN) */}
                {adminSubTab === 'talleres' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-5 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
                      <h4 className="font-bold text-white text-sm flex items-center gap-2">
                        <Plus className="w-4 h-4 text-cyan-400" /> Publicar Nuevo Taller
                      </h4>
                      <form onSubmit={handleAgregarTaller} className="space-y-3">
                        <input 
                          type="text" 
                          value={nuevoTitulo}
                          onChange={(e) => setNuevoTitulo(e.target.value)}
                          placeholder="Título del taller"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                          required
                        />
                        <input 
                          type="text" 
                          value={nuevoInstructor}
                          onChange={(e) => setNuevoInstructor(e.target.value)}
                          placeholder="Nombre del instructor"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                        />
                        <textarea 
                          value={nuevaDesc}
                          onChange={(e) => setNuevaDesc(e.target.value)}
                          placeholder="Descripción del curso..."
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white h-20 resize-none"
                          required
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input 
                            type="text" 
                            value={nuevoLugar}
                            onChange={(e) => setNuevoLugar(e.target.value)}
                            placeholder="Lugar (ej: Lab Robótica)"
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                          />
                          <input 
                            type="text" 
                            value={nuevoHorario}
                            onChange={(e) => setNuevoHorario(e.target.value)}
                            placeholder="Horario (ej: Sáb 9 AM)"
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                          />
                        </div>
                        <button type="submit" className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs">
                          Publicar Taller
                        </button>
                      </form>
                    </div>

                    <div className="lg:col-span-7 space-y-3">
                      <h4 className="font-bold text-white text-sm">Talleres Existentes</h4>
                      {talleres.map(t => (
                        <div key={t.id} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                          <div>
                            <p className="font-bold text-sm text-white">{t.titulo}</p>
                            <p className="text-xs text-slate-400">{t.instructor} — {t.lugar}</p>
                          </div>
                          <button 
                            onClick={() => handleEliminarTaller(t.id)} 
                            className="p-2 bg-rose-500/10 text-rose-400 rounded-lg hover:bg-rose-500/20 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. EMISIÓNDIPLOMAS (MESA / ADMIN) */}
                {adminSubTab === 'diplomas' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-5 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
                      <h4 className="font-bold text-white text-sm flex items-center gap-2">
                        <Award className="w-4 h-4 text-purple-400" /> Emitir Nuevo Folio
                      </h4>
                      <form onSubmit={handleEmitirDiploma} className="space-y-3">
                        <input 
                          type="text" 
                          value={nuevoFolio}
                          onChange={(e) => setNuevoFolio(e.target.value)}
                          placeholder="Folio (ej: MEC-2026-003)"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono"
                          required
                        />
                        <input 
                          type="text" 
                          value={nuevoAlumno}
                          onChange={(e) => setNuevoAlumno(e.target.value)}
                          placeholder="Nombre completo del alumno"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                          required
                        />
                        <input 
                          type="text" 
                          value={nuevoEventoDip}
                          onChange={(e) => setNuevoEventoDip(e.target.value)}
                          placeholder="Nombre del Taller o Evento"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                          required
                        />
                        <button type="submit" className="w-full py-2.5 bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold rounded-xl text-xs">
                          Generar Folio Certificado
                        </button>
                      </form>
                    </div>

                    <div className="lg:col-span-7 space-y-3">
                      <h4 className="font-bold text-white text-sm">Registro de Folios Emitidos</h4>
                      {diplomas.map(d => (
                        <div key={d.folio} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
                          <div>
                            <p className="text-cyan-400 font-bold">{d.folio}</p>
                            <p className="text-white font-sans font-semibold">{d.alumno}</p>
                            <p className="text-slate-500">{d.evento}</p>
                          </div>
                          <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-md">
                            {d.estado}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. ASISTENCIA LOGÍSTICA (STAFF) */}
                {adminSubTab === 'asistencia' && (
                  <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-emerald-400" /> Check-in y Pase de Lista (Staff)
                    </h4>
                    <div className="space-y-2">
                      {asistencia.map(item => (
                        <div key={item.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-white">{item.nombre} <span className="font-mono text-slate-500">({item.numControl})</span></p>
                            <p className="text-[11px] text-cyan-400">{item.taller}</p>
                          </div>
                          <button 
                            onClick={() => toggleAsistencia(item.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                              item.asistio 
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                          >
                            {item.asistio ? '✓ Asistió' : 'Registrar Llegada'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. MESA Y STAFF (ADMIN GENERAL) */}
                {adminSubTab === 'equipo' && userRole === 'Admin' && (
                  <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                      <Shield className="w-4 h-4 text-cyan-400" /> Padrón de Mesa Directiva y Staff
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {equipoStaff.map(member => (
                        <div key={member.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                          <p className="text-xs font-bold text-white">{member.nombre}</p>
                          <p className="text-[11px] text-cyan-400 font-mono">{member.rol}</p>
                          <p className="text-[10px] text-slate-500">{member.correo}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
            <span className="font-medium text-slate-400">Comité de Ingeniería Mecatrónica — ITH</span>
          </div>
          <p>© {new Date().getFullYear()} Todos los derechos reservados.</p>
        </div>
      </footer>

    </div>
  );
}