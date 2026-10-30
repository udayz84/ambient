"use client";

import { ProductBriefModal } from "../products-page/ProductBriefModal";
import type { PopupConfig } from "@/lib/popup";

export function ResourceDownloadModal({
  isOpen,
  onClose,
  pdfUrl,
  config,
  title,
  ctaLabel,
}: {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  /** CMS form entry (resources-page download_form relation). Null = generic fallback copy. */
  config?: PopupConfig;
  title?: string;
  ctaLabel?: string;
}) {
  return (
    <ProductBriefModal
      isOpen={isOpen}
      onClose={onClose}
      title={config?.title || title || "Download Resource"}
      config={config}
      pdfUrl={pdfUrl}
      pdfName={pdfUrl ? pdfUrl.split("/").pop() : "download.pdf"}
      formKey="resource-download"
      ctaLabel={ctaLabel}
    />
  );
}
