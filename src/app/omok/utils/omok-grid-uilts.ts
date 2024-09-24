import { Stone } from "@/types/omok.type";

/*
 * 그리드의 꼭지점 메쉬를 생성하는 함수
 *
 * 1. 그리드의 `size`와 `spacing`을 입력으로 받음
 * 2. x축과 z축 좌표를 반복하여 각 좌표에 대한 포인트를 생성
 * 3. 생성된 포인트들은 y 좌표가 3.805로 설정되어 있으며, 이 위치에 맞춰 배치
 * 4. 반환되는 값은 [x, y, z] 형식의 좌표 배열
 */
export const createGridPoints = (size: number, spacing: number) => {
  const points: [number, number, number][] = [];
  for (let x = -size / 2; x <= size / 2; x += spacing) {
    for (let z = -size / 2; z <= size / 2; z += spacing) {
      points.push([x, 3.805, z] as [number, number, number]);
    }
  }
  return points;
};

/*
 * 5개의 돌이 연속으로 연결되었는지 확인하는 함수
 *
 * 1. 현재 놓여 있는 돌(`stones` 배열)과 새로 놓인 돌의 `position` 및 `color`를 입력으로 받음
 * 2. 4가지 방향 (오른쪽, 아래쪽, 오른쪽 대각선, 왼쪽 대각선)으로 돌이 얼마나 연결되었는지 확인
 * 3. 각 방향에 대해 `countStonesInDirection` 함수로 돌이 얼마나 이어져 있는지 세고, 양쪽 방향으로 모두 확인
 * 4. 특정 방향에서 돌이 5개 이상 연결되면 승리 조건을 충족하므로 true를 반환
 * 5. 어느 방향에서도 5개의 돌이 연결되지 않았다면 false를 반환
 */
export const checkWinCondition = (
  stones: Stone[],
  position: [number, number, number],
  color: string
) => {
  const directions = [
    [1, 0], // 오른쪽
    [0, 1], // 아래쪽
    [1, 1], // 오른쪽 아래 대각선
    [1, -1], // 오른쪽 위 대각선
  ];

  for (const [dx, dz] of directions) {
    let count = 1;

    // 한쪽 방향으로 체크
    count += countStonesInDirection(stones, position, color, dx, dz);
    // 반대 방향으로 체크
    count += countStonesInDirection(stones, position, color, -dx, -dz);

    if (count >= 5) return true; // 5개 돌이 연결됨
  }
  return false;
};

/*
 * 특정 방향으로 같은 색의 돌이 몇 개 있는지 세는 함수
 *
 * 1. `stones` 배열에서 특정 좌표(`position`)에서 같은 색(`color`)의 돌이 있는지 확인
 * 2. 주어진 방향 (`dx`, `dz`)으로 이동하면서 같은 색의 돌이 있는지 계속해서 검사
 * 3. 해당 방향으로 계속해서 돌이 있으면 `count` 값을 증가
 * 4. 같은 색의 돌이 없으면 반복을 멈추고 `count` 값을 반환
 */
const countStonesInDirection = (
  stones: Stone[],
  position: [number, number, number],
  color: string,
  dx: number,
  dz: number
) => {
  let count = 0;
  let [x, , z] = position;

  while (true) {
    x += dx;
    z += dz;
    const found = stones.find(
      (stone) =>
        stone.position[0] === x &&
        stone.position[2] === z &&
        stone.color === color
    );
    if (!found) break;
    count++;
  }
  return count;
};
