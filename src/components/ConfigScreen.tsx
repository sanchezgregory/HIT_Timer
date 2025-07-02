import React from 'react';
import type { ConfigScreenProps } from '../types';
import { defaultExercises } from '../constants';
import { ConfigCard } from './ConfigCard';

export function ConfigScreen({ onStart, config, setConfig, customExercises }: ConfigScreenProps) {
  // Opciones para todos los selects: los 4 por defecto + personalizados (sin duplicados)
  const exerciseOptions = [
    ...defaultExercises.map(e => e.name),
    ...customExercises.map(e => e.name).filter(
      n => !defaultExercises.some(d => d.name === n)
    )
  ];

  // Cuando cambia el número de ejercicios por serie, ajusta el array de ejercicios
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === "exercisesPerSeries") {
      const num = Math.max(2, parseInt(value) || 2); // Mínimo 2 ejercicios
      setConfig((prev) => {
        // Crear array de ejercicios según la cantidad solicitada
        let newExercises = Array(num).fill(null).map((_, i) => {
          // Si ya existe el ejercicio en esa posición, mantenerlo
          if (prev.exercises[i] && prev.exercises[i].name) {
            return prev.exercises[i];
          }
          // Si no existe, usar el primer ejercicio disponible
          return { name: exerciseOptions[0] || defaultExercises[0].name };
        });
        return { ...prev, exercisesPerSeries: num, exercises: newExercises };
      });
    } else {
      setConfig((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };
  
  // Cambiar el nombre de cualquier ejercicio por select
  const handleSelect = (idx: number, name: string) => {
    const newExercises = config.exercises.map((ex, i) =>
      i === idx ? { ...ex, name } : ex
    );
    setConfig((prev) => ({ ...prev, exercises: newExercises }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, idx: number) => {
    handleSelect(idx, e.target.value);
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Configura tu rutina</h2>
      <ConfigCard title="Series y Ejercicios" icon="🏋️" color="from-blue-500 to-blue-700">
        <div className="flex gap-4 mb-2 items-end">
          <div className="flex-1">
            <label className="block text-sm font-semibold">N° de series</label>
            <input 
              type="number" 
              name="series" 
              min={1} 
              value={config.series} 
              onChange={handleChange} 
              className="w-full rounded px-2 py-1 text-gray-900" 
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold">Ejercicios por serie</label>
            <input 
              type="number" 
              name="exercisesPerSeries" 
              min={2} 
              value={config.exercisesPerSeries} 
              onChange={handleChange} 
              className="w-full rounded px-2 py-1 text-gray-900" 
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold">Tiempo por ejercicio (s)</label>
            <input 
              type="number" 
              name="globalDuration" 
              min={5} 
              value={config.globalDuration} 
              onChange={handleChange} 
              className="w-full rounded px-2 py-1 text-gray-900" 
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Ejercicios</label>
          {config.exercises.map((ex, idx) => (
            <div key={idx} className="flex gap-2 items-center mb-2 bg-white/10 rounded p-2">
              <select
                className="rounded px-2 py-1 flex-1 text-gray-900"
                value={ex.name}
                onChange={(e) => handleSelectChange(e, idx)}
              >
                {exerciseOptions.map((name, i) => (
                  <option key={i} value={name}>{name}</option>
                ))}
              </select>
              <span className="text-xs text-white/70">#{idx + 1}</span>
            </div>
          ))}
        </div>
      </ConfigCard>
      <div className="grid md:grid-cols-2 gap-4">
        <ConfigCard title="Descansos" icon="⏱️" color="from-purple-500 to-purple-700">
          <div className="mb-2">
            <label className="block text-sm font-semibold">Descanso entre ejercicios (s)</label>
            <input 
              type="number" 
              name="restBetweenExercises" 
              min={0} 
              value={config.restBetweenExercises} 
              onChange={handleChange} 
              className="w-full rounded px-2 py-1 text-gray-900" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Descanso entre series (s)</label>
            <input 
              type="number" 
              name="restBetweenSeries" 
              min={0} 
              value={config.restBetweenSeries} 
              onChange={handleChange} 
              className="w-full rounded px-2 py-1 text-gray-900" 
            />
          </div>
        </ConfigCard>
        <ConfigCard title="Configuración" icon="⚙️" color="from-gray-500 to-gray-700">
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              name="soundOn" 
              checked={config.soundOn} 
              onChange={handleChange} 
              className="w-5 h-5" 
            />
            <label className="text-sm">Activar sonidos</label>
          </div>
        </ConfigCard>
      </div>
      <button 
        onClick={onStart} 
        className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg hover:scale-105 transition"
      >
        Iniciar rutina
      </button>
    </div>
  );
}