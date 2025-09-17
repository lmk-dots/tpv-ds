
import { useState, useEffect } from 'react';
import { getToken } from './styles/getToken';
import productsData from './assets/products.json';
import filtersData from './assets/filters.json';
import { ThemeToggle } from './components/ThemeToggle';
import { DropdownMenu } from './components/DropdownMenu';
import { MainContainer } from './components/MainContainer';
import { Sidebar } from './components/Sidebar';
import type { CheckoutListItem } from './components/CheckoutList';
import { NavigationBar } from './components/NavigationBar';
import './App.css';
import { LabelContainer } from './components/LabelContainer';
import { ProductList } from './components/ProductList';
import { SearchEngine } from './components/SearchEngine';
import { NumpadContainer } from './components/NumpadContainer';
import { CheckoutList } from './components/CheckoutList';
import { ActionButton } from './components/ActionButton';
import { SidebarContainer } from './components/SidebarContainer';
import { Toast } from './components/Toast';
import { Popup } from './components/Popup';
import { IconButton } from './components/IconButton';
import { Barcode } from '@phosphor-icons/react';

function App() {
  // Payment popup state
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  // Barcode popup state
  const [showBarcodePopup, setShowBarcodePopup] = useState(false);
  // State for selected checkout item
  const [selectedCheckoutIdx, setSelectedCheckoutIdx] = useState<number | null>(null);
  // Estado para el checkout dinámico
  const [checkoutItems, setCheckoutItems] = useState<CheckoutListItem[]>([]);
  // Estado para el modo de orden
  const [sortMode, setSortMode] = useState<'az' | 'za'>('az');
  const [orderType, setOrderType] = useState<'alphabetical' | 'category'>('alphabetical');

  // Toast state
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: 'success' | 'danger' }>({ visible: false, message: '', type: 'success' });

  const showToast = (message: string, type: 'success' | 'danger') => {
    setToast({ visible: true, message, type });
  };

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
        <IconButton icon={Barcode} ariaLabel="Lector de código de barras" onClick={() => setShowBarcodePopup(true)} mode={mode} />
        <ThemeToggle mode={mode} onToggle={handleToggle} />
        <DropdownMenu
          options={[
            { label: 'Caja y productos', value: 'caja' },
            { label: 'Clientes', value: 'clientes' },
            { label: 'Facturas', value: 'facturas' },
            { label: 'Listas de inventario', value: 'productos' },
            { label: 'Opciones avanzadas', value: 'avanzadas' },
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
                id: product.id,
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
              checkoutItems={checkoutItems}
              onAddToCheckout={(item: import('./components/CheckoutList').CheckoutListItem) => {
                setCheckoutItems(prev => {
                  // Normalize options for comparison
                  const normalizeOptions = (opts: import('./components/CheckoutItem').SelectedOption[] | undefined) =>
                    (opts ?? []).map(opt => ({ name: opt.name, extra: typeof opt.extra === 'number' ? opt.extra : 0 })).sort((a, b) => a.name.localeCompare(b.name));
                  const itemOptions = normalizeOptions(item.selectedOptions);
                  let foundIdx = -1;
                  for (let i = 0; i < prev.length; i++) {
                    if (prev[i].id !== item.id) continue;
                    const prevOptions = normalizeOptions(prev[i].selectedOptions);
                    if (prevOptions.length !== itemOptions.length) continue;
                    let same = true;
                    for (let j = 0; j < prevOptions.length; j++) {
                      if (prevOptions[j].name !== itemOptions[j].name || prevOptions[j].extra !== itemOptions[j].extra) {
                        same = false;
                        break;
                      }
                    }
                    if (same) {
                      foundIdx = i;
                      break;
                    }
                  }
                  let updated;
                  if (foundIdx !== -1) {
                    // Only add the selected quantity
                    updated = [...prev];
                    updated[foundIdx] = {
                      ...updated[foundIdx],
                      quantity: updated[foundIdx].quantity + item.quantity
                    };
                    showToast('Producto añadido al carrito', 'success');
                    setSelectedCheckoutIdx(foundIdx);
                    return updated;
                  }
                  updated = [...prev, item];
                  showToast('Producto añadido al carrito', 'success');
                  setSelectedCheckoutIdx(updated.length - 1);
                  return updated;
                });
              }}
              onRemoveProduct={(id: string | number) => {
                setCheckoutItems(prev => {
                  const exists = prev.some(item => item.id === id);
                  const newItems = prev.filter(item => item.id !== id);
                  if (exists) {
                    showToast('Producto retirado', 'danger');
                  }
                  return newItems;
                });
              }}
            />
          </div>
        </MainContainer>
        <Sidebar mode={mode}>
          <CheckoutList
            items={checkoutItems}
            mode={mode}
            selectedIdx={selectedCheckoutIdx === null ? undefined : selectedCheckoutIdx}
            onSelect={setSelectedCheckoutIdx}
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
                      const extras = item.selectedOptions?.reduce((acc: number, opt: { extra?: number }) => acc + (typeof opt.extra === 'number' ? opt.extra : 0), 0) ?? 0;
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
                        const extras = item.selectedOptions?.reduce((acc: number, opt: { extra?: number }) => acc + (typeof opt.extra === 'number' ? opt.extra : 0), 0) ?? 0;
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
            onClick={(val: string | number) => {
              if (val === '<' && selectedCheckoutIdx !== null && checkoutItems[selectedCheckoutIdx]) {
                setCheckoutItems(prev => {
                  const exists = prev[selectedCheckoutIdx] !== undefined;
                  const newItems = prev.filter((_, idx) => idx !== selectedCheckoutIdx);
                  if (exists) {
                    showToast('Producto retirado', 'danger');
                  }
                  // Seleccionar el siguiente item si existe
                  if (newItems.length > 0) {
                    let nextIdx = selectedCheckoutIdx;
                    if (nextIdx >= newItems.length) nextIdx = newItems.length - 1;
                    setSelectedCheckoutIdx(nextIdx);
                  } else {
                    setSelectedCheckoutIdx(null);
                  }
                  return newItems;
                });
              } else {
                // ...existing logic (if any)
                console.log('Numpad value:', val);
              }
            }}
            style={{ width: '100%' }}
          />
          <SidebarContainer style={{ marginTop: 8 }}>
            <ActionButton
              onClick={() => {
                if (checkoutItems.length === 0) {
                  showToast('carrito vacío', 'danger');
                  return;
                }
                setShowPaymentPopup(true);
              }}
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
      <Toast
        message={toast.message}
        visible={toast.visible}
        type={toast.type}
        onClose={() => setToast(t => ({ ...t, visible: false }))}
        duration={2200}
      />
      <Popup
        visible={showPaymentPopup}
        onClose={() => setShowPaymentPopup(false)}
      />
      <Popup
        visible={showBarcodePopup}
        onClose={() => setShowBarcodePopup(false)}
        message="Conectando con el lector de código de barras"
      />
    </>
  );
}

export default App;
