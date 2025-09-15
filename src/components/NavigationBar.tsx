import React from 'react';
import { getToken } from '../styles/getToken';

export interface NavigationBarProps {
  mode: 'light' | 'dark';
  children?: React.ReactNode;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ mode, children }) => {
  const bgColor = getToken('bg-color-secondary', mode);
  return (
    <nav
      style={{
        width: '100vw',
        minHeight: '64px',
        background: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
  padding: `${getToken('padding-s', 'general')} ${getToken('padding-xl', 'general')}`,
        boxSizing: 'border-box',
        margin: 0,
      }}
    >
      <h1 style={{ fontSize: getToken('font-size-xl', 'general'), color: getToken('text-color-secondary', mode), margin: 0 }}>
        Caja
      </h1>
      {children}
    </nav>
  );
};
