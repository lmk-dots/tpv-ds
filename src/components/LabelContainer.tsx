import React from 'react';
import { Label } from './Label';
import { getToken } from '../styles/getToken';
import { Carrot, CookingPot, AppleLogo, Cherries, OrangeSlice } from '@phosphor-icons/react';

export interface LabelContainerProps {
  labels: string[];
  selectedIdxs?: number[];
  onChange?: (selected: number[]) => void;
  style?: React.CSSProperties;
}

export const LabelContainer: React.FC<LabelContainerProps> = ({ labels, selectedIdxs = [], onChange, style }) => {
  // Dynamic icon and color assignment based on label name
  const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
    'Verduras frescas': Carrot,
    'Para cocidos': CookingPot,
    'Frutas variadas': AppleLogo,
    'Frutos rojos': Cherries,
    'Zumos naturales': OrangeSlice,
  };
  const colorMap: Record<string, string> = {
    'Verduras frescas': 'green',
    'Para cocidos': 'yellow',
    'Frutas variadas': 'red',
    'Frutos rojos': 'blue',
    'Zumos naturales': 'yellow',
  };
  const paddingM = getToken('padding-m', 'general');
  return (
    <div
      style={{
        width: '100%',
        padding: `0 ${paddingM}`,
        display: 'flex',
        flexDirection: 'row',
        gap: 16,
        ...style,
      }}
    >
      {labels.map((label, idx) => (
        <Label
          key={idx}
          text={label}
          icon={iconMap[label] || Carrot}
          highlightColor={
            (colorMap[label] as
              | 'cyan'
              | 'green'
              | 'yellow'
              | 'orange'
              | 'red'
              | 'magenta'
              | 'purple'
              | 'blue') || 'cyan'
          }
          selected={selectedIdxs.includes(idx)}
          onClick={() => {
            if (onChange) {
              onChange(
                selectedIdxs.includes(idx)
                  ? selectedIdxs.filter(i => i !== idx)
                  : [...selectedIdxs, idx]
              );
            }
          }}
        />
      ))}
    </div>
  );
};
