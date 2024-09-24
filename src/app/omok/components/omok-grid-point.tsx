"use client";
import { GridPointProps } from "@/types/omok.type";

/**
 * 오목돌을 두기 위한 포인트 설정 컴포넌트
 */
export const OmokGridPoint = ({
  position,
  onClick,
  onPointerOver,
  onPointerOut,
}: GridPointProps) => {
  return (
    <mesh
      position={position}
      onClick={() => onClick(position)}
      onPointerEnter={onPointerOver} // 마우스 오버 시 위치 설정
      onPointerLeave={onPointerOut} // 마우스 나갈 시 위치 초기화
    >
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshBasicMaterial color={0x00} opacity={0} transparent />
    </mesh>
  );
};
