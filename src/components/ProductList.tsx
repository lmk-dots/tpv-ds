import React from 'react';
import type { ProductCardProps } from './ProductCard';
import { ProductCard } from './ProductCard';

export interface ProductListProps {
  products: ProductCardProps[];
  mode: 'light' | 'dark';
  style?: React.CSSProperties;
}

// Eliminar la exportación duplicada y usar correctamente el prop style
export const ProductList: React.FC<ProductListProps> = ({ products, mode, style }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '660px',
        overflowY: 'auto',
  padding: '0 120px',
        boxSizing: 'border-box',
        textAlign: 'center',
        ...(style || {}),
      }}
    >
      {products.map((product, idx) => (
        <div
          key={idx}
          style={{
            display: 'inline-block',
            width: 'auto',
            margin: '0 16px 16px 0',
            padding: 0,
            verticalAlign: 'top',
            boxSizing: 'border-box',
            float: 'left',
          }}
        >
          <ProductCard {...product} mode={mode} />
        </div>
      ))}
    </div>
  );
};
