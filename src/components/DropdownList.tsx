import React from 'react';
import { DropdownItem } from './DropdownItem';
import { getToken } from '../styles/getToken';

export interface DropdownListProps {
  options: Array<{ label: string; value: string | number }>;
  onSelect: (value: string | number) => void;
  mode: 'light' | 'dark';
  style?: React.CSSProperties;
}

export const DropdownList: React.FC<DropdownListProps> = ({ options, onSelect, mode, style }) => {
  return (
    <div
      style={{
        width: 204,
        boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
        borderRadius: getToken('corner-radius-m', 'general'),
        overflow: 'hidden',
        zIndex: 10,
        border: `2px solid ${getToken('bg-color-secondary', mode)}`,
        ...style,
      }}
    >
      {options.map((opt, idx) => (
        <DropdownItem
          key={opt.value}
          label={opt.label}
          value={opt.value}
          onClick={onSelect}
          mode={mode}
          background={idx % 2 === 0 ? getToken('bg-color-alt', mode) : getToken('bg-color-primary', mode)}
          isLast={idx === options.length - 1}
        />
      ))}
    </div>
  );
};
