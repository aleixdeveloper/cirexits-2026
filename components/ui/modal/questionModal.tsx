'use client';

import { useState, useEffect } from 'react';
import { Modal } from '.';
import { cn } from '@/lib/utils';
import { type QuestionType } from 'services/questionService';
import { Question } from '@/components/question';
import { handleAnswerSubmitAction, handleScanAction } from 'app/actions/game';

type Props = {
  userId: string;
  open: boolean;
  closeDialog: () => void;
  className?: string;
  pieceId: string;
};
export const QuestionModal = (props: Props) => {
  const { userId, open, closeDialog, className = '', pieceId } = props;

  const [isClient, setIsClient] = useState(false);
  const [question, setQuestion] = useState<QuestionType | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (open) {
      const result = async () => {
        const res = await handleScanAction(userId, pieceId);
        setQuestion(res?.nextQuestion || null);
      };
      result();
    }
  }, [open]);

  const onSubmitAnswer = async (choice: 'A' | 'B' | 'C') => {
    // TODO: Implement answer submission

    await handleAnswerSubmitAction(userId, question!.id, choice);
    closeDialog();
  };

  if (!isClient || !question) return null;

  return (
    <Modal
      className={cn(
        'w-[calc(100%-1rem)] h-[calc(100%-1rem)] grid place-items-center',
        className
      )}
      open={open}
      onClose={closeDialog}
    >
      <Question question={question} onSubmitAnswer={onSubmitAnswer} />
    </Modal>
  );
};
