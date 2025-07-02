export interface Exercise {
  name: string;
}

export interface Config {
  series: number;
  exercisesPerSeries: number;
  exercises: Exercise[];
  globalDuration: number;
  restBetweenExercises: number;
  restBetweenSeries: number;
  soundOn: boolean;
}

export interface SidebarProps {
  started: boolean;
  serie: number;
  exerciseIdx: number;
  onOpenExerciseConfig: () => void;
}

export interface TopbarProps {
  onOpenExerciseConfig: () => void;
}

export interface ExerciseConfigModalProps {
  open: boolean;
  onClose: () => void;
  customExercises: Exercise[];
  setCustomExercises: (exercises: Exercise[]) => void;
}

export interface ConfigCardProps {
  children: React.ReactNode;
  title: string;
  icon: string;
  color: string;
}

export interface ConfigScreenProps {
  onStart: () => void;
  config: Config;
  setConfig: (config: Config | ((prev: Config) => Config)) => void;
  customExercises: Exercise[];
}

export interface RoutineCardProps {
  children: React.ReactNode;
  phase: string;
  bgColor: string;
}

export interface RoutineScreenProps {
  config: Config;
  onReset: () => void;
  setSidebarSerie: (serie: number) => void;
  setSidebarExerciseIdx: (idx: number) => void;
}

export type Phase = "exercise" | "rest" | "seriesRest" | "done";