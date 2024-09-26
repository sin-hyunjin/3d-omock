import { MeshStandardMaterial } from "three";

interface OmokLegsProps {
  gridSize: number;
  woodMaterial: MeshStandardMaterial | null;
}

// 오목판 다리 컴포넌트
export const OmokLegs = ({ gridSize, woodMaterial }: OmokLegsProps) => {
  const legPositions = [
    [gridSize / 2.1 + 0.3, -3, gridSize / 2],
    [gridSize / 2.1 + 0.3, -3, -gridSize / 2],
    [-gridSize / 2.1 - 0.3, -3, gridSize / 2],
    [-gridSize / 2.1 - 0.3, -3, -gridSize / 2],
  ];
  return (
    <group>
      {legPositions.map((position, index) => (
        <mesh
          key={index}
          position={position as [number, number, number]}
          castShadow
        >
          <cylinderGeometry args={[0.7, 0.5, 2, 32]} />
          {woodMaterial ? (
            <primitive object={woodMaterial} attach="material" />
          ) : (
            <meshStandardMaterial color="grey" />
          )}
        </mesh>
      ))}
    </group>
  );
};
