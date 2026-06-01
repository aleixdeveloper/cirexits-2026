'use client';

//should open modal at first scan and then every 2 scans
export const shouldOpenModal = (qrScanCount: number) => {
  if (qrScanCount === 1 || (qrScanCount - 1) % 2 === 0) {
    return true;
  }
  return false;
};
