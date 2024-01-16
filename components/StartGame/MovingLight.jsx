import { useGLTF, SpotLight, useDepthBuffer } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function MovingLight({
  color,
  position,
  vec = new THREE.Vector3(),
  modelPosition,
}) {
  const light = useRef();

  const viewport = useThree((state) => state.viewport);

  useFrame((state) => {
    if (light.current) {
      light.current.position.lerp(
        vec.set(
          (state.pointer.x * viewport.width) / 2 - modelPosition.x - 0.1,
          (state.pointer.y * viewport.height) / 2,
          3.5
        ),
        0.1
      );
    }
  });
  return (
    <>
      <pointLight
        scale={1}
        ref={light}
        penumbra={2}
        intensity={10}
        color={color}
        position={position}
      />
    </>
  );
}

export default MovingLight;
