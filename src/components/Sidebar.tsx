import type { SidebarProps } from '../types';

export function Sidebar({ started, serie, exerciseIdx, onOpenExerciseConfig }: SidebarProps) {
  return (
    <aside className="hidden md:flex flex-col bg-gradient-to-b from-blue-700 to-purple-700 text-white w-64 min-h-screen p-6 shadow-lg">
      <div className="text-2xl font-bold mb-8 flex items-center gap-2">
        <span className="inline-block bg-white/20 rounded-full p-2">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path fill="#fff" d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 17.93V20h-2v-.07A8.001 8.001 0 014 12h2a6 6 0 0012 0h2a8.001 8.001 0 01-7 7.93z"/>
          </svg>
        </span>
        FitDash
      </div>
      <button
        className="mb-8 px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition"
        onClick={onOpenExerciseConfig}
      >
        Configurar ejercicios
      </button>
      {started ? (
        <div className="flex flex-col items-center my-12">
          <div className="text-5xl font-extrabold mb-2 drop-shadow-lg">{serie}</div>
          <div className="text-lg font-semibold mb-1">Serie actual</div>
          <div className="text-3xl font-bold mb-2 drop-shadow">{exerciseIdx + 1}</div>
          <div className="text-md font-semibold">Ejercicio</div>
        </div>
      ) : null}
      <div className="mt-auto text-xs text-white/60">Hecho con React, Tailwind y ❤️</div>
    </aside>
  );
}