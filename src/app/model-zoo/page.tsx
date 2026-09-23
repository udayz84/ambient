import type { Metadata } from "next";
import { ModelZoo } from "@/components/model-zoo/ModelZoo";

export const metadata: Metadata = {
  title: "Model Zoo | Ambient Scientific",
  description:
    "A growing library of ready-to-run AI models — open-source and Ambient-built, every model tuned to run on GPX at microwatt power. Plug one into your dev or eval kit and watch it work in seconds.",
};

export default function ModelZooPage() {
  return <ModelZoo />;
}
