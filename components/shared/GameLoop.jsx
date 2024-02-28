import { Fragment, useRef, useState, Suspense } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Image } from "lucide-react";
import { Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import toast from "react-hot-toast";
import useUserStore from "@/utils/store/userStore";
import useIntroTextStore from "@/utils/store/introTextStore";
import DragonHead from "@/components/shared/GameLoop/DragonHead";
import Choice from "@/components/shared/GameLoop/Choice";
import { Model as RollDice } from "@/components/shared/D20";
import { generateImage } from "@/api/game";

function Scene({ children }) {
  return (
    <Canvas className='z-10'>
      <Suspense fallback={null}>
        <pointLight position={[10, 10, 10]} />
        <Stage shadows={false} environment={"apartment"}>
          {children}
        </Stage>
      </Suspense>
    </Canvas>
  );
}

export default function GameLoop({
  open,
  setOpen,
  visualText,
  rollDice,
  setSelectedFace,
  selectedFace,
  loading,
  setLoading,
}) {
  const cancelButtonRef = useRef(null);

  const [selection, setSelection] = useState("");
  const { user, setCredits } = useUserStore((state) => state);
  const { setImage } = useIntroTextStore((state) => state);

  const handleImageGeneration = async () => {
    if (selection.trim() === "") {
      toast.error("Please select a style");
      return;
    }
    setLoading(true);
    try {
      if (user.credits <= 0) {
        toast.error(
          "You don't have enough Purple credits to generate an Image"
        );

        return;
      }

      const bodyData = {
        visualText: visualText + " in " + selection,
        imageCount: 1,
      };

      const data = await generateImage(bodyData, user.token);

      setImage(data.image);
      setCredits(data.credits);

      setSelection("");
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-1 w-full '
        initialFocus={cancelButtonRef}
        onClose={() => {
          if (!loading && !rollDice) setOpen(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300 transition-all'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto '>
          <div className='flex min-h-full min-w-full items-center justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative min-w-[70vw] !h-[60vh] md:h-[50vh] border-green-500 border transform overflow-hidden rounded-lg bg-black text-left shadow-xl transition-all sm:my-8 sm:w-1/2 md:min-w-[40vw]'>
                <div className='bg-black px-2 w-full pb-4 pt-5 sm:p-6 sm:pb-4 h-full '>
                  {loading ? (
                    <>
                      <Scene>
                        <DragonHead />
                      </Scene>
                      <div className='absolute top-0 z-[10] left-0 px-5 text-lg md:text-2xl pt-5 flex items-center justify-center w-full text-white'>
                        Please wait while we load your journey
                      </div>
                    </>
                  ) : rollDice ? (
                    <Scene>
                      <RollDice
                        selectedFace={selectedFace}
                        setSelectedFace={setSelectedFace}
                      />
                    </Scene>
                  ) : (
                    <div className='flex   items-start w-full h-full'>
                      <div className='mt-3 sm:ml-4 sm:mt-0 text-center w-full h-full'>
                        <Dialog.Title
                          as='h3'
                          className='text-xl font-semibold leading-6 mb-5 text-white '
                        >
                          Generate Image
                        </Dialog.Title>
                        <div className='flex flex-col text-white  justify-center relative  w-full items-center h-full '>
                          {visualText}
                          <Choice
                            buttonText={<Image />}
                            input={selection}
                            setInput={setSelection}
                            onClick={handleImageGeneration}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
