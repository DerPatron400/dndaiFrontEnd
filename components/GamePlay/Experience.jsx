import {
  Float,
  PerspectiveCamera,
  Text,
  Environment,
  useTexture,
  Html,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Model } from "./Dragon";
import { Background } from "./Background";
import { Cloud } from "./Cloud";
import gsap from "gsap";
import { TextureLoader } from "three";
import WindEffect from "./WindEffect";
import Button from "./button";
import {
  fadeOnBeforeCompile,
  fadeOnBeforeCompileFlat,
} from "@/utils/fadeShader";

const LINE_NB_POINTS = 1200;
const CURVE_DISTANCE = 450;
const FRICTION_DISTANC = 42;
const CURVE_ANGLE = 1;
let anim = 0;
let offset = 0;
let directionFactor = 0.1;

const initialCurves = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, -CURVE_DISTANCE),
  new THREE.Vector3(CURVE_ANGLE, 0, -2 * CURVE_DISTANCE),
  new THREE.Vector3(-CURVE_ANGLE, 0, -3 * CURVE_DISTANCE),
  new THREE.Vector3(CURVE_ANGLE, 0, -4 * CURVE_DISTANCE),
  new THREE.Vector3(-CURVE_ANGLE, 0, -5 * CURVE_DISTANCE),
  new THREE.Vector3(CURVE_ANGLE, 0, -6 * CURVE_DISTANCE),
  new THREE.Vector3(-CURVE_ANGLE, 0, -7 * CURVE_DISTANCE),
  new THREE.Vector3(CURVE_ANGLE, 0, -8 * CURVE_DISTANCE),
];

export default function Experience({
  pages,
  setOpen,
  open,
  type,
  setType,
  textualData,
  isForwardPressed,
  isBackwardPressed,
  setIsForwardPressed,
  setIsBackwardPressed,
}) {
  const cameraGroup = useRef();
  const backgroundColorRef = useRef({
    colorA: "#000000",
    colorB: "#ffad30",
  });
  const tl = useRef();
  const cameraRail = useRef();
  const dragonModel = useRef();
  const [curvesData, setCurvesData] = useState(initialCurves);
  const [pathObjects, setPathObjects] = useState([]);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(curvesData, false, "catmullrom", 0.5);
  }, [curvesData]);

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.08);
    shape.lineTo(0, 0.08);
    return shape;
  }, [curve]);

  useEffect(() => {
    //resetting values on component mount
    offset = 0;
  }, []);

  useFrame((_state, delta) => {
    if (isForwardPressed && (open || pathObjects.length === 0)) return;

    pathObjects.forEach((object, i) => {
      const position = new THREE.Vector3(...object.position);
      const distance = position.distanceTo(cameraGroup.current.position);

      if (distance < FRICTION_DISTANC) {
        const targetCameraRailPosition = new THREE.Vector3(
          1 - distance / FRICTION_DISTANC,
          0,
          0
        );
        //cameraRail.current.position.lerp(targetCameraRailPosition, delta);
      }
    });

    if (isForwardPressed || isBackwardPressed) {
      if (isBackwardPressed && cameraGroup.current.position.z >= 0) return;
      switchBackground();
      const curPointIndex = Math.min(
        Math.round(-cameraGroup.current.position.z / CURVE_DISTANCE),
        curvesData.length - 1
      );
      const curPoint = curvesData[curPointIndex];
      const nextPoint = curvesData[curPointIndex + 1];

      const xDisplacement = (nextPoint.x - curPoint.x) * 40;
      const angleRotation =
        (xDisplacement < 0 ? 1 : -1) *
        Math.min(Math.abs(xDisplacement), Math.PI / 3);

      const targetDragonQuaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          dragonModel.current.rotation.x,
          dragonModel.current.rotation.y,
          angleRotation * 0.3
        )
      );

      offset += 0.0005 * (isForwardPressed ? 0.8 : -0.8);
      if (offset > 0) {
        cameraGroup.current.position.copy(curve.getPointAt(offset));
        dragonModel.current.quaternion.slerp(targetDragonQuaternion, delta * 2);
      }
    }

    handleText();
  });

  useEffect(() => {
    if (type === "image") {
      setPathObjects((prevObjects) => [
        ...prevObjects,
        {
          type: "image",
          image: loadTexture(textualData.image),
          position: [
            prevObjects[prevObjects.length - 1].position[0],
            0,
            prevObjects[prevObjects.length - 1].position[2] - 40,
          ],
        },
      ]);
      return;
    }

    setCurvesData((prevCurvesData) => [
      ...prevCurvesData,
      new THREE.Vector3(
        CURVE_ANGLE,
        0,
        -1 * prevCurvesData.length * CURVE_DISTANCE
      ),
      new THREE.Vector3(
        -CURVE_ANGLE,
        0,
        -1 * (prevCurvesData.length + 1) * CURVE_DISTANCE
      ),
      new THREE.Vector3(
        CURVE_ANGLE,
        0,
        -1 * (prevCurvesData.length + 2) * CURVE_DISTANCE
      ),
      new THREE.Vector3(
        -CURVE_ANGLE,
        0,
        -1 * (prevCurvesData.length + 3) * CURVE_DISTANCE
      ),
    ]);

    textualData.resultArray.forEach((result, i) => {
      let tempOffset = offset + 0.02 * (i + 1);
      if (tempOffset > 0.9) {
        tempOffset = 0.9;
      }
      let tempPoint = curve.getPointAt(tempOffset).x;
      console.log(tempPoint);

      tempPoint *= 0.2;

      //setting text position
      if (result.heading?.toLowerCase() === "visual") {
        setPathObjects((prevObjects) => [
          ...prevObjects,
          {
            text: result.content,
            isVisual: true,

            position: [
              i === 0
                ? 1
                : prevObjects[prevObjects.length - 1].position[0] < 1
                ? 1
                : -6,
              -2,
              i === 0
                ? pathObjects.length * -50 - 100
                : prevObjects[prevObjects.length - 1].position[2] - 40,
            ],
            type: "text",
          },
        ]);
      } else {
        setPathObjects((prevObjects) => [
          ...prevObjects,
          {
            heading: result.heading?.replaceAll("*", ""),
            text: result.content?.replaceAll("*", ""),

            position: [
              i === 0
                ? 1
                : prevObjects[prevObjects.length - 1].position[0] < 1
                ? 1
                : -6,

              -2,
              i === 0
                ? pathObjects.length * -50 - 100
                : prevObjects[prevObjects.length - 1].position[2] - 40,
            ],
            type: "text",
          },
        ]);
      }
    });

    if (textualData.visualText) {
      setPathObjects((prevObjects) => [
        ...prevObjects,
        {
          type: "text",
          isVisual: true,
          text: textualData.visualText,
          position: [
            prevObjects[prevObjects.length - 1].position[0],
            0,
            prevObjects[prevObjects.length - 1].position[2] - 40,
          ],
        },
      ]);
    }
    if (offset > 0.12) offset -= 0.1;
    setOpen(false);
  }, [pages]);

  const handleText = () => {
    if (
      cameraGroup.current &&
      pathObjects.length > 0 &&
      cameraGroup.current.position.z <
        pathObjects[pathObjects.length - 1].position[2]
    ) {
      setOpen(true);
      setType("text");
    } else {
      if (type === "text") setOpen(false);
    }
  };

  useEffect(() => {
    if (!cameraGroup.current) return;

    // Use keys to translate
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") {
        setIsForwardPressed(true);
      }
      if (e.key === "ArrowDown") {
        setIsBackwardPressed(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "ArrowUp") {
        setIsForwardPressed(false);
      }
      if (e.key === "ArrowDown") {
        setIsBackwardPressed(false);
      }
    };

    // Add event listeners here
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const loadTexture = (url) => {
    const textureLoader = new TextureLoader();
    const loadedTexture = textureLoader.load(url);

    // Customize texture properties if needed
    loadedTexture.wrapS = THREE.RepeatWrapping;
    loadedTexture.wrapT = THREE.RepeatWrapping;
    loadedTexture.repeat.set(1, 1);
    return loadedTexture;
  };

  const switchBackground = () => {
    tl.current.seek(anim * tl.current.duration());

    if (isForwardPressed) {
      anim += 0.0015 * directionFactor;
    } else {
      anim -= 0.0015 * directionFactor;
    }
    if (anim >= 1) {
      anim = 1;
      directionFactor = -1;
    }
    if (anim < 0) {
      anim = 0;
      directionFactor = 1;
    }
  };

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    tl.current
      .to(backgroundColorRef.current, {
        duration: 2,
        ease: "power1.easeInOut",
        colorA: "#000000",
        colorB: "#ffad30",
      })
      .to(backgroundColorRef.current, {
        ease: "power1.easeInOut",
        duration: 2,
        colorA: "#000000",
        colorB: "#424242",
      })
      .to(backgroundColorRef.current, {
        ease: "power1.easeInOut",
        duration: 2,
        colorA: "#000000",
        colorB: "#38419D",
      });

    tl.current.pause();
  }, []);

  return (
    <>
      <directionalLight position={[0, 3, 1]} intensity={1} />

      <group ref={cameraGroup}>
        {setIsForwardPressed && <WindEffect isMoving={isForwardPressed} />}
        <Background backgroundColors={backgroundColorRef} />
        <ambientLight intensity={0.5} />
        <group ref={cameraRail}>
          <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />
        </group>
        <Environment preset='sunset' />

        <group ref={dragonModel}>
          <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}>
            <Model
              refreshAnim={pages}
              rotation-y={Math.PI / 2}
              scale={[0.2, 0.2, 0.2]}
            />
          </Float>
        </group>
      </group>

      {pathObjects.map((object, i) =>
        object.type === "text" ? (
          <group key={i} position={object.position}>
            <Text
              color='white'
              anchorX={"left"}
              anchorY='top'
              fontSize={0.6}
              position-y={
                object?.heading?.length < 20
                  ? 3
                  : object?.heading?.length < 25
                  ? 4
                  : object?.heading?.length < 35
                  ? 5
                  : 6.6
              }
              maxWidth={4}
              font={"/fonts/DMSerifDisplay-Regular.ttf"}
            >
              {object.heading}
              <meshStandardMaterial
                color={"white"}
                onBeforeCompile={fadeOnBeforeCompileFlat}
              />
            </Text>
            <Text
              color='white'
              anchorX={"left"}
              anchorY='top'
              position-y={object?.heading ? 1.4 : 2}
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
                  setOpen(true);
                }}
              />
            )}
          </group>
        ) : (
          <group key={i} position={object.position}>
            <mesh>
              <planeGeometry args={[5, 5]} />
              <meshBasicMaterial
                map={object.image}
                onBeforeCompile={fadeOnBeforeCompile}
              ></meshBasicMaterial>
            </mesh>
          </group>
        )
      )}

      {/* LINE */}
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

      {/* CLOUDS */}
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
