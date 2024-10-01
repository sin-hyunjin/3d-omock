"use client";

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
      {/* 게임 시작 버튼 */}
      {/* Omok Canvas */}

      <button
        onClick={enterRoom}
        className="z-40 fixed w-40 h-16 bg-[url('/images/jpg/brown-wooden-textured-flooring-background.jpg')] bg-cover bg-center shadow-lg text-white rounded-lg p-4 transition-transform transform hover:scale-105 active:scale-95 mb-40"
      >
        AI 대결
      </button>
      <button
        onClick={enterRoom}
        className="z-40 fixed w-40 h-16 bg-[url('/images/jpg/brown-wooden-textured-flooring-background.jpg')] bg-cover bg-center shadow-lg text-white rounded-lg p-4 transition-transform transform hover:scale-105 active:scale-95 "
      >
        온라인 대결
      </button>
      <button
        onClick={enterRoom}
        className="z-40 fixed w-40 h-16 bg-[url('/images/jpg/brown-wooden-textured-flooring-background.jpg')] bg-cover bg-center shadow-lg text-white rounded-lg p-4 transition-transform transform hover:scale-105 active:scale-95 mt-40"
      >
        오프라인 대결
      </button>
    </>
  );
}
