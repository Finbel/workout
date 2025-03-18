export interface WorkoutProgram {
  weeks: Week[]
}

export interface Week {
  week: 'A' | 'B'
  style: 'strength' | 'hypertrophy'
  workouts: Workout[]
}

export interface Workout {
  id: string
  name: string
  description: string
  week: 'A' | 'B'
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'
  style: 'strength' | 'hypertrophy'
  focus: MuscleGroup[]
  exercises: Exercise[]
  estimatedDuration: Duration
}

export interface Exercise {
  id: string
  schemaName: string
  name: string
  description: string
  type: 'strength' | 'hiit' | 'isometric'
  targetMuscles: MuscleGroup[]
  equipment: Equipment[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  instructions: string[]
  recommendedSets?: number
  recommendedReps?: RepRange
  sets?: number
  holdDuration?: Duration
  rounds?: number
  workDuration?: Duration
  restDuration?: Duration
}

export interface RepRange {
  min: number
  max: number
}

export interface Duration {
  value: number
  unit: 'seconds' | 'minutes'
}

export type MuscleGroup =
  | 'chest'
  | 'shoulders'
  | 'triceps'
  | 'core'
  | 'back'
  | 'biceps'
  | 'legs'
  | 'glutes'
  | 'fullBody'

export type Equipment = 'dumbbell' | 'bench' | 'floor'
