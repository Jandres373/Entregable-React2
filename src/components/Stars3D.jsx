import React from "react";
import { Box, background } from "@chakra-ui/react";
import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { Suspense } from "react";
import { Model } from "./Model";
import { Canvas } from "@react-three/fiber";


const Stars3D = ( {size} ) => {
  return (
    <Box as={Canvas}  borderRadius='50%' style={{ height: size , width:size  }}>
      <directionalLight color="white" intensity={5} />
      <spotLight color="white" intensity={5} position={[10, 15, 50]} />
      <ambientLight  intensity={5}/>
      <PerspectiveCamera makeDefault fov={5} position={[0, 0, 25]}  />
      <OrbitControls autoRotate autoRotateSpeed={0.5}/>
      <Stars />
    </Box>
  );
};

export default Stars3D;