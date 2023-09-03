// Modelo 3d usado para representar el planeta en la escena 3d del componente Scene.jsx
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Box } from "@chakra-ui/react";
import Model3d from "../assets/Earth_2.glb"

export function Model(props) {
  const { nodes, materials } = useGLTF(Model3d);
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

useGLTF.preload(Model3d);
