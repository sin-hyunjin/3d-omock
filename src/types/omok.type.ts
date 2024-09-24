// 바닥재 텍스쳐 타입
export interface FloorProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

// 장롱 모델 URL 타입
export interface GodicCabineModelProps {
  url: string;
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

// 오목 돌 색깔과 위치 타입
export interface StoneProps {
  color: string;
  position?: [number, number, number];
  scale?: [number, number, number];
  opacity?: number;
}

export interface Stone {
  position: [number, number, number];
  color: string;
}
