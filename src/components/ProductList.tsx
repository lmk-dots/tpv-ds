import React from 'react';
import type { ProductCardProps } from './ProductCard';
import { ProductCard } from './ProductCard';
import { Badge } from './Badge';
import { IconButton } from './IconButton';
import { getToken } from '../styles/getToken';
// ...existing code...

export interface ProductListProps {
  products: ProductCardProps[];
  mode: 'light' | 'dark';
  style?: React.CSSProperties;
}

// Eliminar la exportación duplicada y usar correctamente el prop style
export const ProductList: React.FC<ProductListProps> = ({ products, mode, style }) => {
  const [selectedCounts, setSelectedCounts] = React.useState<{ [idx: number]: number }>({});
  return (
    <>
      <style>{`
        .ProductList-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #F1E4DE #FFFFFF;
        }
        .ProductList-scrollbar::-webkit-scrollbar {
          width: 8px;
          background: #F1E4DE;
        }
        .ProductList-scrollbar::-webkit-scrollbar-thumb {
          background: #F1E4DE;
          border-radius: 8px;
        }
      `}</style>
      <div
        className="ProductList-scrollbar"
        style={{
          width: '100%',
          height: '740px',
          overflowY: 'scroll',
          padding: '0 98px',
          boxSizing: 'border-box',
          textAlign: 'center',
          paddingBottom: '24px',
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
              position: 'relative',
            }}
            onClick={() =>
              setSelectedCounts(counts => ({
                ...counts,
                [idx]: (counts[idx] || 0) + 1
              }))
            }
          >
            <ProductCard {...product} mode={mode} />
            {selectedCounts[idx] > 0 && (
              <>
                <div style={{ position: 'absolute', right: 8, bottom: 8, zIndex: 2 }}>
                  <Badge value={selectedCounts[idx]} color="danger" mode={mode} />
                </div>
                <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 3 }}>
                  <div onClick={e => e.stopPropagation()}>
                    <IconButton
                      icon={({ size = 20 }) => (
                        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 5L11 11M11 5L5 11" stroke={getToken('button-text-color-danger', mode)} strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      )}
                      size={36}
                      mode={mode}
                      backgroundColorToken="bg-color-danger"
                      ariaLabel="Cancelar selección"
                      onClick={() => {
                        setSelectedCounts(counts => {
                          const newCounts = { ...counts };
                          delete newCounts[idx];
                          return newCounts;
                        });
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
