import { Fragment, useRef, useState, useEffect, Suspense } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Image } from "lucide-react";
import { Select } from "@radix-ui/themes";
import { Center, Html, Stage, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

const Input = () => {
  return (
    <input
      type='text'
      placeholder='Enter your choice'
      className='bg-transparent border px-3 w-64 placeholder:text-[#d3d3d3] text-white  py-1 rounded'
    />
  );
};

const Selection = () => {
  return (
    <Select.Root>
      <Select.Trigger
        className='z-[50] !w-64 placeholder:!text-white !text-white !border !px-2 !border-white !rounded-md'
        placeholder='Pick a Style'
      />
      <Select.Content className='z-[50] !bg-black !text-white '>
        <Select.Item value='orange'>Orange</Select.Item>
        <Select.Item value='apple'>Apple</Select.Item>

        <Select.Item value='carrot'>Carrot</Select.Item>
        <Select.Item value='potato'>Potato</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

const Choice = ({ buttonText, title, isInput, onClick }) => {
  return (
    <div className='flex flex-col items-center flex-1 h-3/4  '>
      <div className='flex items-center  h-full  py-10 flex-1  flex-col gap-y-24'>
        <label className='text-white text-2xl capitalize'>{title}</label>
        <div className='flex gap-x-2'>
          {isInput ? <Input /> : <Selection />}

          <button
            type='button'
            className='justify-center   h-10 border-0 rounded-md bg-green-600 px-3  py-1 text-sm font-semibold text-white shadow-sm hover:bg-green-500  '
            onClick={onClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

const RollDice = () => {
  const sceneRef = useRef(null);
  const { scene } = useGLTF("/models/d20.glb");

  useFrame(() => {
    if (sceneRef.current) {
      sceneRef.current.rotation.x += 0.1;
      sceneRef.current.rotation.y += 0.2;
    }
  });

  return <primitive ref={sceneRef} object={scene} />;
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
        <Html position={[-4.7, 3, 0]}>
          <div className='absolute  top-0 left-0 w-[30rem] h-full flex items-center justify-center text-white text-2xl'>
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

export default function GameLoop({ open, setOpen, addTextToScene }) {
  const cancelButtonRef = useRef(null);
  const [rollDice, setRollDice] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (rollDice) {
      setTimeout(() => {
        setRollDice(false);
        setLoading(true);
      }, 5000);
    }
  }, [rollDice]);

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
        as='div'
        className='relative z-1 w-full '
        initialFocus={cancelButtonRef}
        onClose={setOpen}
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
              <Dialog.Panel className='relative min-w-[60vw] h-[50vh]  border-green-500 border transform overflow-hidden rounded-lg bg-black text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='bg-black px-2 w-full pb-4 pt-5 sm:p-6 sm:pb-4 h-full'>
                  {loading ? (
                    <Scene>
                      <DragonHead />
                    </Scene>
                  ) : rollDice ? (
                    <Scene>
                      <RollDice />
                    </Scene>
                  ) : (
                    <div className='sm:flex w-fui sm:items-start w-full h-full'>
                      <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full h-full'>
                        <Dialog.Title
                          as='h3'
                          className='text-xl font-semibold leading-6 text-white'
                        >
                          Player's Menu
                        </Dialog.Title>
                        <div className='flex relative  w-full items-center h-full justify-between'>
                          <hr className='absolute rotate-90 w-72 translate-x-[-50%]  text-white top-[50%] left-[50%]' />
                          <Choice
                            buttonText={"Roll Dice"}
                            title='select path'
                            isInput
                            onClick={() => {
                              //this is used to trigger text add
                              addTextToScene();

                              //this starts rolling dice
                              setRollDice(true);
                            }}
                          />
                          <Choice
                            buttonText={<Image />}
                            title=' Generate Image'
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
