import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Center, Html } from "@react-three/drei";
import CameraRig from "./CameraRig";
import { Bike3d } from "./Bike3d";

const CanvasModel = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Assuming the Bike3d model takes some time to load
    // you can set the loaded state to true after a certain delay.
    // Adjust this delay according to your needs.
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000); // 2000 milliseconds = 2 seconds

    return () => clearTimeout(timer);
  }, []);

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
        {!isLoaded && (
          <Html center>
            <span>Loading...</span>
          </Html>
        )}
        <Suspense
          fallback={
            <Html center style={{ font: "700px" }}>
              <span>Loading...</span>
            </Html>
          }
        >
          <Center>
            <Bike3d scale={1.5} />
          </Center>
        </Suspense>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
