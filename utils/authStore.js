import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const authStore = create(
  persist(
    (set, get) => ({
      email: "",
      setEmail: (email) => set({ email }),
    }),
    {
      name: "auth-user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default authStore;
