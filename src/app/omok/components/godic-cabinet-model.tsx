import { GodicCabineModelProps } from "@/types/omok.type";
import { useGLTF } from "@react-three/drei";

export const GodicCabinetModel = ({ url }: GodicCabineModelProps) => {
  const { scene } = useGLTF(url); // useGLTF 훅으로 모델을 로드
  // 모델의 크기를 조절
  scene.scale.set(13, 14, 8); // 원하는 스케일로 조절
  scene.position.set(40, -5, -45); // 원하는 위치로 조절

  return <primitive object={scene} castShadow receiveShadow />; // 모델 렌더링
};
