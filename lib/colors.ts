export function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

const PASTEL_SATURATION = '65%';
const PASTEL_LIGHTNESS = '80%';

export const getColorByIndex = (
  length: number,
  index: number,
  { saturation = PASTEL_SATURATION, lightness = PASTEL_LIGHTNESS } = {}
) => {
  const S = saturation;
  const L = lightness;

  const parts = 360 / length;
  const H = Math.round(index * parts + 10);
  const hsl = `hsl(${H} ${S} ${L})`;
  return hsl;
};

export const getPastelColor = (hue: number) => {
  const S = PASTEL_SATURATION;
  const L = PASTEL_LIGHTNESS;

  const hsl = `hsl(${hue} ${S} ${L})`;
  return hsl;
};
