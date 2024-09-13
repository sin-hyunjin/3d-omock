interface StoneProps {
  color: string;
  position?: [number, number, number];
  scale?: [number, number, number];
}

export const OmokStone = ({
  color,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  ...props
}: StoneProps) => {
  return (
    <mesh position={position} scale={scale} {...props} castShadow receiveShadow>
      <cylinderGeometry args={[0.44, 0.45, 0.1, 32]} />
      <meshStandardMaterial color={color} roughness={0} metalness={2} />
    </mesh>
  );
};
