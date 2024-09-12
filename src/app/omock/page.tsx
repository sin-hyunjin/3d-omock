"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OmockBoard } from "./components";
import { FC } from "react";
import { MeshProps } from "@react-three/fiber";
interface StoneProps extends MeshProps {
  color: string;
}

const Stone: FC<StoneProps> = ({ color, ...props }) => {
  return (
    <mesh {...props} castShadow>
      <sphereGeometry args={[0.4, 0.3, 0, 0]} />{" "}
      {/* 바둑돌의 크기와 세분화 정도 설정 */}
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Home = () => {
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
        <ambientLight intensity={2} />

        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <OrbitControls
          maxPolarAngle={Math.PI / 2} // 카메라가 수직으로 90도까지만 회전하도록 제한
          minPolarAngle={Math.PI / 14} // 카메라가 수직으로 45도까지 회전하도록 제한
          maxAzimuthAngle={Math.PI / 2} // 카메라가 수평으로 90도까지만 회전하도록 제한
          minAzimuthAngle={-Math.PI / 2} // 카메라가 수평으로 -90도까지 회전하도록 제한
        />
        <OmockBoard />
        {/* 바둑돌 추가 */}
        <Stone color="black" position={[5, 5, 0]} />
        <Stone color="white" position={[5, 6, 1]} />
      </Canvas>
    </div>
  );
};

export default Home;
