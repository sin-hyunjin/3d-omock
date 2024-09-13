import { useFrame, useThree } from "@react-three/fiber";
import { useState } from "react";
import { Mesh, Material } from "three";

interface GridPointProps {
  position: [number, number, number];
  onClick: (position: [number, number, number]) => void;
}

export const OmokGridPoint = ({ position, onClick }: GridPointProps) => {
  const { raycaster } = useThree();
  const [ref, setRef] = useState<Mesh | null>(null);

  useFrame(() => {
    if (ref) {
      // Raycaster를 사용하여 포인터의 위치를 추적
      const intersects = raycaster.intersectObject(ref, true);
      if (intersects.length > 0) {
        if (ref.material instanceof Material) {
          ref.material.opacity = 0.5;
          ref.material.transparent = true;
        } else if (Array.isArray(ref.material)) {
          ref.material.forEach((material) => {
            if (material instanceof Material) {
              material.opacity = 0.5;
              material.transparent = true;
            }
          });
        }
        document.body.style.cursor = "pointer";
      } else {
        if (ref.material instanceof Material) {
          ref.material.opacity = 1;
          ref.material.transparent = false;
        } else if (Array.isArray(ref.material)) {
          ref.material.forEach((material) => {
            if (material instanceof Material) {
              material.opacity = 1;
              material.transparent = false;
            }
          });
        }
        document.body.style.cursor = "auto";
      }
    }
  });
  return (
    <mesh
      position={position}
      ref={(mesh) => setRef(mesh)}
      onClick={() => onClick(position)}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshBasicMaterial color={0x00} opacity={0} transparent />
    </mesh>
  );
};
