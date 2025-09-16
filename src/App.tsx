import { useState, useEffect } from 'react';
import productsData from './assets/products.json';
import filtersData from './assets/filters.json';
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
  // Estado para el modo de orden
  const [sortMode, setSortMode] = useState<'az' | 'za'>('az');
  const [orderType, setOrderType] = useState<'alphabetical' | 'category'>('alphabetical');

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

  // State for selected label indices (filters)
  const [selectedLabelIdxs, setSelectedLabelIdxs] = useState<number[]>([]);

  // Filtrar productos por label y por texto de búsqueda
  const normalizedInput = inputValue.trim().toLowerCase();
  let filteredProducts = productsData.filter(product => {
    const matchesLabel = selectedLabelIdxs.length === 0 || selectedLabelIdxs.includes(Number(product.labelIndex));
    const matchesText = normalizedInput === '' || product.title.toLowerCase().includes(normalizedInput);
    return matchesLabel && matchesText;
  });

  // Ordenar productos según el tipo y el modo
  if (orderType === 'alphabetical') {
    if (sortMode === 'az') {
      filteredProducts = filteredProducts.slice().sort((a, b) => a.title.localeCompare(b.title));
    } else {
      filteredProducts = filteredProducts.slice().sort((a, b) => b.title.localeCompare(a.title));
    }
  } else {
    // Por categorías (labelIndex), luego por nombre
    filteredProducts = filteredProducts.slice().sort((a, b) => {
      const labelA = Number(a.labelIndex);
      const labelB = Number(b.labelIndex);
      if (labelA !== labelB) return labelA - labelB;
      // Dentro de la categoría, alternar sentido
      if (sortMode === 'az') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  }

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
            onSort={() => setSortMode(m => m === 'az' ? 'za' : 'az')}
            sortMode={sortMode}
            orderType={orderType}
            onOrderTypeChange={() => setOrderType(t => t === 'alphabetical' ? 'category' : 'alphabetical')}
            mode={mode}
          />
          {/* Use filters.json for label info, controlled selection */}
          <LabelContainer
            labels={filtersData.map(f => f.name)}
            selectedIdxs={selectedLabelIdxs}
            onChange={setSelectedLabelIdxs}
          />
          <div style={{ height: '720px', width: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <ProductList
              products={filteredProducts.map(product => ({
                imageSrc: product.imageSrc,
                alt: product.title,
                text: product.title,
                labelIndex: product.labelIndex,
                filterColor: filtersData[Number(product.labelIndex)]?.color || 'cyan',
                mode,
                optionGroups: product.optionGroups,
                ref: product.ref
              }))}
              mode={mode}
              filtersData={filtersData}
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
                  ? '#FFFFFF' // button-text-color-success from tokens.json (light)
                  : '#322A26' // button-text-color-success from tokens.json (dark)
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
