'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export interface CartItem {
  slug: string;
  name: string;
  price: string;
  priceValue: number;
  image: string;
  color: string;
  size: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'qty'> & { qty?: number }) => void;
  removeItem: (key: string) => void;
  updateQty: (key: string, qty: number) => void;
  clear: () => void;
  totalValue: number;
  totalCount: number;
  itemKey: (item: Pick<CartItem, 'slug' | 'color' | 'size'>) => string;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'ch-hse-cart';

function itemKey(item: Pick<CartItem, 'slug' | 'color' | 'size'>) {
  return `${item.slug}::${item.color}::${item.size}`;
}

function parsePrice(price: string, fallback = 0) {
  const n = Number(String(price).replace(/[^\d.]/g, ''));
  return Number.isFinite(n) ? n : fallback;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const addItem = useCallback((item: Omit<CartItem, 'qty'> & { qty?: number }) => {
    setItems((prev) => {
      const key = itemKey(item);
      const existing = prev.find((p) => itemKey(p) === key);
      if (existing) {
        return prev.map((p) =>
          itemKey(p) === key ? { ...p, qty: p.qty + (item.qty ?? 1) } : p,
        );
      }
      return [
        ...prev,
        {
          ...item,
          priceValue: item.priceValue || parsePrice(item.price),
          qty: item.qty ?? 1,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((p) => itemKey(p) !== key));
  }, []);

  const updateQty = useCallback((key: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((p) => (itemKey(p) === key ? { ...p, qty } : p))
        .filter((p) => p.qty > 0),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const totalValue = useMemo(
    () => items.reduce((sum, i) => sum + i.priceValue * i.qty, 0),
    [items],
  );
  const totalCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQty,
      clear,
      totalValue,
      totalCount,
      itemKey,
    }),
    [items, addItem, removeItem, updateQty, clear, totalValue, totalCount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function formatInr(value: number) {
  return `₹ ${value.toLocaleString('en-IN')}.00`;
}
