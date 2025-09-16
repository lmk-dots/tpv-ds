import React from 'react';
import { getToken } from '../styles/getToken';

export interface RadioButtonProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  children?: React.ReactNode;
  mode: 'light' | 'dark';
  style?: React.CSSProperties;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  checked,
  onChange,
  children,
  mode,
  style,
}) => {
  const background = getToken(checked ? 'button-bg-color-pressed' : 'bg-color-secondary', mode);
  const color = checked
    ? getToken('label-text-color', mode)
    : getToken('button-text-color-secondary', mode);
  const borderRadius = getToken('corner-radius-s', 'general');
  const fontSize = getToken('font-size-xs', 'general');
  const fontWeight = getToken('font-weight-bold', 'general');
  const padding = `0 ${getToken('padding-m', 'general')}`;

  const handleClick = () => {
    onChange?.(!checked);
  };

  const borderColor = getToken('bg-color-secondary', mode);
  const borderSize = getToken('border-size-m', 'general');
  return (
    <button
      type="button"
      style={{
        background,
        color,
        borderRadius,
        fontSize,
        fontWeight,
        padding,
        height: '40px',
        border: `${borderSize} solid ${borderColor}`,
        cursor: 'pointer',
        ...style,
      }}
  aria-pressed={checked}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
