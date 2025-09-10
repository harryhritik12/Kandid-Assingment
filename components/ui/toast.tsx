"use client";

import { createContext, useContext, useState, useRef, useEffect } from "react";

type ToastMessage = { title: string; description?: string };

const ToastContext = createContext<{
  addToast: (msg: ToastMessage) => void;
} | null>(null);

// ---- Toast Provider ----
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (msg: ToastMessage) => {
    setToasts((prev) => [...prev, msg]);
    setTimeout(() => setToasts((prev) => prev.slice(1)), 3000);
  };

  // Expose context for hook users
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map((toast, i) => (
          <div
            key={i}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-md"
          >
            <p className="font-semibold">{toast.title}</p>
            {toast.description && (
              <p className="text-sm text-gray-300">{toast.description}</p>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// ---- Global toast() function ----
// Uses an internal ref updated by provider
let addToastRef: ((msg: ToastMessage) => void) | null = null;

export function toast(msg: ToastMessage) {
  if (!addToastRef) {
    console.error("toast() called outside of <ToastProvider>");
    return;
  }
  addToastRef(msg);
}

// Hook inside provider to wire up global toast()
export function ToastProviderWithRef({ children }: { children: React.ReactNode }) {
  const ctx = useContext(ToastContext);
  const mounted = useRef(false);

  useEffect(() => {
    if (ctx) addToastRef = ctx.addToast;
    mounted.current = true;
    return () => {
      addToastRef = null;
      mounted.current = false;
    };
  }, [ctx]);

  return <>{children}</>;
}
