import React, { useEffect, useState } from "react";
import { Text } from "@react-three/drei";
import Button from "./button";
import { fadeOnBeforeCompileFlat } from "../../../utils/fadeShader";

export default function PathText({ object, setType, setOpen }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 756);
  }, []);

  const anchorX = object?.position[0] < 0 ? "right" : "left";

  const subTextPos = object?.heading
    ? object.heading.length > 30
      ? 0.5
      : 1.4
    : 2;
  const titlePos =
    object?.heading?.length < 17 ? 2.5 : object?.heading?.length < 32 ? 3.3 : 4;
  return object.type === "text" ? (
    <group position={object.position}>
      <Text
        color='white'
        anchorX={isMobile ? "center" : anchorX}
        anchorY='center'
        fontSize={0.6}
        textAlign={isMobile ? "center" : anchorX}
        position-y={isMobile ? titlePos+2 : titlePos+1}
        maxWidth={5}
        font={"/fonts/DMSerifDisplay-Regular.ttf"}
        letterSpacing={-0.03} // 3%
      >
        {object.heading?.trim()}
        <meshStandardMaterial
          color={"white"}
          onBeforeCompile={fadeOnBeforeCompileFlat}
        />
      </Text>
      <Text
        color='white'
        anchorX={isMobile ? "center" : anchorX}
        anchorY='top'
        textAlign={isMobile ? "center" : anchorX}
        position-y={isMobile ? subTextPos+2 : subTextPos+1}
        fontSize={0.3}
        maxWidth={isMobile ? 3 : 5}
        font={"/fonts/Inter-Regular.ttf"}
      >
        {object.text.trim()}
        <meshStandardMaterial
          color={"white"}
          onBeforeCompile={fadeOnBeforeCompileFlat}
        />
      </Text>

      {object.isVisual && (
        <Button
          xPosition={object.position[0]}
          onClick={() => {
            setType("image");
            setTimeout(() => {
              setOpen(true);
            }, 1000);
          }}
        />
      )}
    </group>
  ) : (
    <group position={object.position}>
      <mesh>
        <planeGeometry args={[5, 5]} />
        <meshBasicMaterial map={object.image}></meshBasicMaterial>
      </mesh>
    </group>
  );
}
