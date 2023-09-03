// Modelo 3d usado para representar el planeta en la escena 3d del componente Scene.jsx
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Box } from "@chakra-ui/react";

export function Model(props) {
  const { nodes, materials } = useGLTF("../src/assets/Earth_2.glb");
  return (
    <Box as="group" {...props} dispose={null} borderRadius='50%' >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.earth1.geometry}
        material={materials.earth}
      />
    </Box>
  );
}

useGLTF.preload("../src/assets/Earth_2.glb");
