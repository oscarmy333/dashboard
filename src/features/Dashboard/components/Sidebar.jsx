
import { useEffect } from 'react';

const NAVIGATION_LINKS = [
  { name: 'Inicio', href: '#', icon: '📊', active: true },
  { name: 'Análisis', href: '#', icon: '📈', active: false },
  { name: 'Clientes', href: '#', icon: '👥', active: false },
  { name: 'Configuración', href: '#', icon: '⚙️', active: false },
];

export function Sidebar({ isOpen, setIsOpen }) {
  // Accesibilidad: Cerrar menú flotante móvil al presionar la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  return (
    <>
      {/* 1. Backdrop de fondo (Capa oscura de enfoque) visible solo en móvil cuando el Sidebar está abierto */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-neutral-900/40 backdrop-blur-xs md:hidden"
          aria-hidden="true"
        />
      )}

      {/* 2. Contenedor del Sidebar */}
      <aside
        id="main-sidebar"
        // Tailwind v4 optimiza la sintaxis de transformación. Evaluamos si está abierto o cerrado.
        className={`fixed md:sticky top-0 left-0 z-50 flex flex-col w-64 h-screen border-r border-neutral-200/60 dark:border-neutral-800/60 bg-card transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Cabecera del Sidebar */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-neutral-900 dark:text-neutral-100">
            <span>✨</span> ControlPanel
          </div>
          {/* Botón para cerrar en móvil */}
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md md:hidden hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
            aria-label="Cerrar menú de navegación"
          >
            ✕
          </button>
        </div>

        {/* Lista de enlaces de navegación semántica */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto" aria-label="Navegación principal">
          <ul className="space-y-1">
            {NAVIGATION_LINKS.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  // Si el enlace está activo, se lo comunicamos semánticamente a los lectores de pantalla
                  aria-current={link.active ? 'page' : undefined}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-150 group outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 ${
                    link.active
                      ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 hover:text-neutral-900 dark:hover:text-neutral-100'
                  }`}
                >
                  <span className="text-lg opacity-80 group-hover:scale-110 transition-transform duration-100" aria-hidden="true">
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer del Sidebar */}
        <div className="p-4 border-t border-neutral-200/60 dark:border-neutral-800/60 text-xs text-neutral-400 text-center">
          v4.0.0 Stable
        </div>
      </aside>
    </>
  );
}
