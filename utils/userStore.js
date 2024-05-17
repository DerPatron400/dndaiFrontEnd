import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,

      setUser: (user) => set({ user }),
      setCredits: (credits) => set({ user: { ...get().user, credits } }),
      setGreenCredits: (greenCredits) =>
        set({ user: { ...get().user, greenCredits } }),
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useUserStore;
