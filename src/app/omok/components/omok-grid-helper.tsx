import { useCallback, useMemo, useState } from "react";
import { GridHelper, Color } from "three";
import { OmokGridPoint, OmokStone } from "./index";

interface OmokGridHelperProps {
  size: number;
  spacing: number;
}

// 그리드
export const OmokGridHelper = ({ size, spacing }: OmokGridHelperProps) => {
  const [stones, setStones] = useState<
    { position: [number, number, number]; color: string }[]
  >([]);

  const [currentColor, setCurrentColor] = useState<string>("white");
  // GridHelper의 선 색깔을 진하게 설정
  const gridHelper = new GridHelper(
    size,
    18,
    new Color(0x000000),
    new Color(0x111111)
  );

  // GridHelper를 박스의 위쪽에 맞추기 위해 위치를 조정
  gridHelper.position.set(0, 4.05, 0); // 박스의 위쪽에 위치하도록 y 값을 조정

  // 꼭지점의 메쉬를 생성하는 함수
  const createGridPoints = useCallback(() => {
    const points = [];
    for (let x = -size / 2; x <= size / 2; x += spacing) {
      for (let z = -size / 2; z <= size / 2; z += spacing) {
        points.push([x, 3.805, z] as [number, number, number]);
      }
    }
    return points;
  }, [size, spacing]);

  const gridPoints = useMemo(() => createGridPoints(), [createGridPoints]);

  const handlePointClick = (position: [number, number, number]) => {
    setStones((prevStones) => {
      const newColor = currentColor === "black" ? "white" : "black";
      setCurrentColor(newColor);
      return [
        ...prevStones,
        { position: [position[0], 4.1, position[2]], color: newColor },
      ];
    });
  };

  return (
    <>
      <primitive object={gridHelper} />
      {gridPoints.map((position, index) => (
        <OmokGridPoint
          key={index}
          position={position}
          onClick={handlePointClick}
        />
      ))}
      {stones.map((stone, index) => (
        <OmokStone key={index} color={stone.color} position={stone.position} />
      ))}
    </>
  );
};
