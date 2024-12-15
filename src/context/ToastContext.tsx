"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, X, XCircle } from 'lucide-react';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContextType {
  addToast: (toast: Toast) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const toastVariants = {
  success: 'bg-emerald-100 border-emerald-300 text-emerald-900',
  error: 'bg-rose-100 border-rose-300 text-rose-900',
  info: 'bg-gray-100 border-gray-300 text-gray-900'
};

const toastIcons = {
  success: <CheckCircle2 className="text-emerald-600 w-6 h-6" />,
  error: <XCircle className="text-rose-600 w-6 h-6" />,
  info: <Info />
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Toast) => {
    setToasts((prevToasts) => [...prevToasts, toast]);
    setTimeout(() => {
      removeToast(toast.id);
    }, 5000); // Toast disappears after 5 seconds
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-4 w-72">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className={`
              ${toastVariants[toast.type || 'info']} 
              border-l-4 rounded-r-lg shadow-lg 
              flex items-center p-4 space-x-4
              hover:shadow-xl transition-all duration-300
            `}
          >
            {/* Icon */}
            <div className="flex-shrink-0">
              {toastIcons[toast.type] || null}
            </div>

            {/* Message */}
            <div className="flex-1 font-medium">
              {toast.message}
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => removeToast(toast.id)}
              className="text-current opacity-50 hover:opacity-100 transition-opacity"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>

    </ToastContext.Provider>
  );
};
