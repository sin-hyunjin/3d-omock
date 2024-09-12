"use client";

import { useEffect, useState } from "react";
import * as THREE from "three";
import { MeshStandardMaterial } from "three";

export const Floor = () => {
  const [floorMaterial, setFloorMaterial] =
    useState<MeshStandardMaterial | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const texturePath = "/images/jpg/wood-texture-close.jpg";

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
    <mesh position={[0, -4.5, 0]} receiveShadow>
      <boxGeometry args={[50, 0.2, 50]} />
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
