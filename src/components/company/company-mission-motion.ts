export const STAT_CARD_STAGGER_MS = 120;
export const STAT_CARD_ENTER_MS = 650;
export const COUNT_DURATION_MS = 2200;
export const COUNT_START_AFTER_CARD_MS = 380;

/** Slow start, fast middle, slow end */
export function easeInOutQuart(t: number) {
  return t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2;
}

export function countProgress(t: number) {
  return easeInOutQuart(Math.min(Math.max(t, 0), 1));
}

export function parseStatValue(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { target: 0, suffix: value };
  return { target: Number(match[1]), suffix: match[2] };
}

export const STAT_VALUE_GRADIENT =
  "linear-gradient(98.8336deg, rgb(255, 255, 255) 1.3527%, rgb(212, 233, 188) 55.161%, rgb(255, 255, 255) 111.67%)";
