import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: {
        email: "",
      },
      totalCharacters: null,
      totalCampaigns: null,
      totalFavCampaigns: null,
      totalImages: null,
      totalPublicImages: null,

      setUser: (user) => set({ user }),
      setBlueCredits: (blueCredits) =>
        set({ user: { ...get().user, blueCredits } }),
      setYellowCredits: (yellowCredits) =>
        set({ user: { ...get().user, yellowCredits } }),
      setUserStared: (stared) => set({ user: { ...get().user, stared } }),
      setTotalCharacters: (totalCharacters) => set({ totalCharacters }),
      setTotalCampaigns: (totalCampaigns) => set({ totalCampaigns }),
      setTotalFavCampaigns: (totalFavCampaigns) => set({ totalFavCampaigns }),
      setTotalImages: (totalImages) => set({ totalImages }),
      setTotalPublicImages: (totalPublicImages) => set({ totalPublicImages }),
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useUserStore;
