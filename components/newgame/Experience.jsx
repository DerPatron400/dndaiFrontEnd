import {
  Float,
  PerspectiveCamera,
  Text,
  useScroll,
  Html,
  Environment,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Model } from "./Dragon";
import { Background } from "./Background";
import { Cloud } from "./Cloud";
import { Group } from "three";
import { useControls } from "leva";

const LINE_NB_POINTS = 1000;
const CURVE_DISTANCE = 200;
const CURVE_AHEAD_CAMERA = 0.008;
const CURVE_AHEAD_AIRPLANE = 0.02;
const AIRPLANE_MAX_ANGLE = 35;
let offset = 0;
let updating = false;

export default function Experience({
  buttonRef,
  setPages,
  pages,
  setShowButton,
  setOpen,
  open,
}) {
  const cameraGroup = useRef();
  const scroll = useScroll();

  const [curvesData, setCurvesData] = useState([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, -CURVE_DISTANCE),
    new THREE.Vector3(100, 0, -2 * CURVE_DISTANCE),
    new THREE.Vector3(-100, 0, -3 * CURVE_DISTANCE),
    // new THREE.Vector3(100, 0, -4 * CURVE_DISTANCE),
    // new THREE.Vector3(0, 0, -5 * CURVE_DISTANCE),
    // new THREE.Vector3(0, 0, -6 * CURVE_DISTANCE),
    // new THREE.Vector3(0, 0, -7 * CURVE_DISTANCE),
  ]);
  const [text, setText] = useState([]);

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
    if (!updating) handleText();
    //   //check keys
    //   const scrollOffset = Math.max(0, offset);
    //   // if (scrollPosition >= 0.95) {
    //   //   setOpen(true);
    //   // } else {
    //   //   setOpen(false);
    //   // }
    //   const curPoint = curve.getPoint(scrollOffset);
    //   // Make the group look ahead on the curve
    //   cameraGroup.current.position.lerp(curPoint, delta * 24);
    //   const lookAtPoint = curve.getPoint(
    //     Math.min(scrollOffset + CURVE_AHEAD_CAMERA, 1)
    //   );
    //   // Follow the curve points
    //   const currentLookAt = cameraGroup.current.getWorldDirection(
    //     new THREE.Vector3()
    //   );
    //   const targetLookAt = new THREE.Vector3()
    //     .subVectors(curPoint, lookAtPoint)
    //     .normalize();
    //   const lookAt = currentLookAt.lerp(targetLookAt, delta * 24);
    //   cameraGroup.current.lookAt(
    //     cameraGroup.current.position.clone().add(lookAt)
    //   );
    //   // Airplane rotation
    //   const tangent = curve.getTangent(scrollOffset + CURVE_AHEAD_AIRPLANE);
    //   const nonLerpLookAt = new Group();
    //   nonLerpLookAt.position.copy(curPoint);
    //   // nonLerpLookAt.lookAt(nonLerpLookAt.position.clone().add(targetLookAt));
    //   tangent.applyAxisAngle(
    //     new THREE.Vector3(0, 1, 0),
    //     -nonLerpLookAt.rotation.y
    //   );
    //   let angle = Math.atan2(-tangent.z, tangent.x);
    //   angle = -Math.PI / 2 + angle;
    //   let angleDegrees = (angle * 180) / Math.PI;
    //   angleDegrees *= 2.4; // stronger angle
    //   // LIMIT PLANE ANGLE
    //   if (angleDegrees < 0) {
    //     angleDegrees = Math.max(angleDegrees, -AIRPLANE_MAX_ANGLE);
    //   }
    //   if (angleDegrees > 0) {
    //     angleDegrees = Math.min(angleDegrees, AIRPLANE_MAX_ANGLE);
    //   }
    //   // SET BACK ANGLE
    //   angle = (angleDegrees * Math.PI) / 180;
    //   const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
    //     new THREE.Euler(
    //       airplane.current.rotation.x,
    //       airplane.current.rotation.y,
    //       angle
    //     )
    //   );
    //   airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta * 2);
  });

  useEffect(() => {
    updating = true;
    setCurvesData((prevCurvesData) => [
      ...prevCurvesData,
      new THREE.Vector3(0, 0, -1 * prevCurvesData.length * CURVE_DISTANCE),
    ]);
    setText((prevText) => [
      ...prevText,
      {
        heading: "Text " + pages,
        text: "Some text here",
        position: [0, 0, (pages + 1) * -50],
      },
    ]);
    setTimeout(() => {
      updating = false;
    }, 1000);
  }, [pages]);
  const airplane = useRef();
  const endOfCurve = curve.getPoint(1);

  const handleText = () => {
    if (
      cameraGroup.current &&
      cameraGroup.current.position.z < text[text.length - 1].position[2]
    ) {
      setOpen(true);
    }
  };

  useEffect(() => {
    if (!cameraGroup.current) return;

    //use keys to translate
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") {
        offset += 0.005;
        cameraGroup.current.position.z -= 0.3;
      }
      if (e.key === "ArrowDown") {
        offset -= 0.001;
        cameraGroup.current.position.z += 0.2;
      }
      // if (e.key === "ArrowLeft") {
      //   cameraGroup.current.position.x -= 1;
      // }
      // if (e.key === "ArrowRight") {
      //   cameraGroup.current.position.x += 1;
      // }
    };

    window.addEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <directionalLight position={[0, 3, 1]} intensity={1} />
      {/* <OrbitControls /> */}
      <group ref={cameraGroup}>
        <Background />
        <ambientLight intensity={0.5} />
        <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />
        <Environment preset='sunset' />
        <group ref={airplane}>
          <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}>
            <Model
              refreshAnim={pages}
              rotation-y={Math.PI / 2}
              scale={[0.2, 0.2, 0.2]}
            />
          </Float>
        </group>
      </group>
      {/* TEXT */}
      <group position={[0, 0, -100]}>
        <Text
          color='white'
          anchorX={"left"}
          anchorY='middle'
          fontSize={0.22}
          maxWidth={2.5}
          font={"/fonts/Inter-Regular.ttf"}
        >
          Welcome to Wawatmos!{"\n"}
          Have a seat and enjoy the ride!
        </Text>
      </group>

      <group position={[0, 1, -200]}>
        <Text
          color='white'
          anchorX={"left"}
          anchorY='center'
          fontSize={0.52}
          maxWidth={2.5}
          font={"/fonts/DMSerifDisplay-Regular.ttf"}
        >
          Services
        </Text>
        <Text
          color='white'
          anchorX={"left"}
          anchorY='top'
          position-y={-0.66}
          fontSize={0.22}
          maxWidth={2.5}
          font={"/fonts/Inter-Regular.ttf"}
        >
          Do you want a drink?{"\n"}
          We have a wide range of beverages!
        </Text>
      </group>

      {text.map((t, i) => (
        <>
          <group position={t.position}>
            <Text
              color='white'
              anchorX={"left"}
              anchorY='center'
              fontSize={0.52}
              maxWidth={2.5}
              font={"/fonts/DMSerifDisplay-Regular.ttf"}
            >
              {t.heading}
            </Text>
            <Text
              color='white'
              anchorX={"left"}
              anchorY='top'
              position-y={-0.66}
              fontSize={0.22}
              maxWidth={2.5}
              font={"/fonts/Inter-Regular.ttf"}
            >
              {t.text}
            </Text>
          </group>
        </>
      ))}

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
