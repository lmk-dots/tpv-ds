
// Update the import path to the correct location of getToken
import { getToken } from '../styles/getToken';

export interface NumpadButtonProps {
  value: string | number;
  onClick?: (value: string | number) => void;
  mode: 'light' | 'dark';
  style?: React.CSSProperties;
}

export const NumpadButton: React.FC<NumpadButtonProps> = ({ value, onClick, mode, style }) => {
  const isNumber = typeof value === 'number' && !isNaN(value);
  const isDanger = value === '<';
  const background = isDanger
    ? getToken('bg-color-danger', mode)
    : isNumber
      ? getToken('button-bg-color-primary', mode)
      : getToken('button-bg-color-secondary', mode);
  const color = isDanger
    ? getToken('button-text-color-danger', mode)
    : getToken('button-text-color-primary', mode);
  const borderRadius = getToken('corner-radius-s', 'general');
  const fontSize = getToken('font-size-s', 'general');
  const fontWeight = getToken('font-weight-bold', 'general');
  const height = '48px';
  const width = '88px';

  return (
    <button
      type="button"
      style={{
        background,
        color,
        borderRadius,
        fontSize,
        fontWeight,
        height,
        width,
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        ...style,
      }}
      onClick={() => onClick?.(value)}
    >
      {value}
    </button>
  );
};
