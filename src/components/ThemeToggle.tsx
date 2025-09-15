import React from 'react';
import { Sun } from '@phosphor-icons/react';
import { IconButton } from './IconButton';

export interface ThemeToggleProps {
	mode: 'light' | 'dark';
	onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ mode, onToggle }) => {
	return (
		<IconButton
			icon={Sun}
			ariaLabel="Cambiar modo de tema"
			onClick={onToggle}
			pressed={mode === 'dark'}
			mode={mode}
		/>
	);
};


// ThemeToggle eliminado para rehacer desde cero
