'use client';
import { getItem, setItem, STORAGE_KEYS } from '@/lib/storage/localStorage';

const getQrScanListFromStorage = (): string[] => {
  const qrScanList = getItem<string[]>(STORAGE_KEYS.QR_SCAN_LIST);
  if (!qrScanList) {
    return [];
  }

  return qrScanList;
};

export const storeQrScanItemToStrage = (pieceId: string): number => {
  const qrScanList = getQrScanListFromStorage();
  if (qrScanList.length === 0) {
    setItem(STORAGE_KEYS.QR_SCAN_LIST, [pieceId]);
    return 1;
  }
  if (!qrScanList.includes(pieceId)) {
    setItem(STORAGE_KEYS.QR_SCAN_LIST, [...qrScanList, pieceId]);
    return qrScanList.length + 1;
  }

  return 0;
};
