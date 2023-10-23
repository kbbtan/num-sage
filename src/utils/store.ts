import { create } from "zustand";

interface AppState {
  counter: number;
  attempted: number;
  incorrect: { [prompt: string]: number };
  isCompleted: boolean;
  communicating: boolean;
  roomID: string;
  playerID: string;
  playerScores: { [id: string]: number };
  finalScores: { [id: string]: number };
  incrementCounter: () => void;
  resetCounter: () => void;
  incrementAttempted: () => void;
  resetAttempted: () => void;
  updateIncorrect: (
    fn: (prev: { [prompt: string]: number }) => { [prompt: string]: number },
  ) => void;
  resetIncorrect: () => void;
  setCommunicating: (communicating: boolean) => void;
  setIsCompleted: (isCompleted: boolean) => void;
  setRoomID: (roomID: string) => void;
  setPlayerID: (playerID: string) => void;
  updatePlayerScores: (
    fn: (prev: { [id: string]: number }) => { [id: string]: number },
  ) => void;
  setPlayerScores: (playerScores: { [id: string]: number }) => void;
  updateFinalScores: (
    fn: (prev: { [id: string]: number }) => { [id: string]: number },
  ) => void;
  setFinalScores: (finalScores: { [id: string]: number }) => void;
}

export const useAppStore = create<AppState>((set) => ({
  counter: 0,
  incrementCounter: () => set((state) => ({ counter: state.counter + 1 })),
  resetCounter: () => set({ counter: 0 }),

  attempted: 0,
  incrementAttempted: () =>
    set((state) => ({ attempted: state.attempted + 1 })),
  resetAttempted: () => set({ attempted: 0 }),

  incorrect: {},
  updateIncorrect: (
    fn: (prev: { [prompt: string]: number }) => { [prompt: string]: number },
  ) => set((state) => ({ incorrect: fn(state.incorrect) })),
  resetIncorrect: () => set({ incorrect: {} }),

  communicating: false,
  setCommunicating: (communicating: boolean) => set({ communicating }),

  isCompleted: false,
  setIsCompleted: (isCompleted: boolean) => set({ isCompleted }),
  roomID: "",
  setRoomID: (roomID: string) => set({ roomID }),
  playerID: "",
  setPlayerID: (playerID: string) => set({ playerID }),

  playerScores: {},
  updatePlayerScores: (
    fn: (prev: { [id: string]: number }) => { [id: string]: number },
  ) => set((state) => ({ playerScores: fn(state.playerScores) })),
  setPlayerScores: (playerScores: { [id: string]: number }) =>
    set({ playerScores }),

  finalScores: {},
  updateFinalScores: (
    fn: (prev: { [id: string]: number }) => { [id: string]: number },
  ) => set((state) => ({ finalScores: fn(state.finalScores) })),
  setFinalScores: (finalScores: { [id: string]: number }) =>
    set({ finalScores }),
}));
