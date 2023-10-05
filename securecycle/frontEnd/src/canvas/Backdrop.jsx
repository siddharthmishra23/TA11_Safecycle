import React from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import { useRef } from "react";
const BackDrop = () => {
  const shadows = useRef();
  return (
    <AccumulativeShadows
      position={[0, 0, -0.14]}
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.35}
      scae={10}
    >
      <RandomizedLight
        amount={4}
        intensity={0.85}
        ambient={0.2}
        radius={9}
        position={[5, 5, -10]}
      ></RandomizedLight>
    </AccumulativeShadows>
  );
};

export default BackDrop;
