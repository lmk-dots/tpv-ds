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
import { ActionButton } from './components/ActionButton';

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
      <div style={{ display: 'flex', flexDirection: 'row', minHeight: 'calc(100vh - 80px)', width: '100vw', margin: 0 }}>
          <MainContainer mode={mode}>
          <SearchEngine
            value={inputValue}
            onChange={setInputValue}
            onSearch={() => console.log('Buscar:', inputValue)}
            mode={mode}
          />
          <LabelContainer
            labels={['Verduras frescas', 'Para cocidos', 'Frutas variadas', 'Frutos rojos', 'Zumos naturales']}
          />
          <div style={{ height: '720px', width: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <ProductList
              products={[
                { imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', alt: 'Producto', text: 'Lechuga romana', mode },
                { imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', alt: 'Producto', text: 'Chorizo de guisar', mode },
                { imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', alt: 'Producto', text: 'Plátano de Canarias', mode },
                { imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', alt: 'Producto', text: 'Arándanos frescos', mode },
                { imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', alt: 'Producto', text: 'Zumo de naranja', mode },
                { imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', alt: 'Producto', text: 'Mix de ensaladas', mode },
                { imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', alt: 'Producto', text: 'Tomate cherry', mode },
                { imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', alt: 'Producto', text: 'Caldo de pollo', mode },
                { imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', alt: 'Producto', text: 'Brotes de espinaca', mode },
                { imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', alt: 'Producto', text: 'Batido de fresa', mode },
                { imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', alt: 'Producto', text: 'Aguacate', mode },
                { imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', alt: 'Producto', text: 'Queso fresco', mode },
                { imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', alt: 'Producto', text: 'Manzana roja', mode },
                { imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', alt: 'Producto', text: 'Pepino', mode },
                { imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', alt: 'Producto', text: 'Jamón cocido', mode },
                { imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', alt: 'Producto', text: 'Yogur natural', mode },
                { imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', alt: 'Producto', text: 'Pimiento rojo', mode },
              ]}
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
          <div style={{ width: '100%', marginTop: 8 }}>
            <ActionButton
              onClick={() => alert('Botón pulsado!')}
              style={{
                width: '100%',
                background: mode === 'light' ? '#7CD58E' : '#A1EFB0',
                color: mode === 'light'
                  ? '#3A1809' // label-text-color from tokens.json (light)
                  : '#322A26' // label-text-color from tokens.json (dark)
              }}
            >
              Proceder al pago
            </ActionButton>
          </div>
        </Sidebar>
      </div>
    </>
  );
}

export default App
