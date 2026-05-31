'use client';

import { getItem, setItem, STORAGE_KEYS } from '@/lib/storage/localStorage';

//GET RANDOM CAPTHA THAT IS NOT TRIED YET FROM LOCAL STORAGE
export const getRandomQuestion = () => {
  /* const triedQuestion = getItem<string[]>(STORAGE_KEYS.LIST_TRIED_CAPTCHA);

  const questionNotTried = questionCategoryList.filter(
    (question) => !triedQuestion?.includes(question)
  );
  if (questionNotTried.length === 0) {
    return null;
  }
  const randomQuestion =
    questionNotTried[Math.floor(Math.random() * questionNotTried.length)];
  return randomQuestion; */
};

//ADD CAPTCHA TO TRIED LIST TO LOCAL STORAGE
export const addQuestionToTriedList = (question: string) => {
  const triedQuestion = getItem<string[]>(STORAGE_KEYS.LIST_TRIED_QUESTION);
  if (!triedQuestion) {
    setItem(STORAGE_KEYS.LIST_TRIED_QUESTION, [question]);
  } else {
    setItem(STORAGE_KEYS.LIST_TRIED_QUESTION, [...triedQuestion, question]);
  }
};

export const shouldOpenModal = (qrScanCount: number) => {
  // if ((qrScanCount - 1) % 2 !== 0 && qrScanCount < 200) {
  return true;
  // }
  //return false;
};
