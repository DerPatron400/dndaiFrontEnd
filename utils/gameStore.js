import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useGameStore = create(
  persist(
    (set, get) => ({
      currentCharacter: null,
      currentCampaign: null,
      responseText: "",
      game: null,
      image: null,

      setCurrentCharacter: (currentCharacter) => set({ currentCharacter }),
      setCurrentCampaign: (currentCampaign) => set({ currentCampaign }),
      setResponseText: (responseText) => set({ responseText }),
      setGameImage: (image) => set({ image }),
      setGame: (game) => set({ game }),
      reset: () =>
        set({
          currentCharacter: null,
          currentCampaign: null,
          responseText: "",
          game: null,
          image: null,
        }),
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useGameStore;
