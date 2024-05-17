import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

const facePositions = {
  face1: {
    value: [3.5, 4.8, -1.2],
  },
  face2: {
    value: [5.92, 4.52, -1.41],
  },
  face3: {
    value: [8.2, 5.62, -1.65],
  },
  face4: {
    value: [11.92, 6.15, -1.78],
  },
  face5: {
    value: [5.21, 2.22, -1.78],
  },
  face6: {
    value: [3.73, 3.29, 0.4],
  },
  face7: {
    value: [-0.67, 3.27, 0.15],
  },
  face8: {
    value: [1.14, 1.93, -0.3],
  },
  face9: {
    value: [2.45, 3.27, -2.35],
  },
  face10: {
    value: [2.57, 6.73, -1.08],
  },
  face11: {
    value: [5.68, 6.73, -1.08],
  },
  face12: {
    value: [9.28, 6.98, -0.88],
  },
  face13: {
    value: [9.28, 6.98, -0.88],
  },
  face14: {
    value: [2.74, 2.74, -0.88],
  },
  face15: {
    value: [5.72, 3.35, -0.88],
  },
  face16: {
    value: [2.15, 4.25, -0.88],
  },
  face17: {
    value: [0.23, -3.84, -0.88],
  },
  face18: {
    value: [3.7, 8.17, -0.88],
  },
  face19: {
    value: [3.23, 4.61, -0.88],
  },
  face20: {
    value: [2.52, 8.11, -0.88],
  },
};

export function Model({ selectedFace, setSelectedFace, rolling, setRolling }) {
  const { scene } = useGLTF("/models/d20.glb");
  const sceneRef = useRef(null);

  // const { rotation } = useControls({
  //   rotation: {
  //     step: 0.01,
  //     value: [0, 0, 0],
  //   },
  // });

  useEffect(() => {
    const rollDice = async (randomFace) => {
      await new Promise((resolve) => setTimeout(resolve, 4000));

      setRolling(false);

      // Set the position for the selected face
      const newPosition = facePositions[`face${randomFace}`]?.value || [
        0, 0, 0,
      ];
      sceneRef.current?.rotation.set(...newPosition);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSelectedFace(randomFace);
    };

    if (rolling) {
      // Generate a random number between 1 and 20
      let randomFace = Math.floor(Math.random() * 20) + 1;

      // to make sure that use effect is triggered
      if (randomFace === selectedFace) {
        randomFace = randomFace === 20 ? 1 : randomFace + 1;
      }

      rollDice(randomFace);
    }
  }, [rolling]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.metalness = 0;
        //increase roughness
        child.material.roughness = 2;
      }
    });
  }, []);

  useFrame(() => {
    if (sceneRef.current && rolling) {
      sceneRef.current.rotation.x += 0.08;
      sceneRef.current.rotation.y += 0.15;
    }
  });

  return (
    <group dispose={null} ref={sceneRef} rotation={[0.95, -0.44, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/d20.glb");
