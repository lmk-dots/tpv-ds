import React from 'react';
import { getToken } from '../styles/getToken';

export interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  mode: 'light' | 'dark';
  style?: React.CSSProperties;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder = '',
  mode,
  style,
}) => {
  const borderRadius = getToken('corner-radius-s', 'general');
  const borderSize = getToken('border-size-m', 'general');
  const borderColor = getToken('text-color-secondary', mode);
  const color = getToken('text-color-primary', mode);
  const background = getToken('bg-color-secondary', mode);
  const fontWeight = getToken('font-weight-regular', 'general');
  const fontSize = getToken('font-size-s', 'general');
  const padding = getToken('padding-s', 'general');

  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        borderRadius,
        border: `${borderSize} solid ${borderColor}`,
        color,
        background,
        fontWeight,
        fontSize,
        padding,
        outline: 'none',
        boxSizing: 'border-box',
        ...style,
      }}
      className="textinput-placeholder"
    />
  );
};
