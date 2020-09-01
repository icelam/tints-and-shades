import { RgbColor, TintsOrShadesItem, TintsOrShadesMode } from '@types';

const VALID_HEX_COLOR_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
const VALID_RGB_COLOR_REGEX = /^(\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})$/;

export const isValidHexColor = (value: string): boolean => VALID_HEX_COLOR_REGEX.test(value);

export const isValidRgbColor = (value: string): boolean => {
  const rgbParts = VALID_RGB_COLOR_REGEX.exec(value.toLowerCase());

  if (!rgbParts) {
    return false;
  }

  const red = parseInt(rgbParts[1], 10);
  const green = parseInt(rgbParts[2], 10);
  const blue = parseInt(rgbParts[3], 10);

  return (red >= 0 && red <= 255)
    && (green >= 0 && green <= 255)
    && (blue >= 0 && blue <= 255);
};

const randomRgbNumber = (): number => Math.floor(Math.random() * 256); // 0 - 255

export const convertColorHexToRgb = (color: string): RgbColor | null => {
  const hexParts = VALID_HEX_COLOR_REGEX.exec(color.toLowerCase());

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

export const convertColorHexToRgbString = (color: string): string => {
  const rgbObject = convertColorHexToRgb(color);
  return rgbObject
    ? `${rgbObject.red}, ${rgbObject.green}, ${rgbObject.blue}`
    : '';
};

export const convertColorRgbToHex = (color: string | RgbColor): string | null => {
  let colorParts: number[] = [];
  if (typeof color === 'string') {
    const rgbParts = VALID_RGB_COLOR_REGEX.exec(color);

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

  return convertColorRgbToHex(randomRgbNumbers);
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
  const rgb = convertColorHexToRgb(color);

  if (!rgb) {
    return [];
  }

  const result: TintsOrShadesItem[] = [
    {
      hex: color,
      rgb,
      rgbString: `${rgb.red}, ${rgb.green}, ${rgb.blue}`
    }
  ];

  const calculateNewValue = mode === 'tints'
    ? calculateTints
    : calculateShades;

  for (let i = 1; i <= 10; i++) {
    const nextStepRgb = {
      red: calculateNewValue(rgb.red, i),
      green: calculateNewValue(rgb.green, i),
      blue: calculateNewValue(rgb.blue, i)
    };
    const nexStepHex = convertColorRgbToHex(nextStepRgb) ?? '';

    result.push({
      hex: nexStepHex,
      rgb: nextStepRgb,
      rgbString: `${nextStepRgb.red}, ${nextStepRgb.green}, ${nextStepRgb.blue}`
    });
  }

  return result;
};

export const removeHashFromHexColor = (color: string): string => color.replace('#', '');
