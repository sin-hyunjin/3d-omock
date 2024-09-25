"use client";

import { useEffect, useState } from "react";
import { MeshStandardMaterial, TextureLoader } from "three";

// 방석 컴포넌트
export const OmokCushions = () => {
  const [cushionMaterial, setCushionMaterial] =
    useState<MeshStandardMaterial | null>(null);

  useEffect(() => {
    const loader = new TextureLoader();
    const cushionTexturePath = "/images/jpg/smooth_concrete_floor_diff_4k.jpg";

    loader.load(
      cushionTexturePath,
      (texture) => {
        const material = new MeshStandardMaterial({ map: texture });
        setCushionMaterial(material);
      },
      undefined,
      (error) =>
        console.error("방석 텍스처를 로드하는 동안 오류가 발생했습니다.", error)
    );
  }, []);

  const cushionPositions: [number, number, number][] = [
    [0, -4, 16],
    [0.2, -4, -16],
  ];

  return (
    <>
      {cushionPositions.map((position, index) => (
        <mesh key={index} position={position} castShadow receiveShadow>
          <cylinderGeometry args={[4, 4.2, 0.6, 33]} />
          {cushionMaterial ? (
            <primitive object={cushionMaterial} attach="material" />
          ) : (
            <meshStandardMaterial color="grey" />
          )}
        </mesh>
      ))}
    </>
  );
};
