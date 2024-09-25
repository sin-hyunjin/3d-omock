// 화점 표시를 위한 컴포넌트
export const OmokStarPoints = () => {
  const starPoints: [number, number, number][] = [
    // 중앙 화점
    [0, 0, 0],
    // 중앙 위아래 화점
    [0, 6, 0],
    [0, -6, 0],
    // 오른쪽화점
    [6, -6, 0],
    [6, 0, 0],
    [6, 6, 0],
    // 왼쪽 화점
    [-6, 6, 0],
    [-6, 0, 0],
    [-6, -6, 0],
  ];

  return (
    <group position={[0, 4.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
      {starPoints.map((position, index) => (
        <mesh key={index} position={position} castShadow>
          <sphereGeometry args={[0.06, 32, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
      ))}
    </group>
  );
};
