'use client';

import { useEffect, useState } from 'react';
import { getItem, STORAGE_KEYS } from '@/lib/storage/localStorage';

export const useStorage = <T>(key: STORAGE_KEYS) => {
  const [value, setValue] = useState<T>();
  useEffect(() => {
    const value = getItem<T>(key);
    setValue(value ?? undefined);
  }, []);

  return value;
};
