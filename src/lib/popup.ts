/**
 * src/lib/popup.ts
 * ----------------------------------------------------------------------------
 * Shape of a Strapi "popup" form entry (collection type: Popup). Pages fetch
 * their related form entries (e.g. products-page.usecase_form) and pass them
 * into form components as `config` — copy comes from the CMS, with the
 * component's hardcoded strings as fallback when an entry is missing/empty.
 * ----------------------------------------------------------------------------
 */

export type PopupField = {
  id: number;
  documentId?: string;
  name: string;
  label?: string;
  type: string;
  placeholder?: string;
  helper_text?: string;
  required: boolean;
};

export type PopupConfig = {
  documentId?: string;
  title?: string;
  page?: string;
  description?: string;
  cta_label?: string;
  success_title?: string;
  success_text?: string;
  recipient_emails?: string | null;
  fields?: PopupField[];
} | null;

/** Field lookup by name, for forms whose layout is code-fixed. */
export function popupField(config: PopupConfig | undefined, name: string): PopupField | undefined {
  return config?.fields?.find((f) => f.name === name);
}
