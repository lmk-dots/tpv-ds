import { useState, useEffect } from 'react'
import { ActionButton } from './components/ActionButton'
import { ThemeToggle } from './components/ThemeToggle'
import { MainContainer } from './components/MainContainer'
import { Sidebar } from './components/Sidebar'
import { NavigationBar } from './components/NavigationBar'
import './App.css'
import { getToken } from './styles/getToken';
import { Badge } from './components/Badge';
import { Label } from './components/Label';
import { IconButton } from './components/IconButton';
import { Sun } from '@phosphor-icons/react';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const handleToggle = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <NavigationBar mode={mode}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
          <ThemeToggle mode={mode} onToggle={handleToggle} />
        </div>
      </NavigationBar>
      <div style={{ display: 'flex', flexDirection: 'row', minHeight: 'calc(100vh - 64px)', width: '100vw', margin: 0 }}>
        <MainContainer mode={mode}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '3rem',
              gap: '1rem',
            }}
          >
            <ActionButton>
              Acción
            </ActionButton>
            <Badge value={1} color="danger" style={{ color: getToken('bg-color-alt', mode) }} />
            <Label text="Ejemplo" icon={Sun} highlightColor="cyan" />
            <IconButton icon={Sun} ariaLabel="Ejemplo icono" />
          </div>
        </MainContainer>
        <Sidebar mode={mode}>
          <div />
        </Sidebar>
      </div>
    </>
  );
}

export default App
