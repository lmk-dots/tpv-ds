import React, { useState } from 'react';
import { getToken } from '../styles/getToken';
import { RadioButton } from './RadioButton';

export interface RadioGroupProps {
  options: Array<{ label: string; value: string }>;
  onConfirm: (selectedValue: string) => void;
  mode?: 'light' | 'dark';
  title?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ options, onConfirm, mode = 'light', title }) => {
  const [selected, setSelected] = useState<string>('');
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
      {title && (
        <span
          style={{
            fontWeight: 500,
            color: getToken('text-color-secondary', mode),
            fontSize: getToken('font-size-xs', 'general'),
            marginBottom: 4,
            textAlign: 'left',
            width: '100%',
            display: 'block',
          }}
        >
          {title}
        </span>
      )}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 16, width: '100%' }}>
        {options.map(opt => (
          <RadioButton
            key={opt.value}
            checked={selected === opt.value}
            onChange={() => {
              setSelected(opt.value);
              onConfirm(opt.value);
            }}
            mode={mode}
            style={{ minWidth: 120, fontSize: getToken('font-size-s', 'general') }}
          >
            {opt.label}
          </RadioButton>
        ))}
      </div>
    </div>
  );
}
