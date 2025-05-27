/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Notification.tsx

import React, { useEffect } from 'react';
import { Check, AlertCircle, X } from 'lucide-react';


interface NotificationProps {
  notification: any;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ notification, onClose }) => {
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  if (!notification) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
      notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`}>
      {notification.type === 'success' ? 
        <Check className="h-5 w-5 flex-shrink-0" /> : 
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
      }
      <span className="font-medium">{notification.message}</span>
      <button
        onClick={onClose}
        className="ml-2 hover:opacity-75 transition-opacity"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};