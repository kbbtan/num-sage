import { create } from "zustand";
import * as Colyseus from "colyseus.js";

interface AppState {
  counter: number;
  attempted: number;
  incorrect: { [prompt: string]: number };
  isCompleted: boolean;
  communicating: boolean;
  gameRoom: Colyseus.Room | null;
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
  setIsCompleted: (isCompleted: boolean) => void;
  setCommunicating: (communicating: boolean) => void;
  setGameRoom: (room: Colyseus.Room | null) => void;
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

  isCompleted: false,
  setIsCompleted: (isCompleted: boolean) => set({ isCompleted }),

  communicating: false,
  setCommunicating: (communicating: boolean) => set({ communicating }),

  gameRoom: null,
  setGameRoom: (room: Colyseus.Room | null) => set({ gameRoom: room }),

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
