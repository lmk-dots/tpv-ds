import React, { useState } from 'react';
import { DropdownList } from './DropdownList';
import { IconButton } from './IconButton';
import { List as BurgerMenu } from '@phosphor-icons/react';

export interface DropdownMenuOption {
  label: string;
  value: string | number;
}

export interface DropdownMenuProps {
  options: DropdownMenuOption[];
  onSelect: (value: string | number) => void;
  mode: 'light' | 'dark';
  style?: React.CSSProperties;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ options, onSelect, mode, style }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'relative', ...style }}>
      <IconButton
        icon={BurgerMenu}
        size={36}
        mode={mode}
        backgroundColorToken="button-bg-color-primary"
        ariaLabel="Abrir menú de opciones"
        onClick={() => setOpen(o => !o)}
      />
      {open && (
        <div style={{ position: 'absolute', top: 44, right: 0 }}>
          <DropdownList
            options={options}
            onSelect={value => {
              onSelect(value);
              setOpen(false);
            }}
            mode={mode}
          />
        </div>
      )}
    </div>
  );
};
