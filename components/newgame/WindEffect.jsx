import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Instances, Instance } from "@react-three/drei";
import { AdditiveBlending, DoubleSide, MathUtils } from "three";
import gsap from "gsap";
import * as THREE from "three";

function WindShape() {
  const ref = useRef();

  let randomPosition = {
    x: 0,
    y: 0,
    z: 0,
  };
  let randomSpeed = 0;

  const resetRandomPosition = () => {
    randomPosition = {
      x: MathUtils.randFloatSpread(8),
      y: MathUtils.randFloatSpread(5),
      z: MathUtils.randFloatSpread(8),
    };
    randomSpeed = MathUtils.randFloat(16, 20);
  };

  resetRandomPosition();

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.position.z += randomSpeed * delta;
      if (ref.current.position.z > 5) {
        resetRandomPosition();
        ref.current.position.z = randomPosition.z;
      }
    }
  });
  return (
    <Instance
      ref={ref}
      color='white'
      position={[randomPosition.x, randomPosition.y, randomPosition.z]}
      rotation-y={Math.PI / 2}
    />
  );
}
const WindEffect = ({ isMoving }) => {
  const materialRef = useRef();
  const INSTANCE = {
    number: 240,
  };

  useEffect(() => {
    if (isMoving) {
      gsap.to(materialRef.current, {
        opacity: 0.15,
        duration: 0.5,
      });
    } else {
      gsap.to(materialRef.current, {
        opacity: 0,
        duration: 0.1,
      });
    }
  }, [isMoving]);
  return (
    <group>
      <Instances>
        <planeGeometry args={[1, 0.004]} />
        <meshBasicMaterial
          side={DoubleSide}
          blending={AdditiveBlending}
          ref={materialRef}
          transparent
        />
        {Array(INSTANCE.number)
          .fill()
          .map((_, key) => (
            <WindShape key={key} />
          ))}
      </Instances>
    </group>
  );
};

export default WindEffect;
