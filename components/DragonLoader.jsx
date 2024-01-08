import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stage } from "@react-three/drei";
import DragonHead from "@/components/shared/GameLoop/DragonHead";
import { Dialog, Transition } from "@headlessui/react";

export default function Loader({ text }) {
  return (
    <Transition.Root show={true}>
      <Dialog
        as="div"
        className="relative z-1 w-full "
        onClose={() => {
          console.log("closed");
        }}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
          <div className="flex min-h-full min-w-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative min-w-[70vw] h-[50vh] border-green-500 border transform overflow-hidden rounded-lg bg-black text-left shadow-xl transition-all sm:my-8 sm:w-1/2 md:min-w-[40vw]">
                <div className="relative bg-black px-2 w-full pb-4 pt-5 sm:p-6 sm:pb-4 h-full  ">
                  <Canvas className="z-10">
                    <Suspense fallback={null}>
                      <pointLight position={[10, 10, 10]} />
                      <Stage shadows={false} environment={"apartment"}>
                        <DragonHead />
                      </Stage>
                    </Suspense>
                  </Canvas>
                  <span className="text-white absolute top-4 left-0 right-0 flex items-center justify-center">
                    {text}
                  </span>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
