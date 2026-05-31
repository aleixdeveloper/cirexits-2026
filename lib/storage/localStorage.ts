'use client';

export enum STORAGE_KEYS {
  QR_SCAN_LIST = 'qr_scan_list_preview_two',
  WELCOME_MODAL = 'welcome_modal_preview_two', // with env
  LIST_TRIED_QUESTION = 'list_tried_question_preview_two'
}

export const getItem = <T>(key: STORAGE_KEYS): T | null => {
  const value = window.localStorage.getItem(key);
  if (!value) return null;
  return JSON.parse(value) as T;
};

export const setItem = <T>(key: STORAGE_KEYS, value: T) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
