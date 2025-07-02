import type { TopbarProps } from '../types';

export function Topbar({ onOpenExerciseConfig }: TopbarProps) {
  return (
    <header className="lg:hidden flex items-center justify-between gradient-primary text-white px-6 py-4 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-white">
            <path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 17.93V20h-2v-.07A8.001 8.001 0 014 12h2a6 6 0 0012 0h2a8.001 8.001 0 01-7 7.93z"/>
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold">FitDash</h1>
          <p className="text-white/70 text-xs">Entrenamiento inteligente</p>
        </div>
      </div>
      
      <button
        className="glass-effect hover:bg-white/20 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm"
        onClick={onOpenExerciseConfig}
      >
        <div className="flex items-center gap-2">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="text-white/80">
            <path stroke="currentColor" strokeWidth="2" d="M12 4v16m8-8H4"/>
          </svg>
          <span className="hidden sm:inline">Ejercicios</span>
        </div>
      </button>
    </header>
  );
}