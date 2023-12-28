import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Html, Center } from "@react-three/drei";

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
        <Html position={[window.innerWidth < 768 ? -4.3 : -5, 3, 0]}>
          <div className='absolute top-0 w-[30rem] h-full flex items-center justify-center text-white md:text-2xl text-[13px]'>
            Please wait while we load your journey
          </div>
        </Html>
      </Center>
      <primitive ref={sceneRef} object={scene} />
    </>
  );
};

export default DragonHead;
