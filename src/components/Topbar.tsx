import type { TopbarProps } from '../types';

export function Topbar({ onOpenExerciseConfig }: TopbarProps) {
  return (
    <header className="md:hidden flex items-center justify-between bg-gradient-to-r from-blue-700 to-purple-700 text-white px-4 py-3 shadow">
      <div className="text-xl font-bold flex items-center gap-2">
        <span className="inline-block bg-white/20 rounded-full p-1">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path fill="#fff" d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 17.93V20h-2v-.07A8.001 8.001 0 014 12h2a6 6 0 0012 0h2a8.001 8.001 0 01-7 7.93z"/>
          </svg>
        </span>
        FitDash
      </div>
      <button
        className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition"
        onClick={onOpenExerciseConfig}
      >
        Configurar ejercicios
      </button>
    </header>
  );
}