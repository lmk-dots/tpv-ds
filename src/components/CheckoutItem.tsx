import { getToken } from '../styles/getToken';
export interface SelectedOption {
  name: string;
  extra?: number;
}

export interface CheckoutItemProps {
  name: string;
  price: number;
  quantity: number;
  selectedOptions?: SelectedOption[];
  mode?: 'light' | 'dark';
  isAlt?: boolean;
  style?: React.CSSProperties;
  selected?: boolean;
}

export const CheckoutItem: React.FC<CheckoutItemProps> = ({ name, price, quantity, selectedOptions, mode = 'light', isAlt = false, style, selected }) => {
  const bg = selected ? getToken('button-bg-color-pressed', mode) : (isAlt ? getToken('bg-color-alt', mode) : getToken('bg-color-primary', mode));
  // Calcular el precio total con extras
  const extras = selectedOptions?.reduce((acc, opt) => acc + (opt.extra || 0), 0) ?? 0;
  const totalPrice = price + extras;
  return (
    <div
      style={{
        width: '100%',
        background: bg,
        padding: '12px 16px',
        boxShadow: 'none',
        fontSize: 18,
        fontWeight: 500,
        color: getToken('text-color-primary', mode),
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <span style={{ fontWeight: 700, minWidth: 40, textAlign: 'left' }}>{quantity}x</span>
        <span style={{ flex: 1, textAlign: 'left', paddingLeft: 12, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
        <span style={{ minWidth: 80, maxWidth: 100, textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 32 }}>{totalPrice.toFixed(2)}€</span>
      </div>
      {selectedOptions && selectedOptions.length > 0 && (
        <div
          style={{
            width: '100%',
            fontSize: 15,
            color: getToken('text-color-secondary', mode),
            paddingLeft: 52,
            paddingTop: 4,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {selectedOptions.map(opt =>
            opt.extra && opt.extra > 0
              ? `${opt.name} (+${opt.extra.toFixed(2)}€)`
              : opt.name
          ).map((text, idx) => (
            <div key={idx}>{text}</div>
          ))}
        </div>
      )}
    </div>
  );
};
