"use client";

import { useEffect, useState } from "react";
import { Box } from "@react-three/drei";
import { MeshStandardMaterial, TextureLoader } from "three";
import {
  OmokGridHelper,
  OmokCushions,
  OmokStarPoints,
  OmokLegs,
} from "./index";

/* 3D 오목판 컴포넌트 */
export const OmokBoard = () => {
  const [gridSize] = useState(18);
  const [woodMaterial, setWoodMaterial] = useState<MeshStandardMaterial | null>(
    null
  );

  useEffect(() => {
    const woodTextFloor =
      "/images/jpg/wooden-flooring-textured-background-design.jpg";
    const loader = new TextureLoader();

    loader.load(
      woodTextFloor,
      (texture) => {
        const material = new MeshStandardMaterial({ map: texture });
        setWoodMaterial(material);
      },
      undefined,
      (error) =>
        console.error("텍스처를 로드하는 동안 오류가 발생했습니다.", error)
    );
  }, []);

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
