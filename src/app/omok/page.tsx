"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Floor, OmokBoard } from "./components";
import { FC } from "react";

interface ModelProps {
  url: string; // gltf 파일의 경로를 받을 prop
}

const MyModel: FC<ModelProps> = ({ url }) => {
  const { scene } = useGLTF(url); // useGLTF 훅으로 모델을 로드
  // 모델의 크기를 조절
  scene.scale.set(13, 14, 8); // 원하는 스케일로 조절
  scene.position.set(40, -5, -45); // 원하는 위치로 조절

  return <primitive object={scene} castShadow receiveShadow />; // 모델 렌더링
};

export default function Page() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas
        camera={{
          position: [0, 45, 30], // 카메라의 위치 설정
          fov: 50, // 카메라의 시야각 설정
          near: 0.2, // 카메라의 가까운 클리핑 평면 설정
          far: 1000, // 카메라의 먼 클리핑 평면 설정
        }}
        shadows // 그림자 기능 활성화
      >
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
        {/* 위치를 시각적으로 확인하기 위한 조명 표시 구체 */}
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
        <OrbitControls
          maxPolarAngle={Math.PI / 2} // 카메라가 수직으로 90도까지만 회전하도록 제한
          minPolarAngle={Math.PI / 14} // 카메라가 수직으로 45도까지 회전하도록 제한
          maxAzimuthAngle={Math.PI / 2} // 카메라가 수평으로 90도까지만 회전하도록 제한
          minAzimuthAngle={-Math.PI / 2} // 카메라가 수평으로 -90도까지 회전하도록 제한
        />
        {/* GLTF 모델 렌더링 */}
        <MyModel url="/images/model/GothicCabinet_01_4k.gltf" />
        <OmokBoard />

        {/* 바닥 추가 */}
        <Floor position={[0, -4.5, 0]} />
        <Floor position={[-49.7, 45.5, 0]} rotation={[Math.PI / 2, 0, 11]} />
        <Floor position={[0, 45.5, -49.2]} rotation={[Math.PI / 2, 0, 0]} />
      </Canvas>
      {/* <Scene /> */}
    </div>
  );
}
