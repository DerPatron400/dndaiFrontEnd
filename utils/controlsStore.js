import { create } from "zustand";

const useControlsStore = create((set, get) => ({
  showMenu: false,

  setShowMenu: (showMenu) => set({ showMenu }),
}));

export default useControlsStore;
