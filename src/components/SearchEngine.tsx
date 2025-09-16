import React from 'react';
import { TextInput } from './TextInput';
import { IconButton } from './IconButton';
import { MagnifyingGlass } from '@phosphor-icons/react';

export interface SearchEngineProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  mode: 'light' | 'dark';
  style?: React.CSSProperties;
}

export const SearchEngine: React.FC<SearchEngineProps> = ({ value, onChange, onSearch, mode, style }) => {
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
        icon={MagnifyingGlass}
        mode={mode}
        onClick={onSearch}
        ariaLabel="Buscar"
      />
    </div>
  );
};
