import React from 'react';
import { getToken } from '../styles/getToken';

export interface CardProps {
  mode: 'light' | 'dark';
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ mode, style, children }) => {
  const background = getToken('bg-color-alt', mode);
  const borderRadius = getToken('corner-radius-m', 'general');
  const borderSize = getToken('border-size-xl', 'general');
  const border = `${borderSize} solid ${getToken('text-color-secondary', mode)}`;

  return (
    <div
      style={{
        background,
        borderRadius,
        border,
        boxSizing: 'border-box',
  padding: getToken('padding-s', 'general'),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
