import React from 'react';
import { Label } from './Label';
import { getToken } from '../styles/getToken';
import { Sun, Carrot, CookingPot, Percent } from '@phosphor-icons/react';

export interface LabelContainerProps {
  labels: string[];
  style?: React.CSSProperties;
}

export const LabelContainer: React.FC<LabelContainerProps> = ({ labels, style }) => {
  // Example icons and highlight colors for demonstration
  const icons = [Sun, Carrot, CookingPot, Percent];
  const highlights = ['cyan', 'green', 'yellow', 'blue'];
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
          icon={icons[idx % icons.length]}
          highlightColor={highlights[idx % highlights.length] as 'cyan' | 'green' | 'yellow' | 'blue' | 'magenta' | 'orange' | 'purple' | 'red'}
        />
      ))}
    </div>
  );
};
