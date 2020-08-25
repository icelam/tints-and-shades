import { RgbColor, TintsOrShadesItem, TintsOrShadesMode } from '@types';

const randomRgbNumber = (): number => Math.floor(Math.random() * 256); // 0 - 255

export const colorHexToRgb = (color: string): RgbColor | null => {
  const re = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  const hexParts = re.exec(color.toLowerCase());

  if (!hexParts) {
    return null;
  }

  const [, red, green, blue] = hexParts;

  return {
    red: parseInt(red, 16),
    green: parseInt(green, 16),
    blue: parseInt(blue, 16)
  };
};

export const colorRgbToHex = (color: string | RgbColor): string | null => {
  let colorParts: number[] = [];
  if (typeof color === 'string') {
    const re = /^(\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})$/;
    const rgbParts = re.exec(color);

    if (!rgbParts) {
      return null;
    }

    const [, red, green, blue] = rgbParts;
    colorParts = [
      parseInt(red, 10),
      parseInt(green, 10),
      parseInt(blue, 10)
    ];
  } else {
    const { red, green, blue } = color;
    colorParts = [red, green, blue];
  }

  const hexValue = colorParts.map((part) => {
    const hex = part.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }).join('');

  return `#${hexValue}`;
};

export const randomHexColor = (): string | null => {
  const randomRgbNumbers: RgbColor = {
    red: randomRgbNumber(),
    green: randomRgbNumber(),
    blue: randomRgbNumber()
  };

  return colorRgbToHex(randomRgbNumbers);
};

const calculateTints = (
  value: number,
  step: number
): number => Math.round(value + ((255 - value) * (step / 10)));
const calculateShades = (
  value: number,
  step: number
): number => Math.round(value * ((10 - step) / 10));

export const generateTintsOrShades = (
  color: string,
  mode: TintsOrShadesMode
): TintsOrShadesItem[] => {
  const rgb = colorHexToRgb(color);

  if (!rgb) {
    return [];
  }

  const result: TintsOrShadesItem[] = [{ hex: color, rgb }];

  const calculateNewValue = mode === 'tints'
    ? calculateTints
    : calculateShades;

  for (let i = 1; i <= 10; i++) {
    const nextStepRgb = {
      red: calculateNewValue(rgb.red, i),
      green: calculateNewValue(rgb.green, i),
      blue: calculateNewValue(rgb.blue, i)
    };
    const nexStepHex = colorRgbToHex(nextStepRgb) ?? '';

    result.push({
      hex: nexStepHex,
      rgb: nextStepRgb
    });
  }

  return result;
};
