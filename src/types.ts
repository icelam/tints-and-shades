export type Position = {
  x?: number; y?: number;
}

export type AppTheme = 'light' | 'dark';
export type AppThemeOptions = AppTheme | 'system';
export type AppThemeStorage = {
  theme?: AppThemeOptions;
}
