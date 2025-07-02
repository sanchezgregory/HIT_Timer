import type { ConfigCardProps } from '../types';

export function ConfigCard({ children, title, icon, color }: ConfigCardProps) {
  return (
    <div className={`rounded-xl shadow-lg p-6 bg-gradient-to-br ${color} text-white flex flex-col gap-2 mb-6`}>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-lg font-bold tracking-wide">{title}</h3>
      </div>
      {children}
    </div>
  );
}