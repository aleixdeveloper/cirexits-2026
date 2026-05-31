'use client';
import { useState } from 'react';

type UseDialog = {
  open: boolean;
  closeDialog: () => void;
  openDialog: () => void;
};
export const useDialog = (initOpen = false): UseDialog => {
  const [open, setOpen] = useState<boolean>(initOpen);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return {
    open,
    closeDialog,
    openDialog
  };
};
