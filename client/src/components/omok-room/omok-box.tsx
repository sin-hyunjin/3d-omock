"use client";

import { OrbitControls } from "@react-three/drei";
import { OmokStone } from "./index";
import { Model } from "@/components/model";
import { Stone } from "@/types/omok.type";
import { useEffect, useState } from "react";

const generateRandomStonePositions = (
  numPositions: number,
  color: string,
  baseX: number,
  baseZ: number
): Stone[] => {
  const positions = [];
  for (let i = 0; i < numPositions; i++) {
    const x = baseX + Math.random() * 2; // 랜덤 x 위치
    const y = -3 + Math.random() * 0.7; // 랜덤 y 위치
    const z = baseZ + Math.random() * 2; // 랜덤 z 위치
    positions.push({ position: [x, y, z] as [number, number, number], color });
  }
  return positions;
};

export const OmokBox = () => {
  const [blackStonePositions, setBlackStonePositions] = useState<Stone[]>([]);
  const [whiteStonePositions, setWhiteStonePositions] = useState<Stone[]>([]);

  useEffect(() => {
    const blackStones = generateRandomStonePositions(50, "white", -15, -10);
    const whiteStones = generateRandomStonePositions(50, "black", 13, 8);
    setBlackStonePositions(blackStones);
    setWhiteStonePositions(whiteStones);
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행됨

  const renderStones = (positions: Stone[]) => {
    return positions.map((stone, index) => (
      <OmokStone
        key={`stone-${index}`}
        color={stone.color}
        position={stone.position}
      />
    ));
  };

  return (
    <>
      {/* 오목돌 보울 모델 렌더링 */}
      <Model
        key="woodenBowl1"
        url="/images/model/wooden-bowl/wooden_bowl_01_4k.gltf"
        scale={[15, 27, 15]}
        position={[-14, -4, -9]}
      />
      <Model
        key="woodenBowl2"
        url="/images/model/wooden-bowl02/wooden_bowl_02_4k.gltf"
        scale={[15, 27, 15]}
        position={[14, -4, 9]}
      />

      {/* 바둑알 렌더링 */}
      {renderStones(blackStonePositions)}
      {renderStones(whiteStonePositions)}

      <OrbitControls />
    </>
  );
};
