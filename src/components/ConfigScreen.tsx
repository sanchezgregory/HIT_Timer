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
    <div className="w-full max-w-5xl mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gradient mb-4">Configura tu rutina</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Personaliza tu entrenamiento ajustando series, ejercicios y tiempos según tus objetivos
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="lg:col-span-2">
          <ConfigCard title="Series y Ejercicios" icon="🏋️" color="bg-slate-900">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Número de series</label>
                <input 
                  type="number" 
                  name="series" 
                  min={1} 
                  value={config.series} 
                  onChange={handleChange} 
                  className="input-field" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Ejercicios por serie</label>
                <input 
                  type="number" 
                  name="exercisesPerSeries" 
                  min={2} 
                  value={config.exercisesPerSeries} 
                  onChange={handleChange} 
                  className="input-field" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tiempo por ejercicio (seg)</label>
                <input 
                  type="number" 
                  name="globalDuration" 
                  min={5} 
                  value={config.globalDuration} 
                  onChange={handleChange} 
                  className="input-field" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-4">Selecciona tus ejercicios</label>
              <div className="grid md:grid-cols-2 gap-4">
                {config.exercises.map((ex, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </div>
                    <select
                      className="flex-1 input-field"
                      value={ex.name}
                      onChange={(e) => handleSelectChange(e, idx)}
                    >
                      {exerciseOptions.map((name, i) => (
                        <option key={i} value={name}>{name}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </ConfigCard>
        </div>

        <ConfigCard title="Tiempos de descanso" icon="⏱️" color="bg-emerald-600">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Entre ejercicios (segundos)</label>
              <input 
                type="number" 
                name="restBetweenExercises" 
                min={0} 
                value={config.restBetweenExercises} 
                onChange={handleChange} 
                className="input-field" 
              />
              <p className="text-xs text-slate-500 mt-1">Tiempo de recuperación entre cada ejercicio</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Entre series (segundos)</label>
              <input 
                type="number" 
                name="restBetweenSeries" 
                min={0} 
                value={config.restBetweenSeries} 
                onChange={handleChange} 
                className="input-field" 
              />
              <p className="text-xs text-slate-500 mt-1">Descanso más largo entre series completas</p>
            </div>
          </div>
        </ConfigCard>

        <ConfigCard title="Configuración adicional" icon="⚙️" color="bg-amber-600">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <input 
                type="checkbox" 
                name="soundOn" 
                checked={config.soundOn} 
                onChange={handleChange} 
                className="w-5 h-5 text-slate-900 rounded focus:ring-slate-200" 
              />
              <div>
                <label className="text-sm font-medium text-slate-900">Activar sonidos</label>
                <p className="text-xs text-slate-500">Reproducir alertas sonoras durante los descansos</p>
              </div>
            </div>
          </div>
        </ConfigCard>
      </div>

      <div className="text-center">
        <button 
          onClick={onStart} 
          className="btn-primary text-lg px-12 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-white">
              <path stroke="currentColor" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Iniciar entrenamiento
          </div>
        </button>
      </div>
    </div>
  );
}