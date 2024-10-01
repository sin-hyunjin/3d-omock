"use client";

import useTextureLoader from "@/hooks/use-texture-loader";

// 방석 컴포넌트
export const OmokCushions = () => {
  const texturePath = "/images/jpg/smooth_concrete_floor_diff_4k.jpg";
  const cushionMaterial = useTextureLoader(texturePath);

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
            <meshStandardMaterial color="#8F7660" />
          )}
        </mesh>
      ))}
    </>
  );
};
