import { useState } from 'react';
import type { Config, Exercise } from './types';
import { defaultExercises } from './constants';
import { useLocalStorage } from './hooks/useLocalStorage';
import {
  Sidebar,
  Topbar,
  ExerciseConfigModal,
  ConfigScreen,
  RoutineScreen
} from './components';

export default function App() {
  const [config, setConfig] = useState<Config>({
    series: 3,
    exercisesPerSeries: 4,
    exercises: defaultExercises,
    globalDuration: 30,
    restBetweenExercises: 15,
    restBetweenSeries: 60,
    soundOn: true,
  });
  
  const [started, setStarted] = useState(false);
  const [sidebarSerie, setSidebarSerie] = useState(1);
  const [sidebarExerciseIdx, setSidebarExerciseIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [customExercises, setCustomExercises] = useLocalStorage<Exercise[]>("customExercises", []);

  const handleStart = () => setStarted(true);
  const handleReset = () => setStarted(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Sidebar 
        started={started} 
        serie={sidebarSerie} 
        exerciseIdx={sidebarExerciseIdx} 
        onOpenExerciseConfig={handleOpenModal} 
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onOpenExerciseConfig={handleOpenModal} />
        <main className="flex-1 flex flex-col items-center justify-start px-4 md:px-8 lg:px-12 xl:px-16 py-6 max-w-7xl mx-auto w-full">
          {!started ? (
            <ConfigScreen 
              config={config} 
              setConfig={setConfig} 
              onStart={handleStart} 
              customExercises={customExercises} 
            />
          ) : (
            <RoutineScreen 
              config={config} 
              onReset={handleReset} 
              setSidebarSerie={setSidebarSerie} 
              setSidebarExerciseIdx={setSidebarExerciseIdx} 
            />
          )}
        </main>
        <ExerciseConfigModal 
          open={modalOpen} 
          onClose={handleCloseModal} 
          customExercises={customExercises} 
          setCustomExercises={setCustomExercises} 
        />
      </div>
    </div>
  );
}