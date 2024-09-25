"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Floor, OmokBoard, OmokBox } from "./components";
import { useState } from "react";
import { Model } from "@/components/model";
import { PerspectiveCamera } from "three";

export default function Page() {
  // 카메라 위치와 시야각을 조정할 수 있도록 상태 관리
  const initialPosition: [number, number, number] = [0, 45, 30];
  const [cameraPosition, setCameraPosition] = useState<
    [number, number, number]
  >([0, 45, 30]);
  const [cameraFov, setCameraFov] = useState<number>(50);

  // 카메라 위치와 시야각을 변경하는 함수
  const changeCameraPosition = () => {
    console.log("카메라위치변경");
    setCameraPosition([0, 30, 10]); // 새로운 카메라 위치 설정
    setCameraFov(40); // 새로운 시야각 설정
  };

  // 카메라를 초기 상태로 복귀하는 함수
  const resetCameraPosition = () => {
    console.log("카메라 초기화");
    setCameraPosition(initialPosition); // 초기 카메라 위치로 복귀
    setCameraFov(50); // 초기 시야각으로 복귀
  };

  const CameraController = () => {
    const { camera } = useThree();

    useFrame(() => {
      const perspectiveCamera = camera as PerspectiveCamera; // PerspectiveCamera로 타입 캐스팅
      perspectiveCamera.position.set(...cameraPosition);
      perspectiveCamera.fov = cameraFov;
      perspectiveCamera.updateProjectionMatrix(); // 카메라 상태 업데이트
    });

    return null;
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {/* 카메라 위치 조정 버튼 */}
      <button
        onClick={changeCameraPosition}
        className="flex bottom-20 right-0 z-40 fixed w-24 bg-amber-400 p-2"
      >
        카메라 변경
      </button>
      {/* 카메라 초기화 버튼 */}
      <button
        onClick={resetCameraPosition}
        className="flex bottom-0 right-0 z-40 fixed w-24 bg-amber-400 p-2"
      >
        카메라 초기화
      </button>
      <Canvas
        camera={{
          position: cameraPosition, // 카메라의 위치 설정
          fov: cameraFov, // 카메라의 시야각 설정
          near: 0.2, // 카메라의 가까운 클리핑 평면 설정
          far: 1000, // 카메라의 먼 클리핑 평면 설정
        }}
        shadows // 그림자 기능 활성화
      >
        <CameraController />
        {/* 카메라와 조명 설정 */}
        <ambientLight intensity={1} />
        <directionalLight
          position={[-12, 10, -1]} // 왼쪽 위에서 빛이 나오는 위치 설정
          intensity={1.5} // 빛의 강도
          castShadow // 그림자 활성화
          shadow-mapSize-width={1024} // 그림자 해상도
          shadow-mapSize-height={1024}
          shadow-camera-far={50} // 그림자를 캐스팅하는 거리
          shadow-camera-left={-20} // 그림자 범위 설정
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        {/* 방향성 조명 */}

        <OrbitControls
          enableZoom={true} // 줌 허용
          enablePan={true} // 팬 허용
          maxPolarAngle={Math.PI / 2} // 카메라가 수직으로 90도까지만 회전하도록 제한
          minPolarAngle={Math.PI / 14} // 카메라가 수직으로 45도까지 회전하도록 제한
          maxAzimuthAngle={Math.PI / 2} // 카메라가 수평으로 90도까지만 회전하도록 제한
          minAzimuthAngle={-Math.PI / 2} // 카메라가 수평으로 -90도까지 회전하도록 제한
          maxDistance={80} // 카메라가 물체에서 멀어질 수 있는 최대 거리
          minDistance={10} // 카메라가 물체에 가까워질 수 있는 최소 거리
        />

        {/* 장롱 모델 렌더링 */}
        <Model
          key="GothicCabinet"
          url="/images/model/gothic-cabinet/GothicCabinet_01_4k.gltf"
          scale={[13, 14, 8]}
          position={[38, -5, -45]}
        />
        {/* 장롱 위치를 시각적으로 확인하기 위한 조명 표시 구체 */}
        <pointLight
          position={[40, 15, -30]}
          intensity={20}
          distance={30} // 빛의 영향을 미치는 최대 거리
          decay={0.7} // 거리와 함께 얼마나 빨리 감쇠되는지
          castShadow
        />
        {/* <mesh position={[40, 20, -35]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial color="red" />
        </mesh> */}
        {/* 바닥돌 모델 렌더링 */}
        <Model
          key="stone_fire"
          url="/images/model/stone/stone_fire_pit_4k.gltf"
          scale={[15, 8, 15]}
          position={[38, -2, 40]}
        />

        {/* 오목판 모델 */}
        <OmokBoard />
        {/* 바둑알 및 바둑통 모델 */}
        <OmokBox />

        {/* 바닥 추가 */}
        <Floor position={[0, -4.5, 0]} />
        <Floor position={[0, 95.5, 0]} />
        <Floor position={[-49.7, 45.5, 0]} rotation={[Math.PI / 2, 0, 11]} />
        <Floor position={[49.7, 45.5, 0]} rotation={[Math.PI / 2, 0, 11]} />
        <Floor position={[0, 45.5, -49.2]} rotation={[Math.PI / 2, 0, 0]} />
      </Canvas>
      {/* <Scene /> */}
    </div>
  );
}
