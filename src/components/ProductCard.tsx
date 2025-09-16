import React from 'react';
import { Card } from './Card';
import { getToken } from '../styles/getToken';

export interface ProductCardProps {
  id: string | number;
  imageSrc: string;
  alt?: string;
  text: string;
  precio: number;
  mode: 'light' | 'dark';
  style?: React.CSSProperties;
  optionGroups?: Array<{ name: string; options: Array<{ label: string; value: string; precioExtra?: number }> }>;
  labelIndex?: number;
  filterColor?: string;
  ref?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, alt = '', text, precio, mode, style, filterColor, optionGroups }) => {
  const imageRadius = getToken('corner-radius-s', 'general');
  const textColor = getToken('text-color-primary', mode);
  const textSize = getToken('font-size-m', 'general');
  const hasPrecio = typeof precio === 'number' && !isNaN(precio) && precio > 0;
  const hasMultipleOptions = Array.isArray(optionGroups) && optionGroups.some(group => group.options.length > 1);
  const lineClamp = 2;
  return (
    <Card
      mode={mode}
      style={{
        width: 204,
        height: 256,
        border: `3px solid ${getToken(`button-bg-color-accent-${filterColor || 'cyan'}`, 'general')}`,
        cursor: 'pointer',
        ...style
      }}
    >
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
            display: '-webkit-box',
            minHeight: '2.6em', // 2 lines * 1.3em line-height
            lineHeight: '1.3em',
            width: '100%',
            WebkitLineClamp: lineClamp,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
          }}
        >
          {text}
        </span>
        <span
          style={{
            fontWeight: 400,
            textAlign: 'left',
            color: getToken('text-color-secondary', mode),
            fontSize: getToken('font-size-xs', 'general'),
            display: 'block',
            width: '100%'
          }}
        >
          {hasMultipleOptions ? 'varias opciones' : (hasPrecio ? precio.toFixed(2) + '€' : '')}
        </span>
      </div>
    </Card>
  );
}
