import React, { useEffect, useState } from 'react';
import { Card } from './Card';
import { IconButton } from './IconButton';
import { getToken } from '../styles/getToken';

interface PaymentPopupProps {
  visible: boolean;
  onClose?: () => void;
  message?: string;
}

export const Popup: React.FC<PaymentPopupProps> = ({ visible, onClose, message }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!visible) return;
    let count = 0;
    const interval = setInterval(() => {
      count = (count + 1) % 4;
      setDots('.'.repeat(count));
    }, 400);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.25)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card
        mode="light"
        style={{
          position: 'relative',
          width: 816,
          minHeight: 180,
          background: getToken('bg-color-primary', 'light'),
          boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
          border: `3px solid ${getToken('button-bg-color-pressed', 'light')}`,
          borderRadius: getToken('corner-radius-xl', 'general'),
          padding: '48px 64px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ position: 'absolute', top: 16, right: 16 }}>
          <IconButton
            icon={({ size = 24 }) => (
              <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4L12 12M12 4L4 12" stroke={getToken('button-text-color-danger', 'light')} strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
            size={36}
            mode="light"
            backgroundColorToken="bg-color-danger"
            ariaLabel="Cerrar"
            onClick={onClose}
          />
        </div>
        <span
          style={{
            fontWeight: 600,
            color: getToken('text-color-primary', 'light'),
            fontSize: 24,
            textAlign: 'center',
            width: '100%',
            display: 'block',
            marginTop: 24,
          }}
        >
          {(typeof message === 'string' ? message : 'Conectando con pasarela de pago')}{dots}
        </span>
      </Card>
    </div>
  );
};
