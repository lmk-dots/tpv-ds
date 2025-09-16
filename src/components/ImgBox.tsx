import React from 'react';
import { getToken } from '../styles/getToken';

export interface ImgBoxProps {
  src: string;
  alt?: string;
  mode: 'light' | 'dark';
  style?: React.CSSProperties;
}

export const ImgBox: React.FC<ImgBoxProps> = ({ src, alt = '', mode, style }) => {
  const background = getToken('bg-color-primary', mode);
  const borderRadius = getToken('corner-radius-m', 'general');

  return (
    <div
      style={{
        background,
        borderRadius,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
      />
    </div>
  );
};
