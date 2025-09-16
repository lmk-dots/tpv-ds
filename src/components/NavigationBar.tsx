import React from 'react';
import { getToken } from '../styles/getToken';

export interface NavigationBarProps {
  mode: 'light' | 'dark';
  children?: React.ReactNode;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ mode, children }) => {
  const bgColor = getToken('bg-color-secondary', mode);
  const mainWidth = 'calc(100vw - 400px)'; // Sidebar is 400px
  const sidebarWidth = '400px';
  const padding = getToken('padding-xl', 'general');
  return (
    <nav
      style={{
        width: '100vw',
        height: '80px',
        background: bgColor,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      }}
    >
      <div
        style={{
          width: mainWidth,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: padding,
          boxSizing: 'border-box',
        }}
      >
          <h1
            style={{
              fontSize: getToken('font-size-xl', 'general'),
              color: getToken('text-color-secondary', mode),
              margin: 0,
              whiteSpace: 'nowrap',
              fontWeight: getToken('font-weight-regular', 'general'),
            }}
          >
            Caja y lista de productos
          </h1>
      </div>
      <div
        style={{
          width: sidebarWidth,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          paddingRight: padding,
          boxSizing: 'border-box',
        }}
      >
        {children}
      </div>
    </nav>
  );
};
