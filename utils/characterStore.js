//characterStore.js
import { create } from "zustand";

const useStepperStore = create((set) => ({
  activeStep: 0,
  setActiveStep: (activeStep) => set({ activeStep }),
  backgroundQuery: "",
  setBackgroundQuery: (backgroundQuery) => set({ backgroundQuery }),
  raceQuery: "",
  setRaceQuery: (raceQuery) => set({ raceQuery }),
  selectedCharacteristic: {
    name: null,
    image: null,
    description: null,
  },
  setSelectedCharacteristic: (selectedCharacteristic) =>
    set({ selectedCharacteristic }),
  showModal: false,
  setShowModal: (showModal) => set({ showModal }),
  
}));

export default useStepperStore;
