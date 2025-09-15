import React from 'react';
import { getToken } from '../styles/getToken';

export interface BadgeProps {
  value: string | number;
  color?: 'danger' | 'warning';
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({ value, color = 'danger', style }) => {
  const mode = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'light';
  const background = getToken(
    color === 'danger' ? 'bg-color-danger' : 'bg-color-warning',
    mode
  );
  const textColor = getToken(
    color === 'danger' ? 'text-color-danger' : 'text-color-warning',
    mode
  );
  const borderRadius = getToken('corner-radius-xl', 'general');
  const fontWeight = getToken('font-weight-bold', 'general');
  const fontSize = getToken('font-size-s', 'general');
  const paddingX = getToken('padding-s', 'general');
  const paddingY = getToken('padding-xs', 'general') || '4px';

  return (
    <span
      style={{
        background,
        color: textColor,
        borderRadius,
        fontWeight,
        fontSize,
        padding: `${paddingY} ${paddingX}`,
        display: 'inline-block',
        minWidth: '24px',
        textAlign: 'center',
        ...style,
      }}
    >
      {value}
    </span>
  );
};
