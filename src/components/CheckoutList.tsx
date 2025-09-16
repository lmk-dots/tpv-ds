import React from 'react';
import { getToken } from '../styles/getToken';
import { CheckoutItem } from './CheckoutItem';
import type { SelectedOption } from './CheckoutItem';

export interface CheckoutListItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  selectedOptions?: SelectedOption[];
}

export interface CheckoutListProps {
  items: CheckoutListItem[];
  mode?: 'light' | 'dark';
  selectedIdx?: number;
  onSelect?: (idx: number) => void;
}

export const CheckoutList: React.FC<CheckoutListProps> = ({ items, mode = 'light', selectedIdx, onSelect }) => {
  const [selected, setSelected] = React.useState<number | null>(null);
  // Use getToken for selected background color
  // ...existing code...
  return (
    <div style={{ width: '100%', height: 'calc(50% - 24px)', overflowY: 'auto', overflowX: 'hidden' }}>
      {items.map((item, idx) => (
        <div
          key={item.id}
          style={{
            cursor: 'pointer',
            borderRadius: 8,
            background: (selectedIdx ?? selected) === idx ? getToken('bg-color-selected', mode) : undefined,
          }}
          onClick={() => {
            setSelected(idx);
            if (typeof onSelect === 'function') {
              onSelect(idx);
            }
          }}
        >
          <CheckoutItem
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            selectedOptions={item.selectedOptions}
            mode={mode}
            isAlt={idx % 2 === 1}
            style={{}}
            selected={(selectedIdx ?? selected) === idx}
          />
        </div>
      ))}
    </div>
  );
};
