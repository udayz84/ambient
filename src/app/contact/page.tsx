import type { Metadata } from "next";
import { Contact } from "@/components/contact/Contact";

export const metadata: Metadata = {
  title: "Contact | Ambient Scientific",
  description:
    "Get in touch with Ambient Scientific engineering, commercial, and support teams.",
};

export default function ContactPage() {
  return <Contact />;
}
