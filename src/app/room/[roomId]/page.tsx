"use client";

import { useState } from "react";
import { useGameStateStore } from "@/store/omok-store";
import { OmokMainCanvas } from "@/components/omok-main-canvas";

export default function Page() {
  const { resetStones } = useGameStateStore();
  // 카메라 위치와 시야각을 조정할 수 있도록 상태 관리
  const initialPosition: [number, number, number] = [0, 45, 30];
  const [cameraPosition, setCameraPosition] = useState<
    [number, number, number]
  >([0, 45, 30]);
  const [cameraFov, setCameraFov] = useState<number>(50);

  // 카메라 위치와 시야각을 변경하는 함수
  const changeCameraPosition = () => {
    console.log("게임시작");
    setCameraPosition([0, 30, 10]); // 새로운 카메라 위치 설정
    setCameraFov(40); // 새로운 시야각 설정
  };

  // 카메라를 초기 상태로 복귀하는 함수
  const resetCameraPosition = () => {
    console.log("게임 초기화");

    resetStones(); // 게임리셋
    setCameraPosition(initialPosition); // 초기 카메라 위치로 복귀
    setCameraFov(50); // 초기 시야각으로 복귀
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {/* 카메라 위치 조정 버튼 */}
      <button
        onClick={changeCameraPosition}
        className="flex bottom-20 right-0 z-40 fixed w-24 bg-amber-400 p-2"
      >
        게임시작
      </button>
      {/* 카메라 초기화 버튼 */}
      <button
        onClick={resetCameraPosition}
        className="flex bottom-0 right-0 z-40 fixed w-24 bg-amber-400 p-2"
      >
        게임 초기화
      </button>
      {/* Omok Canvas */}
      <OmokMainCanvas cameraPosition={cameraPosition} cameraFov={cameraFov} />
    </div>
  );
}
