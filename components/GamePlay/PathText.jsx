import React from "react";
import { Text } from "@react-three/drei";
import Button from "./Button";
import { fadeOnBeforeCompileFlat } from "../../utils/fadeShader";

export default function PathText({ object, key, setType, setOpen }) {
  const subTextPos = object?.heading
    ? object.heading.length > 30
      ? 0.5
      : 1.4
    : 2;
  const titlePos =
    object?.heading?.length < 16 ? 2.5 : object?.heading?.length < 25 ? 3.3 : 4;
  return object.type === "text" ? (
    <group key={key} position={object.position}>
      <Text
        color='white'
        anchorX={"left"}
        anchorY='center'
        fontSize={0.6}
        position-y={titlePos}
        maxWidth={4.8}
        font={"/fonts/DMSerifDisplay-Regular.ttf"}
      >
        {object.heading?.trim()}
        <meshStandardMaterial
          color={"white"}
          onBeforeCompile={fadeOnBeforeCompileFlat}
        />
      </Text>
      <Text
        color='white'
        anchorX={"left"}
        anchorY='top'
        position-y={subTextPos}
        fontSize={0.3}
        maxWidth={5}
        font={"/fonts/Inter-Regular.ttf"}
      >
        {object.text}
        <meshStandardMaterial
          color={"white"}
          onBeforeCompile={fadeOnBeforeCompileFlat}
        />
      </Text>

      {object.isVisual && (
        <Button
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
    <group key={key} position={object.position}>
      <mesh>
        <planeGeometry args={[5, 5]} />
        <meshBasicMaterial map={object.image}></meshBasicMaterial>
      </mesh>
    </group>
  );
}
