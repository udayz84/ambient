/**
 * Splits a title string into two balanced lines for two-line hero titles.
 * If newlines are present, preserves them.
 * Otherwise splits by sentence boundary (e.g. "Clinical precision. Coin-cell power.")
 * or colon/dash/semicolon, or splits near the middle word.
 */
export function splitTitleIntoTwoLines(rawTitle?: string): string[] {
  if (!rawTitle) return [];
  const trimmed = rawTitle.trim();
  if (!trimmed) return [];

  // 1. Explicit newline present (CMS or fallback)
  if (trimmed.includes("\n")) {
    const lines = trimmed
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length > 1) return lines;
  }

  // 2. Sentence boundary: e.g. "Clinical precision. Coin-cell power."
  const sentenceMatch = trimmed.match(/^(.+?[.!?])\s+(.+)$/);
  if (sentenceMatch) {
    return [sentenceMatch[1].trim(), sentenceMatch[2].trim()];
  }

  // 3. Colon/dash/semicolon boundary: e.g. "Smart Homes: Intelligence at the Edge"
  const punctMatch = trimmed.match(/^(.+?[:;—–])\s+(.+)$/);
  if (punctMatch) {
    return [punctMatch[1].trim(), punctMatch[2].trim()];
  }

  // 4. Split by words near the middle
  const words = trimmed.split(/\s+/);
  if (words.length <= 1) {
    return [trimmed];
  }
  const mid = Math.ceil(words.length / 2);
  return [
    words.slice(0, mid).join(" "),
    words.slice(mid).join(" "),
  ];
}
