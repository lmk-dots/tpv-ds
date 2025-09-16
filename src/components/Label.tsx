import React from 'react';
import { getToken } from '../styles/getToken';

export interface LabelProps {
  selected?: boolean;
  text: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  highlightColor?:
    | 'cyan'
    | 'green'
    | 'yellow'
    | 'orange'
    | 'red'
    | 'magenta'
    | 'purple'
    | 'blue';
  size?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Label: React.FC<LabelProps> = ({
  text,
  icon: Icon,
  highlightColor = 'cyan',
  size = 20,
  style,
  onClick,
  selected = false,
}) => {
  const mode = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'light';
  const background = getToken(`button-bg-color-accent-${highlightColor}`, 'general');
  const borderRadius = getToken('corner-radius-s', 'general');
  const paddingX = getToken('padding-m', 'general');
  const buttonPressed = getToken('button-bg-color-pressed', mode);
  const textColor = getToken('label-text-color', mode);

  return (
    <button
      type="button"
      style={{
        background,
        color: textColor,
        borderRadius,
        fontWeight: getToken('font-weight-bold', 'general'),
        fontSize: getToken('font-size-s', 'general'),
        padding: `0 ${paddingX}`,
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
        border: 'none',
        outline: selected ? `2.5px solid ${buttonPressed}` : 'none',
        outlineOffset: selected ? 4 : 0,
        cursor: 'pointer',
        ...style,
      }}
      onClick={onClick}
    >
      {text}
      <Icon size={size} color={textColor} {...(selected ? { weight: 'fill' } : {})} />
    </button>
  );
};
