import type { Metadata } from "next";
import { Careers } from "@/components/careers/Careers";

export const metadata: Metadata = {
  title: "Careers | Ambient Scientific",
  description:
    "Join Ambient Scientific to re-architect the physics of AI and build the fundamental compute substrate for the next generation of intelligence.",
};

export default function CareersPage() {
  return <Careers />;
}
