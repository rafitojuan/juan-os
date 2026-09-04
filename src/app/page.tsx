"use client";

import LockScreen from "@/components/os/LockScreen";
import Desktop from "@/components/os/Desktop";

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden relative">
      <Desktop />
      <LockScreen />
    </main>
  );
}
