import React from 'react';
import { Card } from './Card';
import { getToken } from '../styles/getToken';

export interface ProductCardProps {
  imageSrc: string;
  alt?: string;
  text: string;
  mode: 'light' | 'dark';
  style?: React.CSSProperties;
}

export const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, alt = '', text, mode, style }) => {
  const imageRadius = getToken('corner-radius-s', 'general');
  const textColor = getToken('text-color-primary', mode);
  const textSize = getToken('font-size-m', 'general');
  const secondaryTextSize = getToken('font-size-s', 'general');
  return (
    <Card mode={mode} style={{ width: 204, height: 256, ...style }}>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, height: '100%' }}>
        <img
          src={imageSrc}
          alt={alt}
          style={{ width: 180, height: 120, objectFit: 'cover', borderRadius: imageRadius }}
        />
        <span
          style={{
            fontWeight: 700,
            textAlign: 'left',
            color: textColor,
            fontSize: textSize,
            display: 'inline-block',
            minHeight: '2.6em',
            lineHeight: '1.3em',
            width: '100%',
            whiteSpace: 'pre-line',
          }}
        >
          {text}
        </span>
        <span
          style={{
            fontWeight: 400,
            textAlign: 'left',
            color: textColor,
            fontSize: secondaryTextSize,
            display: 'inline-block',
            width: '100%',
            marginTop: 2,
          }}
        >
          x opciones
        </span>
      </div>
    </Card>
  );
}
