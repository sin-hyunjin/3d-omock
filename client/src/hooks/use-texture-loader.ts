"use client";
import { useEffect, useState } from "react";
import { MeshStandardMaterial, TextureLoader } from "three";

// 커스텀 훅: 텍스처를 비동기적으로 로드하고 재질을 반환
const useTextureLoader = (texturePath: string): MeshStandardMaterial | null => {
  const [material, setMaterial] = useState<MeshStandardMaterial | null>(null);

  useEffect(() => {
    const loader = new TextureLoader();

    loader.load(
      texturePath,
      (texture) => {
        const newMaterial = new MeshStandardMaterial({ map: texture });
        setMaterial(newMaterial);
      },
      undefined,
      (error) =>
        console.error("텍스처를 로드하는 동안 오류가 발생했습니다.", error)
    );
  }, [texturePath]);

  return material;
};

export default useTextureLoader;
