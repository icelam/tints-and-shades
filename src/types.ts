export type Position = {
  x?: number; y?: number;
}

export type AppTheme = 'light' | 'dark';
export type AppThemeOptions = AppTheme | 'system';

// Storage
export type PinStatusStorage = {
  isPinned?: boolean;
};

export type AppThemeStorage = {
  theme?: AppThemeOptions;
}

export type RgbColor = {
  red: number;
  green: number;
  blue: number;
};
