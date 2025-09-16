
import React from 'react';
import { IconButton } from './IconButton';
import { Minus, Plus } from '@phosphor-icons/react';
import { getToken } from '../styles/getToken';

interface QuantitySelectorProps {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  mode: 'light' | 'dark';
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({ value, onChange, min = 1, max = Infinity, mode }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', gap: 8 }}>
      <IconButton
        icon={({ size = 24 }) => (
          <Minus size={size} color={getToken('button-text-color-primary', mode)} />
        )}
        size={32}
        mode={mode}
        backgroundColorToken="button-bg-color-primary"
        ariaLabel="Restar cantidad"
        onClick={() => onChange(Math.max(min, value - 1))}
      />
      <span
        style={{
          fontWeight: 700,
          fontSize: getToken('font-size-m', 'general'),
          minWidth: 32,
          textAlign: 'center',
          color: getToken('text-color-primary', mode),
        }}
      >
        {value}
      </span>
      <IconButton
        icon={({ size = 24 }) => (
          <Plus size={size} color={getToken('button-text-color-primary', mode)} />
        )}
        size={32}
        mode={mode}
        backgroundColorToken="button-bg-color-primary"
        ariaLabel="Sumar cantidad"
        onClick={() => onChange(Math.min(max, value + 1))}
      />
    </div>
  );
};
