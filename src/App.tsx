import { useState, useEffect } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { MainContainer } from './components/MainContainer';
import { Sidebar } from './components/Sidebar';
import { NavigationBar } from './components/NavigationBar';
import './App.css';
import { LabelContainer } from './components/LabelContainer';
import { ProductList } from './components/ProductList';
import { SearchEngine } from './components/SearchEngine';
import { NumpadContainer } from './components/NumpadContainer';

function App() {
  const [inputValue, setInputValue] = useState('');
  const getSystemTheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  const [mode, setMode] = useState<'light' | 'dark'>(getSystemTheme());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    // For debugging: log current mode and theme
    // console.log('Theme set:', mode);
  }, [mode]);

  const handleToggle = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Ensure the mode matches the actual data-theme
  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme !== mode) {
      document.documentElement.setAttribute('data-theme', mode);
    }
  }, [mode]);

  return (
    <>
      <NavigationBar mode={mode}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
          <ThemeToggle mode={mode} onToggle={handleToggle} />
        </div>
      </NavigationBar>
      <div style={{ display: 'flex', flexDirection: 'row', minHeight: 'calc(100vh - 64px)', width: '100vw', margin: 0 }}>
          <MainContainer mode={mode} style={{ gap: 16 }}>
          <SearchEngine
            value={inputValue}
            onChange={setInputValue}
            onSearch={() => console.log('Buscar:', inputValue)}
            mode={mode}
          />
          <LabelContainer
            labels={['Label 1', 'Label 2', 'Label 3', 'Label 4']}
          />
          <div style={{ height: '720px', width: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <ProductList
              products={Array.from({ length: 13 }).map((_, idx) => ({
                imageSrc: `https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80&sig=${idx}`,
                alt: `Producto ${idx + 1}`,
                text: `Producto de ejemplo ${idx + 1}`,
                mode,
              }))}
              mode={mode}
            />
          </div>
        </MainContainer>
        <Sidebar mode={mode}>
          <NumpadContainer
            mode={mode}
            buttons={[
              [1, 2, 3, 'Cantidad'],
              [4, 5, 6, 'Precio'],
              [7, 8, 9, '%'],
              ['+/-', 0, '.', '<'],
            ]}
            onClick={(val: string | number) => console.log('Numpad value:', val)}
            style={{ width: '100%' }}
          />
        </Sidebar>
      </div>
    </>
  );
}

export default App
