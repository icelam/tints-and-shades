export type Position = {
  x?: number; y?: number;
}

export type AppTheme = 'light' | 'dark';
export type AppThemeOptions = AppTheme | 'system';

// Storage
export type PinStatusStorage = {
  isPinned?: boolean;
};

export type SelectedColorStorage = {
  selectedColor?: string;
};

export type AppThemeStorage = {
  theme?: AppThemeOptions;
}

export type ColorInputMode = 'hex' | 'rgb';

export type ColorInputModeStorage = {
  inputMode?: ColorInputMode;
}

export type RgbColor = {
  red: number;
  green: number;
  blue: number;
};

export type TintsOrShadesMode = 'tints' | 'shades';

export type TintsOrShadesItem = {
    hex: string;
    rgb: RgbColor;
};

