//characterStore.js
import { create } from "zustand";

const useStepperStore = create((set) => ({
  activeStep: 0,
  selectedCharacteristic: {
    name: null,
    image: null,
    description: null,
  },
  backgroundQuery: "",
  characterNameError: false,
  showModal: false,
  raceQuery: "",

  setBackgroundQuery: (backgroundQuery) => set({ backgroundQuery }),
  setRaceQuery: (raceQuery) => set({ raceQuery }),
  setActiveStep: (activeStep) => set({ activeStep }),
  setSelectedCharacteristic: (selectedCharacteristic) =>
    set({ selectedCharacteristic }),
  setShowModal: (showModal) => set({ showModal }),
  setCharacterNameError: (characterNameError) => set({ characterNameError }),
}));

export default useStepperStore;
