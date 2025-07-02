import { useState, useRef, useEffect } from 'react';
import type { RoutineScreenProps, Phase } from '../types';
import { BEEP_SOUND_URL } from '../constants';
import { RoutineCard } from './RoutineCard';

export function RoutineScreen({ config, onReset, setSidebarSerie, setSidebarExerciseIdx }: RoutineScreenProps) {
  const [serie, setSerie] = useState(1);
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("exercise");
  const [timeLeft, setTimeLeft] = useState(Number(config.globalDuration) || 30);
  const [paused, setPaused] = useState(false);
  const [soundOn] = useState(config.soundOn);
  const timerRef = useRef<number>();
  const beepRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setSidebarSerie(serie);
    setSidebarExerciseIdx(exerciseIdx);
  }, [serie, exerciseIdx, setSidebarSerie, setSidebarExerciseIdx]);

  const handleNext = () => {
    if (phase === "exercise") {
      if (exerciseIdx < config.exercises.length - 1) {
        setPhase("rest");
        setTimeLeft(Number(config.restBetweenExercises));
      } else if (serie < config.series) {
        setPhase("seriesRest");
        setTimeLeft(Number(config.restBetweenSeries));
      } else {
        setPhase("done");
      }
    } else if (phase === "rest") {
      setExerciseIdx(exerciseIdx + 1);
      setPhase("exercise");
      setTimeLeft(Number(config.globalDuration) || 30);
    } else if (phase === "seriesRest") {
      setSerie(serie + 1);
      setExerciseIdx(0);
      setPhase("exercise");
      setTimeLeft(Number(config.globalDuration) || 30);
    }
  };

  useEffect(() => {
    if (paused) return;
    timerRef.current = window.setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        handleNext();
      }
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, paused, handleNext]);

  useEffect(() => {
    if ((phase === "rest" || phase === "seriesRest") && timeLeft === 2 && soundOn) {
      if (beepRef.current) {
        beepRef.current.currentTime = 0;
        beepRef.current.play().catch(console.error);
      }
    }
  }, [phase, timeLeft, soundOn]);

  const handlePause = () => setPaused((p) => !p);
  
  const handleRestart = () => {
    setSerie(1);
    setExerciseIdx(0);
    setPhase("exercise");
    setTimeLeft(Number(config.globalDuration) || 30);
    setPaused(false);
  };

  // Determinar color de fondo del card
  let bgColor = "bg-gradient-to-br from-emerald-500 to-emerald-600";
  if (phase === "rest" || phase === "seriesRest") {
    bgColor = "bg-gradient-to-br from-amber-500 to-amber-600";
    if (timeLeft <= 2) bgColor = "bg-gradient-to-br from-red-500 to-red-600";
    else if (timeLeft <= 5) bgColor = "bg-gradient-to-br from-orange-500 to-orange-600";
  } else if (phase === "exercise") {
    bgColor = "bg-gradient-to-br from-emerald-500 to-emerald-600";
    if (timeLeft <= 2) bgColor = "bg-gradient-to-br from-red-500 to-red-600";
    else if (timeLeft <= 5) bgColor = "bg-gradient-to-br from-orange-500 to-orange-600";
  } else if (phase === "done") {
    bgColor = "bg-gradient-to-br from-slate-600 to-slate-700";
  }

  // Calcular el siguiente ejercicio o fase
  let nextLabel = "";
  if (phase === "exercise") {
    if (exerciseIdx < config.exercises.length - 1) {
      nextLabel = `Siguiente: ${config.exercises[exerciseIdx + 1].name}`;
    } else if (serie < config.series) {
      nextLabel = "Siguiente: Descanso entre series";
    } else {
      nextLabel = "Siguiente: ¡Finalizar!";
    }
  } else if (phase === "rest") {
    nextLabel = `Siguiente: ${config.exercises[exerciseIdx + 1]?.name || "-"}`;
  } else if (phase === "seriesRest") {
    nextLabel = `Siguiente: ${config.exercises[0]?.name || "-"}`;
  }

  if (phase === "done") {
    return (
      <div className="w-full max-w-4xl mx-auto py-8">
        <RoutineCard phase="done" bgColor={bgColor}>
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24" className="text-white">
                <path stroke="currentColor" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h2 className="text-4xl font-bold mb-4">¡Entrenamiento completado!</h2>
            <p className="text-white/80 text-lg mb-8">Excelente trabajo. Has completado todas las series.</p>
            <button 
              className="btn-secondary text-slate-900 bg-white hover:bg-slate-50" 
              onClick={onReset}
            >
              Configurar nueva rutina
            </button>
          </div>
          <audio ref={beepRef} src={BEEP_SOUND_URL} preload="auto" />
        </RoutineCard>
      </div>
    );
  }
  
  const currentExercise = config.exercises[exerciseIdx];

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      {/* Header con información de progreso */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="config-card text-center">
          <div className="text-2xl font-bold text-slate-900 mb-1">
            {serie} / {config.series}
          </div>
          <div className="text-slate-600 text-sm">Series</div>
        </div>
        
        <div className="config-card text-center">
          <div className="text-2xl font-bold text-slate-900 mb-1">
            {exerciseIdx + 1} / {config.exercises.length}
          </div>
          <div className="text-slate-600 text-sm">Ejercicios</div>
        </div>
        
        <div className="config-card text-center">
          <div className="text-2xl font-bold text-slate-900 mb-1 capitalize">
            {phase === "exercise" ? "Ejercicio" : phase === "rest" ? "Descanso" : "Descanso largo"}
          </div>
          <div className="text-slate-600 text-sm">Fase actual</div>
        </div>
      </div>

      {/* Card principal del timer */}
      <RoutineCard phase={phase} bgColor={bgColor}>
        <div className="text-center w-full">
          {phase === "exercise" && (
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{currentExercise.name}</h2>
              <p className="text-white/80 text-lg">¡Dale todo tu esfuerzo!</p>
            </div>
          )}
          {phase === "rest" && (
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Descanso</h2>
              <p className="text-white/80 text-lg">Recupera energías para el siguiente ejercicio</p>
            </div>
          )}
          {phase === "seriesRest" && (
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Descanso entre series</h2>
              <p className="text-white/80 text-lg">Tómate un respiro más largo</p>
            </div>
          )}
          
          {/* Timer principal */}
          <div className="my-12">
            <div className="text-[20vw] md:text-[15vw] lg:text-[12rem] font-mono font-black leading-none text-white drop-shadow-2xl">
              {timeLeft}
            </div>
          </div>
          
          {/* Información del siguiente ejercicio */}
          <div className="mb-8">
            <p className="text-white/90 text-lg md:text-xl font-medium">
              {nextLabel}
            </p>
          </div>
          
          {/* Controles */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              className="btn-secondary bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/40" 
              onClick={handlePause}
            >
              <div className="flex items-center gap-2">
                {paused ? (
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M10 9v6l5-3-5-3z"/>
                  </svg>
                )}
                {paused ? "Reanudar" : "Pausar"}
              </div>
            </button>
            
            <button 
              className="btn-secondary bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/40" 
              onClick={handleRestart}
            >
              <div className="flex items-center gap-2">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Reiniciar
              </div>
            </button>
          </div>
        </div>
        
        <audio ref={beepRef} src={BEEP_SOUND_URL} preload="auto" />
      </RoutineCard>
      
      {/* Botón para volver a configuración */}
      <div className="text-center mt-8">
        <button 
          className="text-slate-600 hover:text-slate-900 font-medium underline transition-colors duration-200" 
          onClick={onReset}
        >
          ← Volver a configuración
        </button>
      </div>
    </div>
  );
}