import React from 'react';
import { getToken } from '../styles/getToken';

export interface DropdownItemProps {
  label: string;
  value: string | number;
  onClick: (value: string | number) => void;
  mode: 'light' | 'dark';
  background: string;
  style?: React.CSSProperties;
  isLast?: boolean;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({ label, value, onClick, mode, background, style, isLast }) => (
  <div
    onClick={() => onClick(value)}
    style={{
      background,
      color: getToken('text-color-primary', mode),
      padding: '16px',
      cursor: 'pointer',
      fontWeight: 500,
      fontSize: getToken('font-size-s', 'general'),
      borderBottom: !isLast ? `1px solid ${getToken('bg-color-primary', mode)}` : 'none',
      transition: 'background 0.2s',
      ...style,
    }}
    onMouseDown={e => e.preventDefault()}
  >
    {label}
  </div>
);
