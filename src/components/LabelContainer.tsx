import React from 'react';
import { Label } from './Label';
import { getToken } from '../styles/getToken';
import { Carrot, CookingPot, AppleLogo, Cherries, OrangeSlice } from '@phosphor-icons/react';

export interface LabelContainerProps {
  labels: string[];
  style?: React.CSSProperties;
}

export const LabelContainer: React.FC<LabelContainerProps> = ({ labels, style }) => {
  // Example icons and highlight colors for demonstration
  // Food-related icons
  // Reordered icons: Carrot, CookingPot, AppleLogo (frutos rojos), Fish
  // Assign AppleLogo to last label (Frutos rojos)
  const icons = [Carrot, CookingPot, AppleLogo, Cherries, OrangeSlice];
  // Custom highlight colors: green, yellow, magenta (frutas variadas), purple (frutos rojos)
  const highlights = ['green', 'yellow', 'red', 'blue', 'orange'];
  const paddingM = getToken('padding-m', 'general');
  const [selectedIdxs, setSelectedIdxs] = React.useState<number[]>([]);
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
          icon={icons[idx % icons.length]}
          highlightColor={highlights[idx % highlights.length] as 'cyan' | 'green' | 'yellow' | 'blue' | 'magenta' | 'orange' | 'purple' | 'red'}
          selected={selectedIdxs.includes(idx)}
          onClick={() => {
            setSelectedIdxs(selectedIdxs =>
              selectedIdxs.includes(idx)
                ? selectedIdxs.filter(i => i !== idx)
                : [...selectedIdxs, idx]
            );
          }}
        />
      ))}
    </div>
  );
};
