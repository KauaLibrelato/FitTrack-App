export interface ExerciseType {
  value: string;
  label: string;
}

export const exercisesTypes: ExerciseType[] = [
  { value: "CARDIO", label: "Cardio" },
  { value: "STRENGTH", label: "Força" },
  { value: "FLEXIBILITY", label: "Flexibilidade" },
  { value: "BALANCE", label: "Equilíbrio" },
  { value: "ENDURANCE", label: "Resistência" },
  { value: "POWER", label: "Potência" },
  { value: "SPEED", label: "Velocidade" },
  { value: "AGILITY", label: "Agilidade" },
  { value: "PLYOMETRICS", label: "Pliometria" },
  { value: "FUNCTIONAL", label: "Funcional" },
  { value: "HIIT", label: "Treinamento Intervalado de Alta Intensidade" },
  { value: "CIRCUIT", label: "Circuito" },
  { value: "TABATA", label: "Tabata" },
  { value: "INTERVAL", label: "Intervalo" },
  { value: "CROSSFIT", label: "Crossfit" },
  { value: "CALISTHENICS", label: "Calistenia" },
  { value: "BODYWEIGHT", label: "Peso Corporal" },
  { value: "WEIGHTLIFTING", label: "Levantamento de Peso" },
  { value: "BODYBUILDING", label: "Musculação" },
  { value: "YOGA", label: "Yoga" },
  { value: "PILATES", label: "Pilates" },
  { value: "BARRE", label: "Barra" },
  { value: "DANCE", label: "Dança" },
  { value: "MARTIAL_ARTS", label: "Artes Marciais" },
  { value: "BOXING", label: "Boxe" },
  { value: "KICKBOXING", label: "Kickboxing" },
  { value: "MUAY_THAI", label: "Muay Thai" },
  { value: "JIU_JITSU", label: "Jiu-Jitsu" },
  { value: "WRESTLING", label: "Luta Livre" },
  { value: "MMA", label: "MMA" },
  { value: "FITNESS", label: "Fitness" },
  { value: "SPORTS", label: "Esportes" },
  { value: "REHABILITATION", label: "Reabilitação" },
  { value: "PHYSIOTHERAPY", label: "Fisioterapia" },
  { value: "OTHER", label: "Outro" },
];