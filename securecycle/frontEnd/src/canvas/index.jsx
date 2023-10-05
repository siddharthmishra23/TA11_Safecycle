import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import CameraRig from "./CameraRig";
import Backdrop from "./Backdrop";

import { Bike3d } from "./Bike3d";

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ fov: 60 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <directionalLight position={[2, 2, -2]} intensity={1} />
      <Environment preset="city" />
      <CameraRig>
        {/* <Backdrop /> */}
        <Center>
          <Bike3d scale={1.5} />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
