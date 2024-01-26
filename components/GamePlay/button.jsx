import { useState, useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Text, shaderMaterial, RoundedBox } from "@react-three/drei";
import { fadeOnBeforeCompile } from "@/utils/fadeShader";
import { TextureLoader } from "three";

const Button = ({ onClick }) => {
  const btntexture = new TextureLoader().load("/download.jpeg");
  return (
    <group position={[1, -1.4, -0.1]}>
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
        <RoundedBox args={[2, 1, 0.7]} radius={0.2} smoothness={4}>
          <meshStandardMaterial
            onBeforeCompile={fadeOnBeforeCompile}
            color={"#0B6623"}
            transparent
            opacity={1}
          />
        </RoundedBox>
      </mesh>
      <mesh position={[0, 0, 0.4]}>
        <Text fontSize={0.24} color='white' anchorX='center' anchorY='middle'>
          <meshStandardMaterial
            onBeforeCompile={fadeOnBeforeCompile}
            color={"#22c55e"}
          />
          Generate Image
        </Text>
      </mesh>
    </group>
  );
};

export default Button;
