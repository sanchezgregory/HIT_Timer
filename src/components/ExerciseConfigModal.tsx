import React, { useState, useEffect } from 'react';
import type { ExerciseConfigModalProps } from '../types';

export function ExerciseConfigModal({ open, onClose, customExercises, setCustomExercises }: ExerciseConfigModalProps) {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (open) setInput("");
  }, [open]);

  const addExercise = () => {
    const name = input.trim();
    if (!name) return;
    if (customExercises.some(e => e.name.toLowerCase() === name.toLowerCase())) return;
    setCustomExercises([...customExercises, { name }]);
    setInput("");
  };

  const removeExercise = (idx: number) => {
    setCustomExercises(customExercises.filter((_, i) => i !== idx));
  };

  const clearAll = () => {
    if (window.confirm("¿Seguro que quieres borrar todos los ejercicios personalizados?")) {
      setCustomExercises([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addExercise();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative">
        <button 
          className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-gray-700" 
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Mis ejercicios personalizados</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Nombre del ejercicio"
            className="flex-1 rounded px-2 py-1 border border-gray-300"
            onKeyDown={handleKeyDown}
          />
          <button
            className="px-4 py-1 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
            onClick={addExercise}
          >
            Agregar
          </button>
        </div>
        <ul className="mb-4 max-h-40 overflow-y-auto">
          {customExercises.length === 0 && (
            <li className="text-gray-500 text-sm">No tienes ejercicios personalizados.</li>
          )}
          {customExercises.map((ex, idx) => (
            <li key={idx} className="flex items-center justify-between py-1 px-2 rounded hover:bg-gray-100">
              <span>{ex.name}</span>
              <button 
                className="text-red-500 text-sm ml-2" 
                onClick={() => removeExercise(idx)}
              >
                Borrar
              </button>
            </li>
          ))}
        </ul>
        <button
          className="w-full py-2 rounded bg-red-100 text-red-700 font-semibold hover:bg-red-200 mb-2"
          onClick={clearAll}
        >
          Borrar todos
        </button>
        <button
          className="w-full py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  ) : null;
}