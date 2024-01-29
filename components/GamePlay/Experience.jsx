import { Float, PerspectiveCamera, Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Model } from "./Dragon";
import { Background } from "./Background";
import gsap from "gsap";
import { TextureLoader } from "three";
import WindEffect from "./WindEffect";
import PathText from "./PathText";
import Line from "./Line";
import Clouds from "./Clouds";

const CURVE_DISTANCE = 450;
const CURVE_ANGLE = 1;
let anim = 0;
let directionFactor = 0.1;

let speed = 0;
const maxSpeed = 5;
const TEXT_GAP = 90;
const INITIAL_TEXT_GAP = 200;

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
    colorB: "#9333ea",
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

  useFrame((_state, delta) => {
    if (!isForwardPressed && !isBackwardPressed) {
      if (speed > 0) {
        speed -= delta;
      } else if (speed < 0) {
        speed += delta;
      }

      if (Math.abs(speed) < 0.01) {
        speed = 0;
      }
    }

    if (isForwardPressed && (open || pathObjects.length === 0)) return;

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

      speed += delta * (isForwardPressed ? -1.5 : 1.5);
      speed = speed > maxSpeed ? maxSpeed : speed;
      speed = speed < maxSpeed * -1 ? maxSpeed * -1 : speed;

      dragonModel.current.quaternion.slerp(targetDragonQuaternion, delta * 2);
    }
    cameraGroup.current.position.z = THREE.MathUtils.lerp(
      cameraGroup.current.position.z,
      cameraGroup.current.position.z + speed,
      0.1
    );

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
                : prevObjects[prevObjects.length - 1].position[0] < 0
                ? 0.5
                : -0.5,
              -1.7,
              i === 0
                ? pathObjects.length * -TEXT_GAP - INITIAL_TEXT_GAP
                : prevObjects[prevObjects.length - 1].position[2] - TEXT_GAP,
            ],
            type: "text",
          },
        ]);
      } else {
        setPathObjects((prevObjects) => [
          ...prevObjects,
          {
            heading: result.heading?.replaceAll("*", ""),
            text: result.content?.replace(/[*\-^]/g, ""),

            position: [
              i === 0
                ? 1
                : prevObjects[prevObjects.length - 1].position[0] < 0
                ? 0.5
                : -0.5,
              -1.7,
              i === 0
                ? pathObjects.length * -TEXT_GAP - INITIAL_TEXT_GAP
                : prevObjects[prevObjects.length - 1].position[2] - TEXT_GAP,
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
            prevObjects[prevObjects.length - 1].position[2] - TEXT_GAP,
          ],
        },
      ]);
    }
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

    const handleSwitch = (e) => {
      setIsForwardPressed(false);
      setIsBackwardPressed(false);
    };

    // Add event listeners here
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("visibilitychange", handleSwitch);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleSwitch);
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

  console.log(pathObjects);
  const switchBackground = () => {
    tl.current.seek(anim * tl.current.duration());

    if (speed < 0) {
      anim += 0.001 * directionFactor;
    } else if (speed > 0) {
      anim -= 0.001 * directionFactor;
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
        colorB: "#9333ea",
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
        {isForwardPressed && <WindEffect isMoving={isForwardPressed} />}
        <Background backgroundColors={backgroundColorRef} />
        <ambientLight intensity={0.5} />
        <group ref={cameraRail}>
          <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />
        </group>
        <Environment preset='sunset' />

        <group ref={dragonModel}>
          <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}>
            <Model
              rotation-y={Math.PI / 2}
              scale={[0.2, 0.2, 0.2]}
              isPressed={isForwardPressed || isBackwardPressed}
            />
          </Float>
        </group>
      </group>

      {pathObjects.map((object, i) => (
        <PathText key={i} object={object} setType={setType} setOpen={setOpen} />
      ))}

      {/* LINE */}
      <Line shape={shape} curve={curve} />

      {/* CLOUDS */}
      {/* <Clouds /> */}
    </>
  );
}
