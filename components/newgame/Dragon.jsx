import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function Model(props) {
  const group = useRef();
  const { animations, scene } = useGLTF("/dragon.glb");
  let mixer, action;
  const modelAnimations = () => {
    mixer = new THREE.AnimationMixer(group.current);
    const clip = animations[0];
    action = mixer.clipAction(clip);
    action.play();
    action.loop = THREE.LoopRepeat;
    mixer.update(0.03);
    updateMixer();
  };

  const updateMixer = () => {
    mixer.update(0.03);
    //add some wait

    requestAnimationFrame(updateMixer);
  };

  useEffect(() => {
    if (group.current) modelAnimations();
  }, [group.current]);

  return (
    <group
      ref={group}
      rotation={[0.3, Math.PI, 0]}
      position={[
        window.innerWidth < 768 ? 0 : 0,
        window.innerWidth < 768 ? -1 : -2,
        0,
      ]}
      scale={window.innerWidth < 768 ? 0.5 : 1}
    >
      <primitive object={scene} dispose={null} position={[0, 0, 0]} />
    </group>
  );
}

useGLTF.preload("/dragon.glb");
