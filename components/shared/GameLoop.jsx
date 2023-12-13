import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function GameLoop({ open, setOpen, increaseScroll }) {
  const cancelButtonRef = useRef(null);

  console.log(open);

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
              <Dialog.Panel className='relative min-w-[50vw] h-[50vh]  border-green-500 border transform overflow-hidden rounded-lg bg-black text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='bg-black px-4 w-full pb-4 pt-5 sm:p-6 sm:pb-4 h-full'>
                  <div className='sm:flex w-fui sm:items-start w-full h-full'>
                    <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full h-full'>
                      <Dialog.Title
                        as='h3'
                        className='text-xl font-semibold leading-6 text-white'
                      >
                        Player's Menu
                      </Dialog.Title>
                      <div className='flex relative  w-full items-center h-full justify-around'>
                        <hr className='absolute rotate-90 w-72 translate-x-[-35%]  text-white top-[50%] left-[50%]' />
                        <div className='flex flex-col gap-y-5 '>
                          <div className='mt-4 flex  flex-col gap-y-3'>
                            <label className='text-white text-sm'>
                              Select Your Path
                            </label>
                            <input
                              type='text'
                              placeholder='Enter your choice'
                              className='bg-transparent border px-3 text-white  py-1 rounded'
                            />
                          </div>
                          <button
                            type='button'
                            className='justify-center   h-10 border-0 rounded-md bg-green-600 px-3  py-1 text-sm font-semibold text-white shadow-sm hover:bg-green-500  '
                            onClick={() => {
                              setOpen(false);

                              increaseScroll();
                            }}
                          >
                            Dice
                          </button>
                        </div>

                        <button
                          type='button'
                          className='justify-center   h-10 border-0 rounded-md bg-green-600 px-2  py-1 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 '
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          Generate Image
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
