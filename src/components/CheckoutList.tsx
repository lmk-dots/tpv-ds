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
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (containerRef.current && typeof selectedIdx === 'number') {
      const itemDiv = containerRef.current.children[selectedIdx] as HTMLElement | undefined;
      if (itemDiv) {
        const container = containerRef.current;
        const itemTop = itemDiv.offsetTop;
        const itemBottom = itemTop + itemDiv.offsetHeight;
        const viewTop = container.scrollTop;
        const viewBottom = viewTop + container.clientHeight;
        if (itemTop < viewTop) {
          container.scrollTop = itemTop;
        } else if (itemBottom > viewBottom) {
          container.scrollTop = itemBottom - container.clientHeight;
        }
      }
    }
  }, [selectedIdx]);
  return (
    <div ref={containerRef} style={{ width: '100%', height: 'calc(50% - 24px)', overflowY: 'auto', overflowX: 'hidden' }}>
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
