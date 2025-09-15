import React from 'react';
import './ActionButton.css';
import { getToken } from '../styles/getToken';


export interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  onClick,
  disabled = false,
}) => {
  const mode = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'light';
  const styles: React.CSSProperties = {
    background: getToken('button-bg-color-primary', mode),
    color: getToken('button-text-color-primary', mode),
    borderRadius: getToken('corner-radius-s', 'general'),
    fontSize: getToken('font-size-s', 'general'),
    fontWeight: getToken('font-weight-bold', 'general'),
    padding: `0 ${getToken('padding-m', 'general')}`,
    height: '40px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
  };
  return (
    <button
      style={styles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
