import { useState, useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

const Button = ({ onClick }) => {
  return (
    <group position={[0, -1.4, 0.1]}>
      <mesh
        position={[0, 0, -0.1]}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
        onClick={onClick}
      >
        <boxGeometry args={[2, 1, 0.1]} />
        <meshBasicMaterial color={"white"} />
      </mesh>
      <mesh>
        <Text fontSize={0.2} color='black' anchorX='center' anchorY='middle'>
          Generate Image
        </Text>
      </mesh>
    </group>
  );
};

export default Button;
