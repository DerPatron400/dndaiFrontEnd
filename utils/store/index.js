import { create } from "zustand";

const useSoundStore = create((set) => ({
  audio: null,
  setAudio: (audio) => set({ audio }),
}));

export default useSoundStore;
