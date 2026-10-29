import React, { useEffect } from 'react';
import { toast } from 'sonner';

/**
 * @deprecated Legacy Toast component replaced by Sonner.
 * Kept for backwards-compatibility to prevent broken imports.
 * Routes directly to `toast` from 'sonner'.
 */
export default function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    if (message) {
      if (typeof toast[type] === 'function') {
        toast[type](message);
      } else {
        toast(message);
      }
      if (onClose) onClose();
    }
  }, [message, type, onClose]);

  return null;
}
