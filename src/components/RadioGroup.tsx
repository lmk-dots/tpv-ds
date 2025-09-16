import React, { useState } from 'react';
import { RadioButton } from './RadioButton';

export interface RadioGroupOption {
  label: string;
  value: string;
}

export interface RadioGroupProps {
  options: RadioGroupOption[];
  mode: 'light' | 'dark';
  value?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  mode,
  value,
  onChange,
  style,
}) => {
  const [selected, setSelected] = useState<string>(value || '');

  const handleSelect = (val: string) => {
    setSelected(val);
    onChange?.(val);
  };

  return (
  <div style={{ display: 'flex', gap: '16px', ...style }}>
      {options.map((opt) => (
        <RadioButton
          key={opt.value}
          mode={mode}
          checked={selected === opt.value}
          onChange={() => handleSelect(opt.value)}
        >
          {opt.label}
        </RadioButton>
      ))}
    </div>
  );
};
