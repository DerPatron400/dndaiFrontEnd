import { Fragment, useRef, useState, useEffect, Suspense } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Image } from "lucide-react";
import { Select } from "@radix-ui/themes";
import { Center, Html, Stage, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Model as RollDice } from "@/components/shared/D20";

const Input = () => {
  return (
    <input
      type="text"
      placeholder="Enter your choice"
      className="bg-transparent border px-3 md:w-64 w-32 placeholder:text-[#d3d3d3] text-white py-1 rounded"
    />
  );
};

//selection component
const Selection = () => {
  return (
    <Select.Root>
      <Select.Trigger
        className="z-[50] w-32 md:!w-[20rem]  placeholder:!text-white !text-white !border !py-1 !px-2 !border-white !rounded-md"
        placeholder="Pick a Style"
      />
      <Select.Content className="z-[50] !bg-black !text-white h-full overflow-scroll ">
        <Select.Item value="Art Nouveau">Art Nouveau</Select.Item>
        <Select.Item value="Anime">Anime</Select.Item>
        <Select.Item value="Pixel Art">Pixel Art</Select.Item>
        <Select.Item value="Line Art">Line Art</Select.Item>
        <Select.Item value="Steam Punk">Steam Punk</Select.Item>
        <Select.Item value="Blender Render">Blender Render</Select.Item>
        <Select.Item value="Low-Poly Art">Low-Poly Art</Select.Item>
        <Select.Item value="Psychedelic Art">Psychedelic Art</Select.Item>
        <Select.Item value="Neon Art">Neon Art</Select.Item>
        <Select.Item value="Airbrush Art">Airbrush Art</Select.Item>
        <Select.Item value="Origami">Origami</Select.Item>
        <Select.Item value="Wood carving">Wood carving</Select.Item>
        <Select.Item value="Oil Painting">Oil Painting</Select.Item>
        <Select.Item value="Silhouette illustration">
          Silhouette illustration
        </Select.Item>
        <Select.Item value="Blueprint">Blueprint</Select.Item>
        <Select.Item value="American Impressionism">Impressionism</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

const Choice = ({ buttonText, title, isInput, onClick }) => {
  return (
    <div className="flex flex-col items-center flex-1 h-3/4">
      <div className="flex items-center w-[43vw] md:w-full h-full py-10 flex-1 flex-col gap-y-24">
        <label className="text-white md:text-2xl text-xl capitalize">
          {title}
        </label>
        <div className="flex md:flex-row flex-col gap-x-2">
          {isInput ? <Input /> : <Selection />}

          <button
            type="button"
            className="justify-center mt-2 md:mt-0 h-10 border-0 rounded-md bg-green-600 px-3  py-1 text-sm font-semibold text-white shadow-sm hover:bg-green-500  "
            onClick={onClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

const DragonHead = () => {
  const sceneRef = useRef(null);
  const { scene } = useGLTF("/models/dragon_head_4.glb");

  scene.traverse((child) => {
    if (child.isMesh) {
      child.geometry.center();
    }
  });

  useFrame((state) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y = THREE.MathUtils.lerp(
        sceneRef.current.rotation.y,
        state.pointer.x,
        0.04
      );
      sceneRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneRef.current.rotation.x,
        -state.pointer.y,
        0.04
      );
    }
  });

  return (
    <>
      <Center>
        <Html position={[window.innerWidth < 768 ? -4.3 : -5.7, 3, 0]}>
          <div className="absolute top-0 left-0 w-[30rem] h-full flex items-center justify-center text-white md:text-2xl text-[13px]">
            Please wait while we load your journey
          </div>
        </Html>
      </Center>
      <primitive ref={sceneRef} object={scene} />
    </>
  );
};

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

export default function GameLoop({ open, setOpen, addToScene, type }) {
  const cancelButtonRef = useRef(null);
  const [rollDice, setRollDice] = useState(false);
  const [loading, setLoading] = useState(false);

  //this is for rolling dice
  useEffect(() => {
    if (rollDice) {
      setTimeout(() => {
        setRollDice(false);
        setLoading(true);
      }, 7000);
    }
  }, [rollDice]);

  //this is for loading
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 5000);
    }
  }, [loading]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-1 w-full "
        initialFocus={cancelButtonRef}
        onClose={setOpen}
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
                      <RollDice />
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
                              onClick={() => {
                                addToScene("text");

                                //this starts rolling dice
                                setRollDice(true);
                              }}
                            />
                          ) : (
                            <Choice
                              buttonText={<Image />}
                              title=" Generate Image"
                              onClick={() => {
                                addToScene("image");
                                setLoading(true);
                              }}
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
