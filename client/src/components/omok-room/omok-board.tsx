"use client";

import { useState } from "react";
import { Box } from "@react-three/drei";

import {
  OmokGridHelper,
  OmokCushions,
  OmokStarPoints,
  OmokLegs,
} from "./index";
import useTextureLoader from "@/hooks/use-texture-loader";

/* 3D 오목판 컴포넌트 */
export const OmokBoard = () => {
  const [gridSize] = useState(18);
  const woodTexturePath =
    "/images/jpg/wooden-flooring-textured-background-design.jpg";
  const woodMaterial = useTextureLoader(woodTexturePath);

  return (
    <>
      {/* 3D 오목판 */}
      <Box
        args={[gridSize + 1.4, 6, gridSize + 1.4]}
        position={[0, 1, 0]}
        castShadow
        receiveShadow
      >
        {woodMaterial ? (
          <primitive object={woodMaterial} attach="material" />
        ) : (
          <meshStandardMaterial color="#AB9987" />
        )}
      </Box>

      {/* 그리드 라인 */}
      <OmokGridHelper size={18} spacing={1} />
      {/* 화점 */}
      <OmokStarPoints />
      {/* 방석 추가 */}
      <OmokCushions />

      {/* 다리 4개 */}
      <OmokLegs gridSize={gridSize} woodMaterial={woodMaterial} />
    </>
  );
};
