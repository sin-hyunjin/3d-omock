import { ModelProps } from "@/types/omok.type";
import { useGLTF } from "@react-three/drei";

export const Model = ({
  url,
  scale = [0, 0, 0],
  position = [0, 0, 0],
}: ModelProps) => {
  const { scene } = useGLTF(url); // useGLTF 훅으로 모델을 로드
  // 모델의 크기를 조절
  scene.scale.set(...scale); // 원하는 스케일로 조절
  scene.position.set(...position); // 원하는 위치로 조절

  return <primitive object={scene} castShadow receiveShadow />; // 모델 렌더링
};
