import type { ConfigCardProps } from '../types';

export function ConfigCard({ children, title, icon, color }: ConfigCardProps) {
  return (
    <div className="config-card">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center text-white text-lg`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}