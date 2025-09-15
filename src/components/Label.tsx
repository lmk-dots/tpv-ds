import React from 'react';
import { getToken } from '../styles/getToken';

export interface LabelProps {
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
}

export const Label: React.FC<LabelProps> = ({
  text,
  icon: Icon,
  highlightColor = 'cyan',
  size = 20,
  style,
}) => {
  const mode = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'light';
  const background = getToken(`button-bg-color-accent-${highlightColor}`, 'general');
  const textColor = getToken('label-text-color', mode);
  const borderRadius = getToken('corner-radius-s', 'general');
  const paddingX = getToken('padding-m', 'general');

  return (
    <span
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
        ...style,
      }}
    >
  {text}
  <Icon size={size} color={textColor} />
    </span>
  );
};
