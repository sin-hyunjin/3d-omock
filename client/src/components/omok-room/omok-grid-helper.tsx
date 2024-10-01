import { useMemo, useState } from "react";
import { GridHelper, Color } from "three";
import { OmokGridPoint, OmokStone } from "./index";
import { OmokGridHelperProps } from "@/types/omok.type";
import { createGridPoints, checkWinCondition } from "@/utils/omok-grid-uilts";
import { useGameStateStore, useOmokStore } from "@/store/omok-store";
/* 오목 그리드 선 컴포넌트 */
export const OmokGridHelper = ({ size, spacing }: OmokGridHelperProps) => {
  const { stones, addStone } = useGameStateStore();
  const { currentColor, toggleColor } = useOmokStore();

  // 추가: 현재 마우스 오버된 위치 상태
  const [hoveredPosition, setHoveredPosition] = useState<
    [number, number, number] | null
  >(null);

  // GridHelper는 오목판의 그리드(선)를 그리기 위한 도구. 선의 색상을 진하게 설정
  const gridHelper = new GridHelper(
    size,
    18,
    new Color(0x000000),
    new Color(0x111111)
  );

  // GridHelper를 오목판의 위쪽에 위치시키기 위해 y 좌표를 4.05로 조정
  gridHelper.position.set(0, 4.05, 0);

  // 오목판의 각 꼭지점 좌표를 생성하는 함수. 오목판의 크기와 간격에 따라 점들을 생성
  const gridPoints = useMemo(
    () => createGridPoints(size, spacing),
    [size, spacing]
  );

  // 그리드 꼭지점을 클릭했을 때 호출되는 함수
  const handlePointClick = (position: [number, number, number]) => {
    console.log("Selected Position:", position); // 현재 위치를 콘솔에 출력

    // 현재 위치에 돌이 이미 있는지 확인
    const isPositionOccupied = stones.some(
      (stone) =>
        stone.position[0] === position[0] && stone.position[2] === position[2]
    );

    // 돌이 이미 있는 경우 경고 메시지를 출력하고 돌을 놓지 않음
    if (isPositionOccupied) {
      console.log("이미 돌이 놓여진 위치입니다.");
      return;
    }

    // 돌을 놓는 로직
    const newStone = {
      position: [position[0], 4.1, position[2]] as [number, number, number],
      color: currentColor,
    };

    if (checkWinCondition([...stones, newStone], position, currentColor)) {
      alert(`${currentColor}가 승리했습니다!`);
    }

    addStone(newStone);
    toggleColor();
    setHoveredPosition(null); // 클릭 후 오버된 위치 초기화
  };

  return (
    <>
      <primitive object={gridHelper} />
      {gridPoints.map((position, index) => (
        <OmokGridPoint
          key={index}
          position={position}
          onClick={handlePointClick}
          onPointerOver={() => setHoveredPosition(position)} // 마우스 오버 시 위치 설정
          onPointerOut={() => setHoveredPosition(null)} // 마우스 나갈 시 위치 초기화
        />
      ))}
      {hoveredPosition && ( // 마우스 오버된 위치에 투명한 돌 렌더링
        <OmokStone
          color={currentColor}
          position={[hoveredPosition[0], 4.1, hoveredPosition[2]]}
          opacity={0.5}
        />
      )}
      {stones.map((stone, index) => (
        <OmokStone key={index} color={stone.color} position={stone.position} />
      ))}
    </>
  );
};
