import React from 'react';
import { Card } from './Card';
import { IconButton } from './IconButton';
import { getToken } from '../styles/getToken';

export interface ProductPopupProps {
  open: boolean;
  onClose: () => void;
  product: {
    imageSrc: string;
    alt?: string;
    text: string;
    precio: number;
    labelIndex?: number;
    cantidad?: number;
    total?: number;
    ref?: string;
    optionGroups?: Array<{ name: string; options: Array<{ label: string; value: string; precioExtra?: number }> }>;
    // Puedes añadir más campos según lo que necesites mostrar
  };
  filtersData?: Array<{ index: number; name: string; color: string }>;
  children?: React.ReactNode; // Para opciones extra
  mode?: 'light' | 'dark';
}

export const ProductPopup: React.FC<ProductPopupProps> = ({ open, onClose, product, children, mode = 'light', filtersData = [] }) => {

  if (!open) return null;
  const overlayColor = 'rgba(0,0,0,0.68)'; // Aún más opacidad para fondo dimeado
  const cardBg = getToken('bg-color-primary', mode);
  // Obtener referencia del producto
  const refNumber = product.ref || '';

  // Recibe por props: cantidad actual a añadir y total de ese producto ya añadido
  // Ahora cantidad y total están tipados correctamente en el producto

  // Render principal
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: overlayColor,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card
        mode={mode}
        style={{
          position: 'relative',
          width: 816,
          minHeight: 340,
          background: cardBg,
          boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
          border: `3px solid ${getToken(`button-bg-color-accent-${filtersData?.find(f => f.index === product.labelIndex)?.color || 'cyan'}`, 'general')}`,
          borderRadius: getToken('corner-radius-xl', 'general'),
          padding: '32px 32px 24px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ position: 'absolute', top: 16, right: 16 }}>
          <IconButton
            icon={({ size = 24 }) => (
              <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4L12 12M12 4L4 12" stroke={getToken('button-text-color-danger', mode)} strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
            size={36}
            mode={mode}
            backgroundColorToken="bg-color-danger"
            ariaLabel="Cerrar"
            onClick={onClose}
          />
        </div>
        {/* Número de referencia encima del nombre del producto */}
        {refNumber && (
          <span
            style={{
              fontWeight: 500,
              color: getToken('text-color-secondary', mode),
              fontSize: getToken('font-size-s', 'general'),
              marginBottom: 2,
              textAlign: 'left',
              width: '100%',
              display: 'block',
              fontStyle: 'italic',
            }}
          >
            Ref: {refNumber}
          </span>
        )}
        <span
          style={{
            fontWeight: 700,
            color: getToken('text-color-primary', mode),
            fontSize: getToken('font-size-l', 'general'),
            marginBottom: 36,
            textAlign: 'left',
            letterSpacing: '0.01em',
            width: '100%',
            display: 'block',
          }}
        >
          {product.text}
          <span style={{ fontWeight: 400, fontSize: getToken('font-size-l', 'general'), color: getToken('text-color-secondary', mode), marginLeft: 12 }}>
            {' ' + product.precio.toFixed(2) + '€'}
          </span>
        </span>
        {/* Espacio para info adicional, con margen arriba moderado */}
        <div style={{ width: '100%', marginBottom: 0, marginTop: 32 }}>
          {children}
        </div>
          {/* Eliminado el display de total x unidades, solo se muestra la referencia arriba */}
      </Card>
    </div>
  );
};
