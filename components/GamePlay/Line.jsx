import React from "react";
import { fadeOnBeforeCompile } from "../../utils/fadeShader";
const LINE_NB_POINTS = 1200;
export default function Line({ shape, curve }) {
  return (
    <group position-y={-2}>
      <mesh>
        <extrudeGeometry
          args={[
            shape,
            {
              steps: LINE_NB_POINTS,
              bevelEnabled: false,
              extrudePath: curve,
            },
          ]}
        />
        <meshStandardMaterial
          color={"white"}
          opacity={1}
          transparent
          envMapIntensity={2}
          onBeforeCompile={fadeOnBeforeCompile}
        />
      </mesh>
    </group>
  );
}
