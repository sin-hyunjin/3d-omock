"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FC } from "react";
import { TextureLoader } from "three";

interface StoneProps {
  color: string;
  position?: [number, number, number];
  scale?: [number, number, number];
}

const Stone: FC<StoneProps> = ({
  color,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  ...props
}) => {
  return (
    <mesh position={position} scale={scale} {...props} receiveShadow>
      <cylinderGeometry args={[0.44, 0.45, 0.1, 32]} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
    </mesh>
  );
};

const WoodenBox: FC = () => {
  return (
    <mesh position={[0, 0, 0]} castShadow receiveShadow>
      <boxGeometry args={[5, 3, 5]} />
      <meshStandardMaterial
        map={new TextureLoader().load("/images/wood-texture.jpg")}
        roughness={0.7}
        metalness={0.1}
      />
    </mesh>
  );
};

const Scene: FC = () => {
  return (
    <Canvas
      camera={{
        position: [0, 10, 20],
        fov: 50,
        near: 0.1,
        far: 1000,
      }}
      shadows
    >
      {/* 조명 설정 */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[-10, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* 바둑통과 바둑돌 추가 */}
      <WoodenBox />
      <Stone color="black" position={[0, 0.1, 1]} />
      <Stone color="white" position={[0, 0.1, -1]} />

      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
