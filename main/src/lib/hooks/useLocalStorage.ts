"use client";
import { useState, useEffect } from "react";
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  useEffect(() => {
    try { const item = window.localStorage.getItem(key); if (item) setStoredValue(JSON.parse(item)); } catch {}
  }, [key]);
  const setValue = (value: T | ((prev: T) => T)) => {
    try { const v = value instanceof Function ? value(storedValue) : value; setStoredValue(v); window.localStorage.setItem(key, JSON.stringify(v)); } catch {}
  };
  return [storedValue, setValue] as const;
}
