"use client";
import { StoneProps } from "@/types/omok.type";

// 바둑돌 컴포넌트
export const OmokStone = ({
  color,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  opacity = 1, // 기본 불투명도
  ...props
}: StoneProps) => {
  return (
    <mesh position={position} scale={scale} {...props} castShadow receiveShadow>
      <cylinderGeometry args={[0.44, 0.45, 0.1, 32]} />
      <meshStandardMaterial
        color={color}
        roughness={0}
        metalness={2}
        opacity={opacity}
        transparent
      />
    </mesh>
  );
};
