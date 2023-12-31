import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import toast from "react-hot-toast";

const facePositions = {
  face1: { value: [-6, 0.3, 0] },
  face2: {
    value: [-3.2, 0.3, 3.8],
  },
  face3: {
    value: [9.2, 4.8, 3.8],
  },
  face4: {
    value: [-1.2, 6.2, 3.6],
  },
  face5: {
    value: [-1, 6.4, 1.2],
  },
  face6: {
    value: [-0.8, 4.2, 1.2],
  },
  face7: {
    value: [2.2, 0.2, 1.2],
  },
  face8: {
    value: [-0.8, -1, 1.2],
  },
  face9: {
    value: [5.2, 2.2, 0.2],
  },
  face10: {
    value: [5.5, 3.6, 0.2],
  },
  face11: {
    value: [2.4, 3.6, 0.2],
  },
  face12: {
    value: [2.4, 1.6, 1],
  },
  face13: {
    value: [-2, 4.8, 7.6],
  },
  face14: {
    value: [3.6, -1.6, 0],
  },
  face15: {
    value: [0.2, 1.6, 0.8],
  },
  face16: {
    value: [2.2, 3, 7.6],
  },
  face17: {
    value: [2.8, 1, 3.4],
  },
  face18: {
    value: [6.2, 6.6, 4],
  },
  face19: {
    value: [0, 3.5, 0.4],
  },
  face20: {
    value: [7, 4, 4.2, 6.2],
  },
};

export function Model({ selectedFace, setSelectedFace }) {
  const { nodes, materials } = useGLTF("/models/d20-transformed.glb");
  const sceneRef = useRef(null);
  const [rolling, setRolling] = useState(true);

  useEffect(() => {
    const rollDice = async () => {
      await new Promise((resolve) => setTimeout(resolve, 8000));

      setRolling(false);

      // Generate a random number between 1 and 20
      let randomFace = Math.floor(Math.random() * 20) + 1;

      // to make sure that use effect is triggered
      if (randomFace === selectedFace) {
        randomFace = randomFace === 20 ? 1 : randomFace + 1;
      }
      setSelectedFace(randomFace);
      toast.success(`You rolled a ${randomFace}!`);

      // Set the position for the selected face
      const newPosition = facePositions[`face${randomFace}`]?.value || [
        0, 0, 0,
      ];
      sceneRef.current.rotation.set(...newPosition);
    };

    if (rolling) {
      rollDice();
    }
  }, [rolling]);

  useFrame(() => {
    if (sceneRef.current && rolling) {
      sceneRef.current.rotation.x += 0.1;
      sceneRef.current.rotation.y += 0.2;
    }
  });

  return (
    <group dispose={null} ref={sceneRef}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh
            geometry={nodes.Dice_D20_low_Bake_0.geometry}
            material={materials.Bake}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/d20-transformed.glb");
