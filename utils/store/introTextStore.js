import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useIntroTextStore = create(
  persist(
    (set, get) => ({
      introText: "",
      setIntroText: (introText) => set({ introText }),
    }),
    {
      name: "into-text-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

useIntroTextStore.subscribe(
  (introText) => console.log("introText", introText),
  (state) => state.introText
);

export default useIntroTextStore;
