import React from 'react';
import { TextInput } from './TextInput';
import { IconButton } from './IconButton';
import { SortAscending, SortDescending } from '@phosphor-icons/react';
import { Translate } from '@phosphor-icons/react';
import { Funnel } from '@phosphor-icons/react';

export interface SearchEngineProps {
  value: string;
  onChange: (value: string) => void;
  onSort: () => void;
  sortMode: 'az' | 'za';
  orderType: 'alphabetical' | 'category';
  onOrderTypeChange: () => void;
  mode: 'light' | 'dark';
  style?: React.CSSProperties;
}

export const SearchEngine: React.FC<SearchEngineProps> = (props) => {
  const { value, onChange, onSort, sortMode, mode, style, orderType, onOrderTypeChange } = props;
  const sortIcon = sortMode === 'az' ? SortAscending : SortDescending;
  const orderTypeIcon = orderType === 'alphabetical' ? Funnel : Translate;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        width: '100%',
        ...style,
      }}
    >
      <TextInput
        value={value}
        onChange={onChange}
        placeholder="Buscar..."
        mode={mode}
        style={{ width: '100%' }}
      />
      <IconButton
        icon={orderTypeIcon}
        mode={mode}
        onClick={onOrderTypeChange}
        ariaLabel={orderType === 'category' ? 'Ordenar alfabéticamente' : 'Ordenar por categorías'}
      />
      <IconButton
        icon={sortIcon}
        mode={mode}
        onClick={onSort}
        ariaLabel={sortMode === 'az' ? 'Ordenar Z-A' : 'Ordenar A-Z'}
      />
    </div>
  );
};
