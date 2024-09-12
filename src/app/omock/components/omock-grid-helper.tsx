import * as THREE from "three";

// 그리드
export const OmockGridHelper = ({ size }: { size: number }) => {
  // GridHelper의 선 색깔을 진하게 설정
  const gridHelper = new THREE.GridHelper(
    size,
    18,
    new THREE.Color(0x000000),
    new THREE.Color(0x111111)
  );

  // GridHelper를 박스의 위쪽에 맞추기 위해 위치를 조정
  gridHelper.position.set(0, 4.05, 0); // 박스의 위쪽에 위치하도록 y 값을 조정
  // gridHelper.rotation.x = Math.PI / 2; // 그리드가 바닥을 향하도록 회전

  return <primitive object={gridHelper} />;
};
