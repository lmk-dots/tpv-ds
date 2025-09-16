import React from 'react';
import { Badge } from './Badge';
import type { ProductCardProps } from './ProductCard';
import type { CheckoutListItem } from './CheckoutList';
// import type { CheckoutListItem } from './CheckoutList';
import { ProductCard } from './ProductCard';
import { QuantitySelector } from './QuantitySelector';
import { getToken } from '../styles/getToken';
import { ProductPopup } from './ProductPopup';
import { RadioGroup } from './RadioGroup';
import { ActionButton } from './ActionButton';
// Componente para gestionar dos grupos de selección y un solo botón de confirmar
interface OptionOption {
  label: string;
  value: string;
  precioExtra?: number;
}
interface OptionGroup {
  title: string;
  options: OptionOption[];
}

interface MultiGroupSelectorProps {
  groups: OptionGroup[];
  mode: 'light' | 'dark';
  onConfirm: (selected: string[], cantidad: number) => void;
  precio: number;
}

function MultiGroupSelector({ groups, mode, onConfirm, precio }: MultiGroupSelectorProps) {
  const [selected, setSelected] = React.useState<string[]>(Array(groups.length).fill(''));
  const [quantity, setQuantity] = React.useState(1);
  const [resetKey, setResetKey] = React.useState(0);
  const canConfirm = selected.every((val: string) => !!val);
  const canReset = selected.some((val: string) => !!val);

  // Calculate total price
  const basePrice = typeof precio === 'number' && !isNaN(precio) ? precio : 0;
  let extras = 0;
  if (groups && groups.length > 0) {
    groups.forEach((group: OptionGroup, idx: number) => {
      const selectedValue = selected[idx];
      const option = group.options.find((opt: OptionOption) => opt.value === selectedValue);
      if (option && typeof option.precioExtra === 'number' && option.precioExtra > 0) {
        extras += option.precioExtra;
      }
    });
  }
  // basePrice is now set from the precio prop
  const totalPrice = ((basePrice + extras) * quantity).toFixed(2);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', alignItems: 'flex-start', paddingTop: 0, paddingBottom: 0 }}>
      {groups.map((group: OptionGroup, idx: number) => (
        <RadioGroup
          key={resetKey + '-' + idx}
          options={group.options}
          onConfirm={(val: string) => {
            setSelected((sel: string[]) => {
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
          Añadir {canConfirm ? `(${totalPrice}€)` : ''}
        </button>
      </div>
    </div>
  );
}

export interface ProductListProps {
  products: ProductCardProps[];
  mode: 'light' | 'dark';
  style?: React.CSSProperties;
  options?: Array<{ label: string; value: string }>;
  filtersData?: Array<{ index: number; name: string; color: string }>;
  onAddToCheckout?: (item: CheckoutListItem) => void;
  checkoutItems?: CheckoutListItem[];
  onRemoveProduct?: (id: string | number) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  mode,
  style,
  filtersData,
  onAddToCheckout,
  checkoutItems = [],
  onRemoveProduct,
}) => {
  // Filtrar productos únicos por ref para los que tienen precio único y sin opciones múltiples
  // Deduplicate by ref, prefer entry with precio if available
  // Filtrar productos únicos por ref para los que tienen precio único y sin opciones múltiples
  // Deduplicate by ref, prefer entry with precio if available
  const refMap = new Map<string, ProductCardProps>();
  products.forEach((product: ProductCardProps) => {
    if (!product.ref) return;
    if (!refMap.has(product.ref)) {
      refMap.set(product.ref, product);
    } else {
      // Prefer entry with precio
      const existing = refMap.get(product.ref)!;
      if (typeof product.precio === 'number' && !isNaN(product.precio)) {
        refMap.set(product.ref, product);
      } else if (!(typeof existing.precio === 'number' && !isNaN(existing.precio))) {
        refMap.set(product.ref, product);
      }
    }
  });
  const filteredProducts = Array.from(refMap.values());

  // Add missing popupIdx state
  const [popupIdx, setPopupIdx] = React.useState<number | null>(null);

  return (
    <>
      <style>
        {`
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
        `}
      </style>
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
        {filteredProducts.map((product, idx) => {
          const hasMultipleGroups =
            product.optionGroups && product.optionGroups.some(group => group.options.length > 1);
          // Find total quantity in cart for this product (all variants)
          const productQuantity = checkoutItems
            .filter(item => item.id === product.id)
            .reduce((sum, item) => sum + (item.quantity || 0), 0);
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
                  if (onAddToCheckout) {
                    onAddToCheckout({
                      id: product.id,
                      name: product.text,
                      price: product.precio,
                      quantity: 1,
                      selectedOptions: [],
                    });
                  }
                }
              }}
            >
              <ProductCard {...product} mode={mode} />
              {productQuantity > 0 && (
                <>
                  <div style={{ position: 'absolute', right: 8, bottom: 8, zIndex: 2 }}>
                    <Badge value={productQuantity} color="danger" mode={mode} />
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
                        if (onRemoveProduct) {
                          onRemoveProduct(product.id);
                        }
                      }}
                    >
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 5L11 11M11 5L5 11"
                          stroke={getToken('button-text-color-danger', mode)}
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
        {popupIdx !== null &&
          filteredProducts[popupIdx] &&
          filteredProducts[popupIdx].optionGroups &&
          filteredProducts[popupIdx].optionGroups.some(group => group.options.length > 1) && (
            <ProductPopup
              open={true}
              onClose={() => setPopupIdx(null)}
              product={{
                ...filteredProducts[popupIdx],
                cantidad: 1,
                ref: filteredProducts[popupIdx].ref,
              }}
              mode={mode}
              filtersData={filtersData}
            >
              <MultiGroupSelector
                groups={filteredProducts[popupIdx].optionGroups.map(group => ({
                  title: group.name,
                  options: group.options,
                }))}
                mode={mode}
                precio={filteredProducts[popupIdx].precio}
                onConfirm={(selected: string[], cantidad: number) => {
                  if (onAddToCheckout) {
                    // Map selected options to { name, extra }
                    const selectedOptions = (filteredProducts[popupIdx].optionGroups ?? []).map((group, idx) => {
                      const opt = group.options.find(o => o.value === selected[idx]);
                      return opt ? { name: opt.label, extra: opt.precioExtra } : { name: '', extra: 0 };
                    });
                    onAddToCheckout({
                      id: filteredProducts[popupIdx].id,
                      name: filteredProducts[popupIdx].text,
                      price: filteredProducts[popupIdx].precio,
                      quantity: cantidad,
                      selectedOptions,
                    });
                  }
                  setPopupIdx(null);
                }}
              />
            </ProductPopup>
          )}
      </div>
    </>
  );
};
