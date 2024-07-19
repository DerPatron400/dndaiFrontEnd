import { create } from "zustand";

const useControlsStore = create((set, get) => ({
  showMenu: false,
  showCreditsDialogue: false,

  setShowMenu: (showMenu) => set({ showMenu }),
  setShowCreditsDialogue: (showCreditsDialogue) => set({ showCreditsDialogue }),
}));

export default useControlsStore;
