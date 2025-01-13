export const darkenRgbColor = (rgbColor: string, percentage: number): string => {
  const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
  const match = rgbColor.match(rgbRegex);
  if (!match || percentage < 0 || percentage > 100) {
    return rgbColor;
  }

  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);

  const factor = percentage / 100;
  const newR = Math.max(0, Math.round(r * (1 - factor)));
  const newG = Math.max(0, Math.round(g * (1 - factor)));
  const newB = Math.max(0, Math.round(b * (1 - factor)));

  return `rgb(${newR}, ${newG}, ${newB})`;
};
