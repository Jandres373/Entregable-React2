import React from "react";
import { Box } from "@chakra-ui/react";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { Suspense } from "react";
import { Model } from "../components/Model";
import { Canvas } from "@react-three/fiber";


const Scene = ( {size} ) => {
  return (
    <Box as={Canvas}  borderRadius='50%' style={{ height: size , width:size  }}>
      <directionalLight color="white" intensity={5} />
      <spotLight color="white" intensity={5} position={[10, 15, 50]} />
      <ambientLight  intensity={5}/>
      <PerspectiveCamera makeDefault fov={5} position={[0, 0, 25]}  />
      <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={false} enableDamping={false} enablePan={false} />
      <Stars />
    


      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Box>
  );
};

export default Scene;
