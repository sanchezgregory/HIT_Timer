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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl card-shadow-lg p-8 w-full max-w-md relative">
        <button 
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors duration-200" 
          onClick={onClose}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Ejercicios personalizados</h2>
          <p className="text-slate-600">Agrega tus propios ejercicios para personalizar tu rutina</p>
        </div>
        
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Nombre del ejercicio"
            className="input-field flex-1"
            onKeyDown={handleKeyDown}
          />
          <button
            className="btn-primary px-6"
            onClick={addExercise}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Tus ejercicios ({customExercises.length})</h3>
          <div className="max-h-48 overflow-y-auto space-y-2">
            {customExercises.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="mx-auto mb-3 text-slate-300">
                  <path stroke="currentColor" strokeWidth="2" d="M12 4v16m8-8H4"/>
                </svg>
                <p className="text-sm">No tienes ejercicios personalizados</p>
                <p className="text-xs">Agrega algunos para personalizar tu rutina</p>
              </div>
            ) : (
              customExercises.map((ex, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors duration-200">
                  <span className="font-medium text-slate-900">{ex.name}</span>
                  <button 
                    className="text-red-500 hover:text-red-700 p-1 rounded transition-colors duration-200" 
                    onClick={() => removeExercise(idx)}
                    title="Eliminar ejercicio"
                  >
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="flex gap-3">
          {customExercises.length > 0 && (
            <button
              className="flex-1 py-3 px-4 rounded-lg bg-red-50 text-red-700 font-medium hover:bg-red-100 transition-colors duration-200 border border-red-200"
              onClick={clearAll}
            >
              Borrar todos
            </button>
          )}
          <button
            className="flex-1 btn-secondary"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  ) : null;
}