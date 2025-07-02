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
  const [soundOn] = useState(config.soundOn); // Solo lectura, ya no se cambia aquí
  const timerRef = useRef<number>();
  const beepRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setSidebarSerie(serie);
    setSidebarExerciseIdx(exerciseIdx);
  }, [serie, exerciseIdx, setSidebarSerie, setSidebarExerciseIdx]);

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
  }, [timeLeft, paused]);

  // Alarma sonora a los 2 segundos en descansos
  useEffect(() => {
    if ((phase === "rest" || phase === "seriesRest") && timeLeft === 2 && soundOn) {
      if (beepRef.current) {
        beepRef.current.currentTime = 0;
        beepRef.current.play().catch(console.error);
      }
    }
  }, [phase, timeLeft, soundOn]);

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

  const handlePause = () => setPaused((p) => !p);
  
  const handleRestart = () => {
    setSerie(1);
    setExerciseIdx(0);
    setPhase("exercise");
    setTimeLeft(Number(config.globalDuration) || 30);
    setPaused(false);
  };

  // Determinar color de fondo del card de segundos
  let bgColor = "bg-gradient-to-br from-green-400 to-green-600";
  if (phase === "rest" || phase === "seriesRest") {
    bgColor = "bg-gradient-to-br from-yellow-400 to-yellow-600";
    if (timeLeft <= 2) bgColor = "bg-gradient-to-br from-red-500 to-red-700";
    else if (timeLeft <= 5) bgColor = "bg-gradient-to-br from-yellow-300 to-yellow-500";
  } else if (phase === "exercise") {
    bgColor = "bg-gradient-to-br from-green-400 to-green-600";
    if (timeLeft <= 2) bgColor = "bg-gradient-to-br from-red-500 to-red-700";
    else if (timeLeft <= 5) bgColor = "bg-gradient-to-br from-yellow-300 to-yellow-500";
  } else if (phase === "done") {
    bgColor = "bg-gradient-to-br from-gray-400 to-gray-600";
  }

  // Calcular el siguiente ejercicio o fase
  let nextLabel = "";
  if (phase === "exercise") {
    if (exerciseIdx < config.exercises.length - 1) {
      nextLabel = `Siguiente: ${config.exercises[exerciseIdx + 1].name}`;
    } else if (serie < config.series) {
      nextLabel = "Siguiente: Descanso entre series";
    } else {
      nextLabel = "Siguiente: Fin";
    }
  } else if (phase === "rest") {
    nextLabel = `Siguiente: ${config.exercises[exerciseIdx + 1]?.name || "-"}`;
  } else if (phase === "seriesRest") {
    nextLabel = `Siguiente: ${config.exercises[0]?.name || "-"}`;
  }

  if (phase === "done") {
    return (
      <RoutineCard phase="done" bgColor={bgColor}>
        <h2 className="text-3xl font-bold mb-4">¡Rutina completada! 🎉</h2>
        <button 
          className="mt-2 px-6 py-2 rounded bg-white/20 hover:bg-white/30 text-white font-semibold" 
          onClick={onReset}
        >
          Volver a configurar
        </button>
        <audio ref={beepRef} src={BEEP_SOUND_URL} preload="auto" />
      </RoutineCard>
    );
  }
  
  const currentExercise = config.exercises[exerciseIdx];

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-6 w-full justify-between items-center mb-4">
        <div className="flex flex-col items-center">
          <div className="text-lg font-semibold">Serie <span className="font-bold">{serie}</span> de {config.series}</div>
          <div className="text-md">Ejercicio <span className="font-bold">{exerciseIdx + 1}</span> de {config.exercises.length}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-lg font-semibold">Fase</div>
          <div className="text-xl font-bold capitalize">
            {phase === "exercise" ? "Ejercicio" : phase === "rest" ? "Descanso" : "Descanso entre series"}
          </div>
        </div>
      </div>
      <RoutineCard phase={phase} bgColor={bgColor}>
        <div className="flex flex-col items-center mb-4 w-full">
          {phase === "exercise" && (
            <div className="font-bold text-3xl mb-4 text-center w-full">{currentExercise.name}</div>
          )}
          {phase === "rest" && <div className="text-2xl font-bold mb-4 w-full text-center">Descanso entre ejercicios</div>}
          {phase === "seriesRest" && <div className="text-2xl font-bold mb-4 w-full text-center">Descanso entre series</div>}
          <div className="flex items-center justify-center w-full">
            <div className="text-[18vw] md:text-[12vw] font-mono font-extrabold drop-shadow-lg transition-all duration-300 select-none leading-none">
              {timeLeft}
            </div>
          </div>
        </div>
        <div className="text-lg md:text-xl font-semibold mt-2 mb-4 w-full text-center opacity-90">
          {nextLabel}
        </div>
        <div className="flex justify-center gap-4 mb-2">
          <button 
            className="px-6 py-3 rounded bg-white/20 hover:bg-white/30 text-white font-semibold text-lg" 
            onClick={handlePause}
          >
            {paused ? "Reanudar" : "Pausar"}
          </button>
          <button 
            className="px-6 py-3 rounded bg-white/20 hover:bg-white/30 text-white font-semibold text-lg" 
            onClick={handleRestart}
          >
            Reiniciar
          </button>
        </div>
        <audio ref={beepRef} src={BEEP_SOUND_URL} preload="auto" />
      </RoutineCard>
      <button 
        className="w-full text-center text-blue-700 underline mt-2" 
        onClick={onReset}
      >
        Volver a configuración
      </button>
    </div>
  );
}