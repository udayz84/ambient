import type { Metadata } from "next";
import { ModelZoo } from "@/components/model-zoo/ModelZoo";
import { getSingleType } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Model Zoo | Ambient Scientific",
  description:
    "A growing library of ready-to-run AI models open-source and Ambient-built, every model tuned to run on GPX at microwatt power. Plug one into your dev or eval kit and watch it work in seconds.",
};

export default async function ModelZooPage() {
  let forms: any = null;
  try {
    const data = await getSingleType<any>("model-zoo-page", [
      "sdk_form",
      "evalkit_form",
      "request_form",
    ]);
    forms = data
      ? { sdk: data.sdk_form, evalkit: data.evalkit_form, request: data.request_form }
      : null;
  } catch {
    forms = null;
  }
  return <ModelZoo forms={forms} />;
}
