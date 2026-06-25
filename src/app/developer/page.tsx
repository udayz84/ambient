import type { Metadata } from "next";
import { Developer } from "@/components/developer/Developer";

export const metadata: Metadata = {
  title: "Developer | Ambient Scientific",
  description:
    "ModelForge bridges training and deployment. Quantize, compile, and merge neural networks with your firmware — model to deployment in 15 minutes.",
};

export default function DeveloperPage() {
  return <Developer />;
}
