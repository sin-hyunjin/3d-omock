"use client";

import { MeshStandardMaterial, TextureLoader } from "three";
import { useEffect, useState } from "react";
import { FloorProps } from "@/types/omok.type";

// 바닥재 컴포넌트
export const Floor = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: FloorProps) => {
  // 바닥재의 재질(Material)을 관리하는 상태 변수
  const [floorMaterial, setFloorMaterial] =
    useState<MeshStandardMaterial | null>(null);

  // 바닥재 텍스처를 비동기적으로 로드하는 로직
  useEffect(() => {
    const loader = new TextureLoader();
    const texturePath = "/images/jpg/oak_veneer_01_diff_4k.jpg";
    // 텍스처를 로드하고 로드가 완료되면 그 텍스처로 메쉬 재질을 설정
    loader.load(
      texturePath,
      (texture) => {
        const material = new MeshStandardMaterial({ map: texture });
        setFloorMaterial(material);
      },
      undefined,
      (error) =>
        console.error(
          "바닥재 텍스처를 로드하는 동안 오류가 발생했습니다.",
          error
        )
    );
  }, []);

  return (
    <mesh position={position} rotation={rotation} receiveShadow>
      <boxGeometry args={[100, 0.2, 100]} />
      {floorMaterial ? (
        <primitive
          object={floorMaterial}
          attach="material"
          emissiveIntensity={1}
        />
      ) : (
        <meshStandardMaterial color="#3B2C24" emissiveIntensity={1} />
      )}
    </mesh>
  );
};
