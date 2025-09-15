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
  minHeight: '100%',
  flex: '3 0 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: 0,
  position: 'static',
  padding: `${getToken('padding-m', 'general')} ${getToken('padding-xl', 'general')}`,
      }}
    >
      {children}
    </div>
  );
};
