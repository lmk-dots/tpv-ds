import React from 'react';
import { getToken } from '../styles/getToken';

export interface IconButtonProps {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  onClick?: () => void;
  pressed?: boolean;
  size?: number;
  style?: React.CSSProperties;
  backgroundColorToken?: string;
  ariaLabel?: string;
  mode?: 'light' | 'dark';
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  onClick,
  size = 36,
  style,
  backgroundColorToken,
  ariaLabel = 'Icon button',
  mode,
}) => {
  const resolvedMode = mode || (document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'light');
  const background = getToken(backgroundColorToken || 'button-bg-color-primary', resolvedMode);
  const iconColor = getToken('button-text-color-primary', resolvedMode);
  const borderRadius = getToken('corner-radius-xl', 'general');
  const padding = getToken('padding-xs', 'general');

  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      style={{
        background,
        border: 'none',
        borderRadius,
        padding,
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        ...style,
      }}
    >
      <Icon size={size} color={iconColor} />
    </button>
  );
};
