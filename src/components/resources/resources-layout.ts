export const RESOURCES_BASE_HEIGHT = 4507;
export const RESOURCES_NEWS_TOP = 3393;
export const RESOURCES_FOOTER_TOP = 3273;
export const RESOURCES_CARD_ROW_HEIGHT = 469.161;
export const RESOURCES_ROW_GAP = 36;
export const RESOURCES_ROW_BLOCK_HEIGHT =
  RESOURCES_CARD_ROW_HEIGHT + RESOURCES_ROW_GAP;
export const RESOURCES_INITIAL_ROWS = 2;
export const RESOURCES_LOAD_MORE_BUTTON_BLOCK = 84;

export function getResourcesExtraHeight(
  visibleCount: number,
  canLoadMore: boolean
) {
  const rowCount = Math.ceil(visibleCount / 3);
  const extraRows = Math.max(0, rowCount - RESOURCES_INITIAL_ROWS);
  const buttonOffset = canLoadMore ? 0 : -RESOURCES_LOAD_MORE_BUTTON_BLOCK;

  return extraRows * RESOURCES_ROW_BLOCK_HEIGHT + buttonOffset;
}
