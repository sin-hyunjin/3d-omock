import { create } from "zustand";
import { Stone, OmokStore } from "@/types/omok.type";

interface GameState {
  stones: Stone[];
  addStone: (stone: Stone) => void;
  resetStones: () => void;
}
export const useOmokStore = create<OmokStore>((set) => ({
  stones: [],
  currentColor: "black",
  addStone: (stone) => {
    set((state) => ({
      stones: [...state.stones, stone],
    }));
  },
  toggleColor: () => {
    set((state) => ({
      currentColor: state.currentColor === "black" ? "white" : "black",
    }));
  },
  resetColor: () => {
    set({ currentColor: "black" });
  },
}));

// 게임 상태관리
export const useGameStateStore = create<GameState>((set) => {
  const savedStones = localStorage.getItem("stones");
  const initialStones = savedStones ? JSON.parse(savedStones) : [];

  return {
    stones: initialStones,
    addStone: (stone) =>
      set((state) => {
        const newStones = [...state.stones, stone];
        localStorage.setItem("stones", JSON.stringify(newStones));
        return { stones: newStones };
      }),
    resetStones: () => {
      localStorage.removeItem("stones");
      set({ stones: [] });
      useOmokStore.getState().resetColor(); //
    },
  };
});
