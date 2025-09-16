import React from 'react';
import { Card } from './Card';
import { getToken } from '../styles/getToken';

export interface ProductCardProps {
  imageSrc: string;
  alt?: string;
  text: string;
  mode: 'light' | 'dark';
  style?: React.CSSProperties;
  optionGroups?: Array<{ name: string; options: Array<{ label: string; value: string }> }>;
  labelIndex?: number;
  filterColor?: string;
  ref?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, alt = '', text, mode, style, optionGroups, filterColor }) => {
  const imageRadius = getToken('corner-radius-s', 'general');
  const textColor = getToken('text-color-primary', mode);
  const textSize = getToken('font-size-m', 'general');
  // Calcular el total de opciones y si hay algún grupo con más de una opción
  const multipleGroupsCount = optionGroups ? optionGroups.filter(group => group.options.length > 1).length : 0;
  const hasOptions = optionGroups && optionGroups.some(group => group.options.length > 1);
  const lineClamp = hasOptions ? 2 : 3;
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
            minHeight: hasOptions ? '2.6em' : '3.9em',
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
        {multipleGroupsCount > 0 ? (
           <span
             style={{
               fontWeight: 400,
               fontStyle: 'italic',
               textAlign: 'left',
               color: getToken('text-color-secondary', mode),
               fontSize: getToken('font-size-xs', 'general'),
               display: 'inline-block',
               width: '100%',
               marginTop: 2,
             }}
           >
            {multipleGroupsCount} {multipleGroupsCount === 1 ? 'opción' : 'opciones'}
           </span>
        ) : null}
      </div>
  </Card>
  );
}
