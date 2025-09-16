import React from 'react';
import { getToken } from '../styles/getToken';

export interface SidebarProps {
  mode: 'light' | 'dark';
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ mode, children }) => {
  const bgColor = getToken('bg-color-alt', mode);
  return (
    <div
      style={{
    background: bgColor,
  height: '100vh',
    width: '400px',
    flex: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
    margin: 0,
    position: 'static',
  padding: `0 ${getToken('padding-m', 'general')}`,
      }}
    >
      {children}
    </div>
  );
};
