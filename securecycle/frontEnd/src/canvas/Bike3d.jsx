import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import state from "../store";
export function Bike3d(props) {
  const { nodes, materials } = useGLTF("/bike3d.glb");
  console.log(materials);
  const snap = useSnapshot(state);
  useFrame((state, delta) => {
    const newColor = easing.dampC(
      materials.Frame.color,
      snap.color,
      0.25,
      delta
    );
    materials.Frame.color.set(newColor);

    materials.Parts.color.set(
      easing.dampC(materials.Parts.color, snap.color, 0, delta)
    );
    materials.FrameBlack.color.set(
      easing.dampC(materials.FrameBlack.color, snap.color, 0, delta)
    );
    materials.BarsSeatPedals.color.set(
      easing.dampC(materials.BarsSeatPedals.color, snap.color, 0, delta)
    );
  });
  const stateString = JSON.stringify(snap);
  return (
    <group
      key={stateString}
      {...props}
      dispose={null}
      rotation={[...(props.rotation || [0, 0, 0]), Math.PI / 0, 0, 0]}
    >
      <group position={[0, 0, 0]}>
        <primitive object={nodes.Bone009} />
        <primitive object={nodes.Bone002} />
        <primitive object={nodes.Bone} />
        <primitive object={nodes.Bone041} />
        <primitive object={nodes.Bone013} />
        <primitive object={nodes.Bone004} />
        <primitive object={nodes.Bone006} />
        <primitive object={nodes.Bone043} />
        <skinnedMesh
          castShadow
          geometry={nodes.Line1.geometry}
          material={materials.BarsSeatPedals}
          skeleton={nodes.Line1.skeleton}
        />
        <skinnedMesh
          castShadow
          geometry={nodes.Line2.geometry}
          material={materials.BarsSeatPedals}
          skeleton={nodes.Line2.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/bike3d.glb");
