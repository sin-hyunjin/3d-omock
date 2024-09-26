"use client";

import { OmokMainCanvas } from "@/components/omok-main-canvas";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const enterRoom = () => {
    const randomRoomId = Math.floor(Math.random() * 1000); // 임의의 roomId 생성
    router.push(`/room/${randomRoomId}`);
  };

  return (
    <>
      <div style={{ height: "100vh", width: "100vw" }}>
        {/* 게임 시작 버튼 */}
        <button onClick={enterRoom}>게임 시작</button>
        {/* Omok Canvas */}
        <OmokMainCanvas cameraPosition={[0, 45, 30]} cameraFov={50} />
      </div>
    </>
  );
}
