"use client";

import { useEffect, useState } from "react";
import { Box } from "@react-three/drei";
import * as THREE from "three";
import { MeshStandardMaterial } from "three";
import {
  OmockGridHelper,
  OmockCushions,
  OmockStarPoints,
  Floor,
} from "./index";

export const OmockBoard = () => {
  const [gridSize] = useState(18);
  const [woodMaterial, setWoodMaterial] = useState<MeshStandardMaterial | null>(
    null
  );

  useEffect(() => {
    const woodTextFloor =
      "/images/jpg/wooden-flooring-textured-background-design.jpg";
    const loader = new THREE.TextureLoader();

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
        receiveShadow
      >
        {/* 기본 색상으로 렌더링하다가 텍스처가 로드된 후에만 텍스처를 적용 */}
        {woodMaterial ? (
          <primitive object={woodMaterial} attach="material" />
        ) : (
          <meshStandardMaterial color="#AB9987" />
        )}
      </Box>

      {/* 그리드 라인 */}
      <OmockGridHelper size={gridSize} />
      {/* 방석 추가 */}
      <OmockCushions />
      {/* 화점 */}
      <OmockStarPoints />
      {/* 바닥 추가 */}
      <Floor />
      {/* 다리 4개 */}
      <group>
        {/* 각 다리의 위치를 조정하여 바둑판의 네 모서리 아래에 배치 */}
        {[
          [gridSize / 2.1 + 0.3, -3, gridSize / 2],
          [gridSize / 2.1 + 0.3, -3, -gridSize / 2],
          [-gridSize / 2.1 - 0.3, -3, gridSize / 2],
          [-gridSize / 2.1 - 0.3, -3, -gridSize / 2],
        ].map((position, index) => (
          <mesh
            key={index}
            position={position as [number, number, number]}
            castShadow
          >
            <cylinderGeometry args={[0.7, 0.5, 2, 32]} />
            <meshStandardMaterial color="#8B4513" />
            {/* 기본 색상으로 렌더링하다가 텍스처가 로드된 후에만 텍스처를 적용 */}
            {woodMaterial ? (
              <primitive object={woodMaterial} attach="material" />
            ) : (
              <meshStandardMaterial color="grey" />
            )}
          </mesh>
        ))}
      </group>
    </>
  );
};
