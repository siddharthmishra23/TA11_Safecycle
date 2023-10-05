import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";

import state from "../store";
const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    const isBreakPoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;
    const positions = {
      default: [-0.4, -0.6, 2],
      mobile: [0, -0.6, 2.5],
      desktop: [0, -0.6, 3],
    };

    let targetPosition = isMobile ? positions.mobile : positions.desktop;
    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 2, delta);
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 1.2, -state.pointer.x / 0.2, 0],
      0.25,
      delta
    );
  });
  return <group ref={group}>{children}</group>;
};

export default CameraRig;
