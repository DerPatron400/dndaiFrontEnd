import React, { useEffect, useState } from "react";
import { Text, RoundedBox } from "@react-three/drei";
import { fadeOnBeforeCompile } from "@/utils/fadeShader";

const Button = ({ onClick, xPosition }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 756);
  }, []);

  return (
    <group position={[isMobile ? 0 : xPosition < 0 ? -1 : 1, -0, -0.1]}>
      <mesh
        position={[0, 0, -0.3]}
        onPointerOver={(event) => {
          document.body.style.cursor = "pointer";
          // Change color on hover
          event.object.material.color.set("#903DDB"); // Set the desired hover color
        }}
        onPointerOut={(event) => {
          document.body.style.cursor = "default";
          // Reset color on pointer out
          event.object.material.color.set("#862ED3"); // Set the original color
        }}
        onClick={onClick}
      >
        <RoundedBox args={[2, 1, 0.7]} radius={0.2} smoothness={4}>
          <meshStandardMaterial
            onBeforeCompile={fadeOnBeforeCompile}
            color={"#862ED3"}
            transparent
            opacity={1}
          />
        </RoundedBox>
      </mesh>
      <mesh position={[0, 0, 0.4]}>
        <Text fontSize={0.24} color='white' anchorX='center' anchorY='middle'>
          <meshStandardMaterial
            onBeforeCompile={fadeOnBeforeCompile}
            color={"#8126D0"}
          />
          Generate Image
        </Text>
      </mesh>
    </group>
  );
};

export default Button;
