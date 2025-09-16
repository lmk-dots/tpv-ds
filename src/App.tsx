import { useState, useEffect } from 'react';
import { getToken } from './styles/getToken';
import productsData from './assets/products.json';
import filtersData from './assets/filters.json';
import { ThemeToggle } from './components/ThemeToggle';
import { DropdownMenu } from './components/DropdownMenu';
import { MainContainer } from './components/MainContainer';
import { Sidebar } from './components/Sidebar';
  // Checkout items de ejemplo
  const checkoutItems = [
    {
      id: 1,
      name: 'Tomate rama',
      price: 1.30,
      quantity: 2,
      selectedOptions: [
        { name: 'Granel', extra: 0.10 }
      ]
    },
    {
      id: 2,
      name: 'Sandía',
      price: 3.20,
      quantity: 1,
      selectedOptions: [
        { name: 'Media', extra: 0.50 },
        { name: 'Importada', extra: 0.30 }
      ]
    },
    {
      id: 7,
      name: 'Fresa',
      price: 2.90,
      quantity: 3,
      selectedOptions: [
        { name: 'Caja' }
      ]
    },
    {
      id: 8,
      name: 'Zumo de naranja',
      price: 2.80,
      quantity: 1,
      selectedOptions: [
        { name: 'Botella' }
      ]
    },
    {
      id: 9,
      name: 'Pimiento rojo',
      price: 1.60,
      quantity: 2,
      selectedOptions: [
        { name: 'Mini', extra: 0.15 },
        { name: 'Local', extra: 0.10 }
      ]
    },
    {
      id: 10,
      name: 'Manzana roja',
      price: 1.40,
      quantity: 4,
      selectedOptions: [
        { name: 'Unidad' }
      ]
    }
  ];
import { NavigationBar } from './components/NavigationBar';
import './App.css';
import { LabelContainer } from './components/LabelContainer';
import { ProductList } from './components/ProductList';
import { SearchEngine } from './components/SearchEngine';
import { NumpadContainer } from './components/NumpadContainer';
import { CheckoutList } from './components/CheckoutList';
import { ActionButton } from './components/ActionButton';
import { SidebarContainer } from './components/SidebarContainer';

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
        <ThemeToggle mode={mode} onToggle={handleToggle} />
        <DropdownMenu
          options={[
            { label: 'Opción 1', value: 1 },
            { label: 'Opción 2', value: 2 },
            { label: 'Opción 3', value: 3 }
          ]}
          onSelect={val => alert('Seleccionaste: ' + val)}
          mode={mode}
        />
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
                precio: typeof product.precio === 'number' ? product.precio : 0,
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
          <CheckoutList
            items={checkoutItems}
            mode={mode}
          />
          {/* Total bar envuelta en SidebarContainer */}
          <SidebarContainer style={{ background: getToken('bg-color-secondary', mode), marginBottom: 24 }}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: 'transparent',
              }}
            >
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 24,
                  fontWeight: 600,
                  color: getToken('text-color-primary', mode),
                }}
              >
                <span>Total</span>
                <span>{
                  checkoutItems
                    .reduce((sum, item) => {
                      const extras = item.selectedOptions?.reduce((acc, opt) => acc + ('extra' in opt && typeof opt.extra === 'number' ? opt.extra : 0), 0) ?? 0;
                      return sum + ((item.price + extras) * item.quantity);
                    }, 0)
                    .toFixed(2)
                }€</span>
              </div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 13,
                  fontWeight: 400,
                  color: getToken('text-color-secondary', mode),
                  marginTop: 2,
                }}
              >
                <span>Total en impuestos (21% IVA)</span>
                <span>{
                  (() => {
                    const total = checkoutItems
                      .reduce((sum, item) => {
                        const extras = item.selectedOptions?.reduce((acc, opt) => acc + ('extra' in opt && typeof opt.extra === 'number' ? opt.extra : 0), 0) ?? 0;
                        return sum + ((item.price + extras) * item.quantity);
                      }, 0);
                    return (total * 21 / 121).toFixed(2);
                  })()
                }€</span>
              </div>
            </div>
          </SidebarContainer>
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
          <SidebarContainer style={{ marginTop: 8 }}>
            <ActionButton
              onClick={() => alert('Botón pulsado!')}
              style={{
                width: '100%',
                background: mode === 'light' ? '#7CD58E' : '#A1EFB0',
                color: mode === 'light'
                  ? '#FFFFFF'
                  : '#322A26'
              }}
            >
              Proceder al pago
            </ActionButton>
          </SidebarContainer>
        </Sidebar>
      </div>
    </>
  );
}

export default App
