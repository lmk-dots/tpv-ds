import React, { useState } from 'react';
import { getToken } from '../styles/getToken';
import { RadioButton } from './RadioButton';

export interface RadioGroupProps {
  options: Array<{ label: string; value: string; precioExtra?: number }>;
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
            style={{ minWidth: 120, fontSize: getToken('font-size-s', 'general'), position: 'relative' }}
          >
            <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {opt.label}
              {opt.precioExtra !== undefined && opt.precioExtra > 0 && (
                <span
                  style={{
                    background: getToken('bg-color-warning', mode),
                    color: getToken('button-text-color-warning', mode),
                    borderRadius: getToken('corner-radius-xl', 'general'),
                    fontWeight: getToken('font-weight-bold', 'general'),
                    fontSize: getToken('font-size-xs', 'general'),
                    padding: '2px 8px',
                    marginLeft: 4,
                    display: 'inline-block',
                  }}
                >
                  {'+' + opt.precioExtra.toFixed(2) + '€'}
                </span>
              )}
            </span>
          </RadioButton>
        ))}
      </div>
    </div>
  );
}
