import React from 'react';
import { getToken } from '../styles/getToken';

export interface SidebarContainerProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const SidebarContainer: React.FC<SidebarContainerProps> = ({ children, style }) => {
  return (
    <div
      style={{
        width: '100%',
        padding: `${getToken('padding-m', 'general')} ${getToken('padding-m', 'general')}`,
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
