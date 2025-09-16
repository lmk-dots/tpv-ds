import React from 'react';
import { NumpadButton } from './NumpadButton';
import { getToken } from '../styles/getToken';

export interface NumpadContainerProps {
  mode: 'light' | 'dark';
  buttons: Array<Array<string | number>>;
  onClick?: (value: string | number) => void;
  style?: React.CSSProperties;
}

export const NumpadContainer: React.FC<NumpadContainerProps> = ({ mode, buttons, onClick, style }) => {
  const paddingS = getToken('padding-s', 'general');
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: paddingS,
        width: '100%',
        boxSizing: 'border-box',
        padding: `0 ${getToken('padding-m', 'general')}`,
        margin: 0,
        ...style,
      }}
    >
      {buttons.map((row, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            flex: 1,
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 'var(--padding-s)',
          }}
        >
          {row.map((val, j) => (
            <NumpadButton
              key={j}
              value={val}
              mode={mode}
              onClick={() => onClick?.(val)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
