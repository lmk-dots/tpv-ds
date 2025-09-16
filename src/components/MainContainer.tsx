import React from 'react';
import { getToken } from '../styles/getToken';

export interface MainContainerProps {
  mode: 'light' | 'dark';
  children: React.ReactNode;
}

export const MainContainer: React.FC<MainContainerProps> = ({ mode, children }) => {
  const bgColor = getToken('bg-color-primary', mode);
  const paddingL = getToken('padding-l', 'general');
  return (
    <div
      style={{
        background: bgColor,
        minHeight: '100%',
        flex: '7 0 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 0,
        padding: paddingL,
  gap: 32,
      }}
    >
      {children}
    </div>
  );
};
