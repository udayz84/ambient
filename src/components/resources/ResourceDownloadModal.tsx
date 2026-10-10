import { useState, useEffect } from "react";
import { gilroyMedium, interRegular } from "../hero/fonts";

type FormField = {
  id: number;
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required: boolean;
};

type PopupConfig = {
  id: number;
  title: string;
  description: string;
  cta_label: string;
  cta_link: string;
  fields: FormField[];
};

export function ResourceDownloadModal({
  isOpen,
  onClose,
  pdfUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}) {
  const [config, setConfig] = useState<PopupConfig | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1338";

  useEffect(() => {
    if (!config) {
      // Fetch popup config immediately so it's ready when opened
      fetch(`${strapiUrl}/api/popups?populate=fields`)
        .then(async (res) => {
          if (!res.ok) {
            return null;
          }
          return res.json();
        })
        .then((res) => {
          if (res && res.data && res.data.length > 0) {
            const popup = res.data[0];
            setConfig({
              id: popup.id,
              title: popup.title,
              description: popup.description,
              cta_label: popup.cta_label,
              cta_link: popup.cta_link,
              fields: popup.fields,
            });
          }
        })
        .catch((err) => {
          console.warn("Could not fetch popup config", err);
        });
    }
  }, [config, strapiUrl, isOpen]);

  if (!isOpen) return null;
  if (!config) return null; // Don't show modal until config is loaded

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Sync to Mailchimp via server-side API (resource-download = transactional)
      const emailValue = formData["email"] || formData["Email"] || "";
      if (emailValue) {
        fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailValue,
            formKey: "resource-download",
            firstName: formData["first_name"] || formData["firstName"] || formData["name"] || undefined,
            lastName: formData["last_name"] || formData["lastName"] || undefined,
            company: formData["company"] || formData["Company"] || undefined,
          }),
        }).catch(() => { /* Mailchimp sync failure is non-blocking */ });
      }

      // Download PDF programmatically
      const a = document.createElement("a");
      a.href = pdfUrl;
      a.target = "_blank";
      a.download = pdfUrl.split("/").pop() || "download";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      onClose();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div className="relative w-full max-w-md bg-[#191919] p-8 border-[0.5px] border-[rgba(255,255,255,0.3)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          ✕
        </button>
        <h3 className={`${gilroyMedium.className} text-2xl text-white mb-2 [word-break:break-word]`}>
          {config?.title || "Download Resource"}
        </h3>
        <p className={`${interRegular.className} text-[#a4a4a4] mb-6 text-[16px] leading-[24px] [word-break:break-word]`}>
          {config?.description || "Please fill out the form to download this resource."}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {config?.fields?.map((field) => (
            <div key={field.id}>
              {field.label && (
                <label className="block text-sm text-white/80 mb-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
              )}
              <input
                type={field.type === "email" ? "email" : field.type === "number" ? "number" : field.type === "tel" ? "tel" : "text"}
                value={formData[field.name] || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder || ""}
                className={`${interRegular.className} w-full bg-[#010101] border-[0.5px] border-[rgba(255,255,255,0.3)] p-3 text-white focus:outline-none focus:border-[#4ade80] transition-colors`}
                required={field.required}
              />
            </div>
          ))}
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`${gilroyMedium.className} w-full bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-black py-3 px-6 text-[16px] font-medium tracking-wide hover:opacity-90 disabled:opacity-50 transition-opacity mt-2`}
          >
            {loading ? "Submitting..." : (config?.cta_label || "Submit & Download")}
          </button>
        </form>
      </div>
    </div>
  );
}
