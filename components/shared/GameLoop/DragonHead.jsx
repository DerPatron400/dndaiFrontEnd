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

  return <primitive ref={sceneRef} object={scene} />;
};

export default DragonHead;
