import React from 'react';
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
}

export const CheckoutList: React.FC<CheckoutListProps> = ({ items, mode = 'light' }) => {
  return (
  <div style={{ width: '100%', height: 'calc(50% - 24px)', overflowY: 'auto', overflowX: 'hidden' }}>
      {items.map((item, idx) => (
        <CheckoutItem
          key={item.id}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          selectedOptions={item.selectedOptions}
          mode={mode}
          isAlt={idx % 2 === 1}
        />
      ))}
    </div>
  );
};
