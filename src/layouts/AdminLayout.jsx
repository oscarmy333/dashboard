
import { useState } from 'react';
import { Sidebar } from '../features/Dashboard/components/Sidebar';
import { ThemeToggle } from '../components/ThemeToggle';

export function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-dashboard text-text-dashboard flex transition-colors duration-200">
      {/* Sidebar - Oculto en móvil, deslizable con botón, fijo en md: */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-neutral-200/60 dark:border-neutral-800/60 flex items-center px-4 md:px-8 justify-between bg-card transition-colors duration-200">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 md:hidden rounded cursor-pointer focus-visible:outline-2 focus-visible:outline-neutral-400"
            aria-label={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}
          >
            Menu
          </button>
          
          <div className="font-bold text-lg tracking-tight">AdminDashboard</div>
          
          {/* El botón integrado perfectamente */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </header>

        <main className="p-4 md:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
