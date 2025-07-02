import type { RoutineCardProps } from '../types';

export function RoutineCard({ children, bgColor }: RoutineCardProps) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-2xl card-shadow-lg p-8 md:p-12 transition-all duration-300 ${bgColor} text-white w-full max-w-4xl mx-auto min-h-[400px]`}>
      {children}
    </div>
  );
}