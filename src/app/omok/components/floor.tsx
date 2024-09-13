"use client";

import { MeshStandardMaterial, TextureLoader } from "three";
import { useEffect, useState } from "react";

interface FloorProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export const Floor = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: FloorProps) => {
  const [floorMaterial, setFloorMaterial] =
    useState<MeshStandardMaterial | null>(null);

  useEffect(() => {
    const loader = new TextureLoader();
    const texturePath = "/images/jpg/oak_veneer_01_diff_4k.jpg";

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
