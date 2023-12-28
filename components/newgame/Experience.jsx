import {
  Float,
  PerspectiveCamera,
  Text,
  Environment,
  useTexture,
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

const LINE_NB_POINTS = 1200;
const CURVE_DISTANCE = 400;
const CURVE_AHEAD_CAMERA = 0.008;
const CURVE_AHEAD_AIRPLANE = 0.02;
const AIRPLANE_MAX_ANGLE = 35;
let offset = 0;
let anim = 0;

const initialCurves = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, -CURVE_DISTANCE),
  new THREE.Vector3(10, 0, -2 * CURVE_DISTANCE),
  new THREE.Vector3(-10, 0, -3 * CURVE_DISTANCE),
  new THREE.Vector3(10, 0, -4 * CURVE_DISTANCE),
  new THREE.Vector3(-10, 0, -5 * CURVE_DISTANCE),
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
  const dragonModel = useRef();
  const [curvesData, setCurvesData] = useState(initialCurves);
  const [pathObjects, setPathObjects] = useState([]);
  const [imageTexture, setImageTexture] = useState(null);

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
    if (open || pathObjects.length === 0) return;

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
          angleRotation * 0.5
        )
      );

      const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          cameraGroup.current.rotation.x,
          angleRotation,
          cameraGroup.current.rotation.z
        )
      );

      offset += 0.0005 * (isForwardPressed ? 1 : -1);
      cameraGroup.current.position.copy(curve.getPointAt(offset));
      dragonModel.current.quaternion.slerp(targetDragonQuaternion, delta * 2);

      // cameraGroup.current.quaternion.slerp(targetCameraQuaternion, delta * 2);
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
      new THREE.Vector3(10, 0, -1 * prevCurvesData.length * CURVE_DISTANCE),
      new THREE.Vector3(
        -10,
        0,
        -1 * (prevCurvesData.length + 1) * CURVE_DISTANCE
      ),
    ]);

    textualData.resultArray.forEach((result, i) => {
      let point = curve.getPointAt(offset + 0.002 * i);

      setPathObjects((prevObjects) => [
        ...prevObjects,
        {
          heading: result.heading,
          text: result,

          position: [
            point.x,
            0,
            i === 0
              ? pathObjects.length * -50 - 100
              : prevObjects[prevObjects.length - 1].position[2] - 40,
          ],
          type: "text",
        },
      ]);
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
    setOpen(false);
  }, [pages]);

  console.log(pathObjects);

  const handleText = () => {
    if (
      cameraGroup.current &&
      pathObjects.length > 0 &&
      cameraGroup.current.position.z <
        pathObjects[pathObjects.length - 1].position[2]
    ) {
      setOpen(true);
      setType("text");
    }
  };

  useEffect(() => {
    if (!cameraGroup.current) return;

    // let touchStartY = 0;
    // let touchEndY = 0;

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

    // Get the height of the screen
    const screenHeight = window.innerHeight;

    // Variable to track touch positions
    let touchY = 0;

    // Function to handle touch move
    const onTouchMove = (event) => {
      const touch = event.touches[0];
      touchY = touch.clientY;

      // Define the threshold for upper and lower parts
      const upperThreshold = screenHeight / 2;

      // Check if the user is holding on the upper part
      if (touchY < upperThreshold) {
        setIsForwardPressed(true);
        setIsBackwardPressed(false);
      } else {
        setIsForwardPressed(false);
        setIsBackwardPressed(true);
      }
    };

    // Function to handle touch end
    const onTouchEnd = () => {
      setIsForwardPressed(false);
      setIsBackwardPressed(false);
    };

    // Add event listeners
    document.addEventListener("touchstart", onTouchMove, false);
    document.addEventListener("touchend", onTouchEnd, false);

    // Add event listeners here
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
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

  useMemo(() => {
    const textureLoader = new TextureLoader();
    const loadedTexture = textureLoader.load("/dice2.jpg");

    // Customize texture properties if needed
    loadedTexture.wrapS = THREE.RepeatWrapping;
    loadedTexture.wrapT = THREE.RepeatWrapping;
    loadedTexture.repeat.set(1, 1);

    setImageTexture(loadedTexture);
  }, []);

  const switchBackground = () => {
    tl.current.seek(anim * tl.current.duration());
    if (isForwardPressed) {
      anim += 0.0015;
    } else {
      anim -= 0.0015;
    }
    if (anim >= 1) anim = 0;
    if (anim < 0) anim = 1;
  };

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    tl.current
      .to(backgroundColorRef.current, {
        duration: 1,
        colorA: "#000000",
        colorB: "#ffad30",
      })
      .to(backgroundColorRef.current, {
        duration: 1,
        colorA: "#000000",
        colorB: "#424242",
      })
      .to(backgroundColorRef.current, {
        duration: 1,
        colorA: "#000000",
        colorB: "#38419D",
      });

    tl.current.pause();
  }, []);

  return (
    <>
      <directionalLight position={[0, 3, 1]} intensity={1} />

      <group ref={cameraGroup}>
        <WindEffect isMoving={isForwardPressed} />
        <Background backgroundColors={backgroundColorRef} />
        <ambientLight intensity={0.5} />
        <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />
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
              anchorY='center'
              fontSize={0.52}
              maxWidth={2.5}
              font={"/fonts/DMSerifDisplay-Regular.ttf"}
            >
              {object.heading}
            </Text>
            <Text
              color='white'
              anchorY='top'
              position-y={object.heading ? -0.66 : 1.4}
              fontSize={0.3}
              maxWidth={6}
              font={"/fonts/Inter-Regular.ttf"}
            >
              {object.text}
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
              <meshBasicMaterial map={object.image}></meshBasicMaterial>
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
          />
        </mesh>
      </group>

      {/* CLOUDS */}
      <Cloud scale={[1, 1, 1.5]} position={[-3.5, -1.2, -7]} />
      <Cloud scale={[1, 1, 2]} position={[3.5, -1, -10]} rotation-y={Math.PI} />
      <Cloud
        scale={[1, 1, 1]}
        position={[-3.5, 0.2, -12]}
        rotation-y={Math.PI / 3}
      />
      <Cloud scale={[1, 1, 1]} position={[3.5, 0.2, -12]} />

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
