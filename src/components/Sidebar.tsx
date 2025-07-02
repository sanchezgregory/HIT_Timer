import type { SidebarProps } from '../types';

export function Sidebar({ started, serie, exerciseIdx, onOpenExerciseConfig }: SidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col gradient-primary text-white w-80 min-h-screen shadow-2xl">
      <div className="p-8 border-b border-white/10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-white">
              <path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 17.93V20h-2v-.07A8.001 8.001 0 014 12h2a6 6 0 0012 0h2a8.001 8.001 0 01-7 7.93z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold">FitDash</h1>
            <p className="text-white/70 text-sm">Entrenamiento inteligente</p>
          </div>
        </div>
        
        <button
          className="w-full glass-effect hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 text-sm"
          onClick={onOpenExerciseConfig}
        >
          <div className="flex items-center justify-center gap-2">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-white/80">
              <path stroke="currentColor" strokeWidth="2" d="M12 4v16m8-8H4"/>
            </svg>
            Gestionar ejercicios
          </div>
        </button>
      </div>

      {started ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-center mb-8">
            <div className="text-6xl font-bold mb-3 text-white drop-shadow-lg">{serie}</div>
            <div className="text-white/80 font-medium mb-6">Serie actual</div>
            <div className="text-4xl font-bold mb-3 text-white drop-shadow">{exerciseIdx + 1}</div>
            <div className="text-white/80 font-medium">Ejercicio</div>
          </div>
          
          <div className="w-full h-px bg-white/20 my-8"></div>
          
          <div className="text-center">
            <div className="text-white/60 text-sm mb-2">Progreso de la serie</div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${((exerciseIdx + 1) / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-white/60">
                <path stroke="currentColor" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <p className="text-white/60 text-sm">Configura tu rutina para comenzar</p>
          </div>
        </div>
      )}

      <div className="p-8 border-t border-white/10">
        <p className="text-white/40 text-xs text-center">
          Hecho con React & Tailwind CSS
        </p>
      </div>
    </aside>
  );
}