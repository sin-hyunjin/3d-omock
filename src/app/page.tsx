"use client";

import { OmokMainCanvas } from "@/components/omok-main-canvas";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const router = useRouter();

  const enterRoom = () => {
    const uniqueRoomId = uuidv4();
    router.push(`/room/${uniqueRoomId}`);
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
