import { Fragment, useRef, useState, useEffect, Suspense } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Image } from "lucide-react";
import { Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Model as RollDice } from "@/components/shared/D20";
import toast from "react-hot-toast";
import axios from "axios";
import useUserStore from "@/utils/store/userStore";
import { useSearchParams } from "next/navigation";
import useIntroTextStore from "@/utils/store/introTextStore";
import DragonHead from "@/components/shared/GameLoop/DragonHead";

import Choice from "@/components/shared/GameLoop/Choice";

function Scene({ children }) {
  return (
    <Canvas className="z-10">
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
  addToScene,
  type,
  visualText,
}) {
  const cancelButtonRef = useRef(null);
  const [rollDice, setRollDice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFace, setSelectedFace] = useState(null);
  const [input, setInput] = useState("");
  const [selection, setSelection] = useState("");
  const user = useUserStore((state) => state.user);
  const { setIntroText, setImage } = useIntroTextStore((state) => state);
  const searchParams = useSearchParams();

  const conversationIndex = searchParams.get("conversationIndex");

  //this is for rolling dice
  useEffect(() => {
    if (rollDice) {
      setTimeout(async () => {
        setRollDice(false);
        setLoading(true);
        try {
          const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
          const bodyData = {
            userInput: input,
            randomNumber: selectedFace,
            conversationIndex,
          };

          const response = await axios.post(
            BACKEND_URL + "/gpt4/user-input",
            bodyData,
            {
              params: {
                _id: user._id,
              },
            }
          );
          setIntroText(response.data.responseText);

          addToScene("text");
          setInput("");
          setOpen(false);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }, 3000);
    }
  }, [selectedFace]);

  const handleRollDice = () => {
    if (input.trim() === "") {
      toast.error("Please add your choice");
      return;
    }
    //this starts rolling dice
    setRollDice(true);
  };

  const handleImageGeneration = async () => {
    if (selection.trim() === "") {
      toast.error("Please select a style");
      return;
    }
    setLoading(true);
    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const bodyData = {
        visualText,
        imageCount: 1,
      };

      const response = await axios.post(
        BACKEND_URL + "/generateImages",
        bodyData,
        {
          params: {
            _id: user._id,
          },
        }
      );

      setImage(response.data[0]);

      addToScene("image");
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
        as="div"
        className="relative z-1 w-full "
        initialFocus={cancelButtonRef}
        onClose={() => {
          if (type === "image") {
            setOpen(false);
          }
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300 transition-all"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
          <div className="flex min-h-full min-w-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative min-w-[40vw] h-[50vh] border-green-500 border transform overflow-hidden rounded-lg bg-black text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-black px-2 w-full pb-4 pt-5 sm:p-6 sm:pb-4 h-full ">
                  {loading ? (
                    <Scene>
                      <DragonHead />
                    </Scene>
                  ) : rollDice ? (
                    <Scene>
                      <RollDice
                        selectedFace={selectedFace}
                        setSelectedFace={setSelectedFace}
                      />
                    </Scene>
                  ) : (
                    <div className="sm:flex w-fui sm:items-start w-full h-full">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full h-full">
                        <Dialog.Title
                          as="h3"
                          className="text-xl font-semibold leading-6 text-white"
                        >
                          Player's Menu
                        </Dialog.Title>
                        <div className="flex relative  w-full items-center h-full justify-between">
                          {type === "text" ? (
                            <Choice
                              buttonText={"Roll Dice"}
                              title="select path"
                              isInput
                              input={input}
                              setInput={setInput}
                              onClick={handleRollDice}
                            />
                          ) : (
                            <Choice
                              buttonText={<Image />}
                              title=" Generate Image"
                              input={selection}
                              setInput={setSelection}
                              onClick={handleImageGeneration}
                            />
                          )}
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
