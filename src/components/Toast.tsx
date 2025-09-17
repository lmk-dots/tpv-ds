import React from 'react';
import { getToken } from '../styles/getToken';

interface ToastProps {
  message: string;
  visible: boolean;
  type?: 'success' | 'danger';
  onClose?: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, visible, type = 'success', onClose, duration = 2500 }) => {
  const [fade, setFade] = React.useState(1);

  React.useEffect(() => {
    if (visible) {
      setFade(1);
      // Start fade-out after (duration - 400ms)
      const fadeTimeout = setTimeout(() => setFade(0), duration - 400);
      // Hide after duration
      const hideTimeout = setTimeout(() => {
        setFade(1);
        if (onClose) onClose();
      }, duration);
      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(hideTimeout);
      };
    }
  }, [visible, duration, onClose]);

  if (!visible) return null;

  // Try to get mode from document.documentElement, fallback to 'light'
  let mode: 'light' | 'dark' = 'light';
  if (typeof document !== 'undefined') {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') mode = 'dark';
  }
  const colorDangerBg = getToken('bg-color-danger', mode);
  const colorSuccessBg = getToken('bg-color-success', mode);
  const colorText = '#FFFFFF';
  const background = type === 'danger' ? colorDangerBg : colorSuccessBg;
  return (
    <div
      style={{
        position: 'fixed',
        left: '50%',
        bottom: 32,
        transform: 'translateX(-50%)',
        background,
        color: colorText,
        padding: '14px 32px',
        borderRadius: 12,
        boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
        fontWeight: 600,
        fontSize: 16,
        zIndex: 9999,
        opacity: fade,
        border: 'none',
        transition: 'opacity 0.4s',
        minWidth: 480,
        maxWidth: '96vw',
        textAlign: 'center',
      }}
    >
      {message}
    </div>
  );
};
