import type { RoutineCardProps } from '../types';

export function RoutineCard({ children, bgColor }: RoutineCardProps) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-3xl shadow-2xl p-12 md:p-16 transition-all duration-300 ${bgColor} text-white mb-6 w-full max-w-2xl mx-auto min-h-[340px]`}>
      {children}
    </div>
  );
}