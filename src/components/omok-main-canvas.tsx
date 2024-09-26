"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PerspectiveCamera } from "three";
import { OmokBoard, OmokBox, Floor } from "@/components/omok-room";
import { Model } from "./model";
import { CameraProps, OmokCanvasProps } from "@/types/omok.type";

const CameraController = ({ cameraPosition, cameraFov }: CameraProps) => {
  const { camera } = useThree();

  // 카메라의 위치 및 시야각을 프레임마다 업데이트
  useFrame(() => {
    const perspectiveCamera = camera as PerspectiveCamera;
    perspectiveCamera.position.set(...cameraPosition); // 카메라의 위치 설정
    perspectiveCamera.fov = cameraFov; // 카메라 시야각 설정
    perspectiveCamera.updateProjectionMatrix(); // 카메라의 투영 매트릭스 업데이트
  });

  return null;
};

// 오목 메인 캔버스 컴포넌트
export const OmokMainCanvas = ({
  cameraPosition,
  cameraFov,
}: OmokCanvasProps) => {
  return (
    <Canvas
      // 카메라의 기본 설정값 정의
      camera={{
        position: cameraPosition, // 카메라의 위치
        fov: cameraFov, // 카메라의 시야각
        near: 0.2, // 카메라의 가까운 클리핑 평면
        far: 1000, // 카메라의 먼 클리핑 평면
      }}
      shadows // 그림자 활성화
    >
      <CameraController cameraPosition={cameraPosition} cameraFov={cameraFov} />
      {/* 주변광 및 방향성 조명 설정 */}
      <ambientLight intensity={1} /> {/* 주변광 설정 */}
      <directionalLight
        position={[-12, 10, -1]} // 빛의 위치 설정
        intensity={1.5} // 빛의 강도
        castShadow // 그림자 활성화
        shadow-mapSize-width={1024} // 그림자 맵의 가로 크기
        shadow-mapSize-height={1024} // 그림자 맵의 세로 크기
        shadow-camera-far={50} // 그림자 카메라의 먼 클리핑 평면
        shadow-camera-left={-20} // 그림자 카메라의 왼쪽 경계
        shadow-camera-right={10} // 그림자 카메라의 오른쪽 경계
        shadow-camera-top={10} // 그림자 카메라의 위쪽 경계
        shadow-camera-bottom={-10} // 그림자 카메라의 아래쪽 경계
      />
      {/* 카메라 조작 컨트롤 (줌, 팬 등) */}
      <OrbitControls
        enableZoom // 줌 허용
        enablePan // 팬 허용
        maxPolarAngle={Math.PI / 2} // 카메라가 수직으로 90도까지만 회전하도록 제한
        minPolarAngle={Math.PI / 14} // 카메라가 수직으로 45도까지만 회전하도록 제한
        maxAzimuthAngle={Math.PI / 2} // 카메라가 수평으로 90도까지만 회전하도록 제한
        minAzimuthAngle={-Math.PI / 2} // 카메라가 수평으로 -90도까지만 회전하도록 제한
        maxDistance={80} // 카메라가 물체에서 멀어질 수 있는 최대 거리
        minDistance={10} // 카메라가 물체에 가까워질 수 있는 최소 거리
      />
      {/* GothicCabinet 3D 모델 */}
      <Model
        key="GothicCabinet"
        url="/images/model/gothic-cabinet/GothicCabinet_01_4k.gltf"
        scale={[13, 14, 8]} // 모델 크기 설정
        position={[38, -5, -45]} // 모델 위치 설정
      />
      {/* stone_fire 3D 모델 */}
      <Model
        key="stone_fire"
        url="/images/model/stone/stone_fire_pit_4k.gltf"
        scale={[15, 8, 15]} // 모델 크기 설정
        position={[38, -2, 40]} // 모델 위치 설정
      />
      {/* 오목판 및 기타 오목 관련 모델 */}
      <OmokBoard />
      <OmokBox />
      {/* 바닥 모델 추가 */}
      <Floor position={[0, -4.5, 0]} />
      {/* 메인 바닥 */}
      <Floor position={[0, 95.5, 0]} />
      {/* 천장 바닥 */}
      <Floor position={[-49.7, 45.5, 0]} rotation={[Math.PI / 2, 0, 11]} />{" "}
      {/* 왼쪽 벽 */}
      <Floor position={[49.7, 45.5, 0]} rotation={[Math.PI / 2, 0, 11]} />{" "}
      {/* 오른쪽 벽 */}
      <Floor position={[0, 45.5, -49.2]} rotation={[Math.PI / 2, 0, 0]} />{" "}
      {/* 뒤쪽 벽 */}
    </Canvas>
  );
};
