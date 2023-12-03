import React, { useRef, useEffect, useState } from "react";
import { useGLTF, Sparkles, PositionalAudio } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import MovingLight from "./MovingLight";

gsap.registerPlugin(ScrollTrigger);

export function Model(props) {
  const group = useRef();
  const [animationEnded, setAnimationEnded] = useState(false);

  const { animations, scene } = useGLTF("/dragon.glb");
  const [addLight, setAddLight] = useState(false);
  let mixer;

  const { camera } = useThree();

  const gsapAnimations = (t1) => {
    t1.to(group.current.position, {
      x: window.innerWidth < 768 ? 0 : -1,
      y: window.innerWidth < 768 ? -0.8 : -1.5,
      delay: 1,
      duration: 10,
      ease: "power2.inOut",
      onUpdate: () => {
        group.current.lookAt(
          group.current.position.x * -1.5,
          camera.position.y - 1.3,
          camera.position.z
        );
      },
    })
      .to(group.current.position, {
        x: window.innerWidth < 768 ? 0 : 1,
        delay: 1,
        duration: 10,
        ease: "power2.inOut",
        onUpdate: () => {
          group.current.lookAt(
            group.current.position.x * -1.5,
            camera.position.y - 1.3,
            camera.position.z
          );
        },
      })
      .to(group.current.position, {
        x: 0,
        delay: 1,
        duration: 15,
        ease: "power2.inOut",
        onUpdate: () => {
          group.current.lookAt(
            group.current.position.x * -1.5,
            camera.position.y - 1.3,
            camera.position.z
          );
        },
      })
      .to(group.current.position, {
        x: window.innerWidth < 768 ? 0 : 1,
        delay: 2,
        duration: 10,
        ease: "power2.inOut",
        onUpdate: () => {
          group.current.lookAt(
            group.current.position.x * -1.5,
            camera.position.y - 1.3,
            camera.position.z
          );
        },
      })
      .to(group.current.position, {
        x: window.innerWidth < 768 ? 0 : -1,
        delay: 2,
        duration: 10,
        ease: "power2.inOut",
        onUpdate: () => {
          group.current.lookAt(
            group.current.position.x * -1.5,
            camera.position.y - 1.3,
            camera.position.z
          );
        },
      })
      .to(group.current.position, {
        x: window.innerWidth < 768 ? 0 : 12,
        delay: 1,
        duration: 10,
        ease: "power2.inOut",
        onStart: () => {
          group.current.lookAt(
            group.current.position.x * -2,
            camera.position.y - 1.3,
            camera.position.z
          );
        },
      })
      .to(group.current.rotation, {
        y: window.innerWidth < 768 ? group.current.rotation.y : Math.PI * -2,
        duration: 4,
      })
      .to(group.current.position, {
        x: 0,
        delay: 1,
        duration: 10,
        ease: "power2.inOut",
        onUpdate: () => {
          group.current.lookAt(
            group.current.position.x * -1.5,
            camera.position.y - 1.3,
            camera.position.z
          );
        },
      })
      .to(group.current.rotation, {
        x: -0.5,
        duration: 4,
        ease: "power2.inOut",
        delay: 1,
      })
      .to(group.current.position, {
        y: 10,
        delay: 1,
        duration: 10,
        ease: "power2.inOut",
      });

    ScrollTrigger.create({
      trigger: ".model-trigger",
      animation: t1,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        mixer.update(0.04);
      },
    });
  };

  const modelAnimations = () => {
    mixer = new THREE.AnimationMixer(group.current);
    const clip = animations[0];
    const action = mixer.clipAction(clip);
    action.play();
    mixer.update(0.03);
  };

  const initialAnimation = () => {
    gsap.to(group.current.position, {
      x: window.innerWidth < 768 ? 0 : 1,
      y: window.innerWidth < 768 ? -0.3 : -1.5,
      duration: 4.3,
      ease: "power2.inOut",
      onComplete: () => {
        setAnimationEnded(true);
      },

      onUpdate: () => {
        mixer.update(0.04);
        if (group.current)
          group.current.lookAt(
            group.current.position.x * -1.5,
            camera.position.y - 1.3,
            camera.position.z
          );
      },
    });
  };

  useEffect(() => {
    if (animationEnded) {
      modelAnimations();
      const t1 = gsap.timeline();
      gsapAnimations(t1);
    }
  }, [animationEnded]);

  useEffect(() => {
    if (group.current) {
      modelAnimations();
      initialAnimation();

      setAddLight(true);
      props.setLoaded(true);
    }
  }, [group.current]);

  return (
    <>
      {addLight && (
        <MovingLight
          color="#FFFFFF"
          position={[0, 0, 3]}
          modelPosition={group?.current?.position}
        />
      )}
      <Sparkles count={100} scale={10} size={2} speed={0.6} color={"#E48F45"} />
      <group
        ref={group}
        rotation={[0, -1.7, 0]}
        position={[
          window.innerWidth < 768 ? 0 : 5,
          window.innerWidth < 768 ? 3 : -1.5,
          3,
        ]}
        scale={window.innerWidth < 768 ? 0.5 : 1}
      >
        <PositionalAudio url="/Audio/ambient.mp3" autoplay distance={10} />
        <primitive object={scene} dispose={null} position={[0, 0, 0]} />
      </group>
    </>
  );
}

useGLTF.preload("/bird-transformed.glb");
