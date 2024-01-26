import React from "react";
import { fadeOnBeforeCompile } from "@/utils/fadeShader";
import { useGLTF } from "@react-three/drei";

function Cloud({ opacity, ...props }) {
  const { nodes, materials } = useGLTF("/models/cloud/model.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Node.geometry}>
        <meshStandardMaterial
          onBeforeCompile={fadeOnBeforeCompile}
          envMapIntensity={2}
          transparent
          opacity={opacity}
        />
      </mesh>
    </group>
  );
}

export default function Clouds() {
  return (
    <>
      {" "}
      <Cloud scale={[1, 1, 1.5]} position={[-3.5, -1.2, -400]} />
      <Cloud
        scale={[1, 1, 2]}
        position={[3.5, -1, -300]}
        rotation-y={Math.PI}
      />
      <Cloud
        scale={[1, 1, 1]}
        position={[-3.5, 0.2, -200]}
        rotation-y={Math.PI / 3}
      />
      <Cloud scale={[1, 1, 1]} position={[3.5, 0.2, -350]} />
      <Cloud
        scale={[0.4, 0.4, 0.4]}
        rotation-y={Math.PI / 9}
        position={[1, -0.2, -12]}
      />
      <Cloud scale={[0.3, 0.5, 2]} position={[-4, -0.5, -53]} />
      <Cloud scale={[0.8, 0.8, 0.8]} position={[-1, -1.5, -100]} />
    </>
  );
}
useGLTF.preload("/models/cloud/model.glb");
