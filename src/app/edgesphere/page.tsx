import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EdgeSphere | Ambient Scientific",
  description: "Ambient Scientific EdgeSphere Platform.",
};

const EDGESPHERE_URL = "https://180.151.197.37:8444";

export default function EdgeSpherePage() {
  return (
    <main className="relative w-full h-[calc(100vh-78px)] overflow-hidden bg-black">
      <iframe
        src={EDGESPHERE_URL}
        title="EdgeSphere Platform"
        className="w-full h-full border-0 block"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; full-screen"
        allowFullScreen
      />
    </main>
  );
}
