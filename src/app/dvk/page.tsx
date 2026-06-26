import type { Metadata } from "next";
import { Dvk } from "@/components/dvk/Dvk";

export const metadata: Metadata = {
  title: "Cranium Development Kit | Ambient Scientific",
  description:
    "Validate real-time AI at microwatt power levels out of the box. The Cranium Development Kit comes fully loaded with onboard sensors, rich I/O, and pre-integrated drivers.",
};

export default function DvkPage() {
  return <Dvk />;
}
