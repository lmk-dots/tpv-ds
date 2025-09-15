import tokens from '../styles/tokens.json';

export type Mode = 'light' | 'dark';

export function getMode(): Mode {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export function useDesignTokens(mode?: Mode) {
  const currentMode: Mode = mode || getMode();
  return {
    ...tokens.general,
    ...tokens[currentMode],
  };
}
