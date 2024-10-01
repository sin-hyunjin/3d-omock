"use client";

import { FloorProps } from "@/types/omok.type";
import useTextureLoader from "@/hooks/use-texture-loader";
// 바닥재 컴포넌트
export const Floor = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: FloorProps) => {
  // 바닥재의 재질(Material)을 관리하는 상태 변수
  const texturePath = "/images/jpg/oak_veneer_01_diff_4k.jpg";
  const floorMaterial = useTextureLoader(texturePath);

  return (
    <mesh position={position} rotation={rotation} receiveShadow>
      <boxGeometry args={[100, 0.2, 100]} />
      {floorMaterial ? (
        <primitive
          object={floorMaterial}
          attach="material"
          emissiveIntensity={1}
          transparent
        />
      ) : (
        <meshStandardMaterial color="#B7A88F" emissiveIntensity={1} />
      )}
    </mesh>
  );
};
