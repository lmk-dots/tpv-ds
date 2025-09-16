import React from 'react';
import type { ProductCardProps } from './ProductCard';
import { ProductCard } from './ProductCard';
import { Badge } from './Badge';
import { QuantitySelector } from './QuantitySelector';
import { getToken } from '../styles/getToken';
import { ProductPopup } from './ProductPopup';
import { RadioGroup } from './RadioGroup';
import { ActionButton } from './ActionButton';
// Componente para gestionar dos grupos de selección y un solo botón de confirmar
interface OptionGroup {
  title: string;
  options: Array<{ label: string; value: string }>;
}

interface MultiGroupSelectorProps {
  groups: OptionGroup[];
  mode: 'light' | 'dark';
  onConfirm: (selected: string[], quantity: number) => void;
}

function MultiGroupSelector({ groups, mode, onConfirm }: MultiGroupSelectorProps) {
  const [selected, setSelected] = React.useState<string[]>(Array(groups.length).fill(''));
  const [quantity, setQuantity] = React.useState(1);
  const [resetKey, setResetKey] = React.useState(0);
  const canConfirm = selected.every(val => !!val);
  const canReset = selected.some(val => !!val);
  return (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', alignItems: 'flex-start', paddingTop: 0, paddingBottom: 0 }}>
      {groups.map((group, idx) => (
        <RadioGroup
          key={resetKey + '-' + idx}
          options={group.options}
          onConfirm={val => {
            setSelected(sel => {
              const copy = [...sel];
              copy[idx] = val;
              return copy;
            });
          }}
          mode={mode}
          title={group.title}
        />
      ))}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 40,
          width: '100%',
          gap: 8,
        }}
      >
        <ActionButton
          onClick={() => {
            setQuantity(1);
            setSelected(Array(groups.length).fill(''));
            setResetKey(k => k + 1);
          }}
          disabled={!canReset}
          style={{
            flex: 1,
            padding: '12px 0',
            borderRadius: getToken('corner-radius-s', 'general'),
            background: !canReset ? getToken('bg-color-deactivated', mode) : getToken('bg-color-warning', mode),
            color: !canReset ? getToken('button-text-color-success', mode) : getToken('button-text-color-warning', mode),
            fontWeight: 700,
            fontSize: getToken('font-size-s', 'general'),
            border: 'none',
            cursor: canReset ? 'pointer' : 'not-allowed',
            minWidth: 100,
          }}
        >
          Resetear selección
        </ActionButton>
        <div style={{ width: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <QuantitySelector value={quantity} onChange={setQuantity} min={1} mode={mode} />
        </div>
        <button
          style={{
            flex: 1,
            padding: '12px 0',
            borderRadius: getToken('corner-radius-s', 'general'),
            background: canConfirm ? getToken('bg-color-success', mode) : getToken('bg-color-deactivated', mode),
            color: getToken('button-text-color-success', mode),
            fontWeight: 700,
            fontSize: getToken('font-size-s', 'general'),
            border: 'none',
            cursor: canConfirm ? 'pointer' : 'not-allowed',
            transition: 'background 0.2s',
            minWidth: 100,
          }}
          disabled={!canConfirm}
          onClick={() => {
            if (canConfirm) onConfirm(selected, quantity);
          }}
        >
          Añadir
        </button>
      </div>
    </div>
  );
}
// ...existing code...

export interface ProductListProps {
  products: ProductCardProps[];
  mode: 'light' | 'dark';
  style?: React.CSSProperties;
  options?: Array<{ label: string; value: string }>; // Opciones extra
  filtersData?: Array<{ index: number; name: string; color: string }>;
}

// Eliminar la exportación duplicada y usar correctamente el prop style
export const ProductList: React.FC<ProductListProps> = ({ products, mode, style, filtersData }) => {
  const [selectedCounts, setSelectedCounts] = React.useState<{ [idx: number]: number }>({});
  const [popupIdx, setPopupIdx] = React.useState<number | null>(null);
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
        {products.map((product, idx) => {
          // Detectar si el producto tiene algún grupo con más de una opción
          const hasMultipleGroups = product.optionGroups && product.optionGroups.some(group => group.options.length > 1);
          return (
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
              onClick={() => {
                if (hasMultipleGroups) {
                  setPopupIdx(idx);
                } else {
                  setSelectedCounts(counts => ({
                    ...counts,
                    [idx]: (counts[idx] || 0) + 1
                  }));
                }
              }}
            >
              <ProductCard {...product} mode={mode} />
              {selectedCounts[idx] > 0 && (
                <>
                  <div style={{ position: 'absolute', right: 8, bottom: 8, zIndex: 2 }}>
                    <Badge value={selectedCounts[idx]} color="danger" mode={mode} />
                  </div>
                  <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 3 }}>
                    <button
                      aria-label="Cancelar selección"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: getToken('bg-color-danger', mode),
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      }}
                      onClick={e => {
                        e.stopPropagation();
                        setSelectedCounts(counts => {
                          const newCounts = { ...counts };
                          delete newCounts[idx];
                          return newCounts;
                        });
                      }}
                    >
                      <svg width={20} height={20} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 5L11 11M11 5L5 11" stroke={getToken('button-text-color-danger', mode)} strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
        {popupIdx !== null && products[popupIdx] && products[popupIdx].optionGroups && products[popupIdx].optionGroups.some(group => group.options.length > 1) && (
          <ProductPopup
            open={true}
            onClose={() => setPopupIdx(null)}
            product={{
              ...products[popupIdx],
              cantidad: 1,
              total: selectedCounts[popupIdx] || 0,
              ref: products[popupIdx].ref
            }}
            mode={mode}
            filtersData={filtersData}
          >
            <MultiGroupSelector
              groups={products[popupIdx].optionGroups.map(group => ({ title: group.name, options: group.options }))}
              mode={mode}
              onConfirm={(_selected, cantidad) => {
                setSelectedCounts(counts => ({
                  ...counts,
                  [popupIdx]: (counts[popupIdx] || 0) + cantidad
                }));
                setPopupIdx(null);
              }}
            />
          </ProductPopup>
        )}
      </div>
    </>
  );
};
