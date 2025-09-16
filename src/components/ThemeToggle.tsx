import { Sun } from '@phosphor-icons/react';
import { IconButton } from './IconButton';

type ThemeToggleProps = {
  mode: 'light' | 'dark';
  onToggle: () => void;
};

export const ThemeToggle = ({ mode, onToggle }: ThemeToggleProps) => (
  <IconButton
    icon={Sun}
    ariaLabel="Cambiar modo de tema"
    onClick={onToggle}
    mode={mode}
  />
);
