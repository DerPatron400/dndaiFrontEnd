import { useState, useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Text } from "@react-three/drei";

const Button = ({ onClick }) => {
  return (
    <group position={[0, -1.4, 0.1]}>
      <mesh
        position={[0, 0, -0.3]}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
        onClick={onClick}
      >
        <boxGeometry args={[2, 1, 0.7]} />
        <meshPhongMaterial color={"#22c55e"} />
      </mesh>
      <mesh position={[0, 0, 0.4]}>
        <Text fontSize={0.24} color='white' anchorX='center' anchorY='middle'>
          Generate Image
        </Text>
      </mesh>
    </group>
  );
};

export default Button;
