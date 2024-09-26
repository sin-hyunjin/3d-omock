// 카메라의 위치와 시야각 타입
export interface CameraProps {
  cameraPosition: [number, number, number];
  cameraFov: number;
}
// OmokMainCanvas 컴포넌트의 props 타입
export interface OmokCanvasProps {
  cameraPosition: [number, number, number];
  cameraFov: number;
}
// 바닥재 텍스쳐 타입
export interface FloorProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

// 모델  타입
export interface ModelProps {
  url: string;
  scale?: [number, number, number];
  position?: [number, number, number];
}
// 오목 그리드 선 타입
export interface OmokGridHelperProps {
  size: number;
  spacing: number;
}

// 오목 돌을 두기 위한 포인트 타입
export interface GridPointProps {
  position: [number, number, number];
  onClick: (position: [number, number, number]) => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

// 오목 돌 모델
export interface Stone {
  position: [number, number, number];
  color: string;
}
// 오목 돌 색깔과 위치 및 오목돌을 두기전 투명화
export interface StoneProps {
  color: string;
  position?: [number, number, number];
  scale?: [number, number, number];
  opacity?: number;
}

export interface OmokStore {
  stones: Stone[];
  currentColor: string;
  addStone: (stone: Stone) => void;
  toggleColor: () => void;
}
