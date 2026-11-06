import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EdgeSphere | Ambient Scientific",
  description: "Ambient Scientific EdgeSphere Platform.",
};

const PROXY_IFRAME_URL = "/api/edgesphere-proxy/";

export default function EdgeSpherePage() {
  return (
    <main className="relative w-full h-[calc(100vh-78px)] overflow-hidden bg-black">
      <iframe
        src={PROXY_IFRAME_URL}
        title="EdgeSphere Platform"
        className="w-full h-full border-0 block"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; full-screen"
        allowFullScreen
      />
    </main>
  );
}
