'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from '.';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { type QuestionType } from 'services/questionService';
import { Question, type SubmissionResult } from '@/components/question';
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

  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (open) {
      setSubmissionResult(null);
      const result = async () => {
        const res = await handleScanAction(userId, pieceId);
        setQuestion(res?.nextQuestion || null);
      };
      result();
    }
  }, [open]);

  const onSubmitAnswer = async (choice: 'A' | 'B' | 'C') => {
    const res = await handleAnswerSubmitAction(userId, question!.id, choice);

    if (!('isCorrect' in res) || !res.success) {
      toast.error('Error en enviar la resposta');
      return;
    }

    const result: SubmissionResult = {
      isCorrect: res.isCorrect,
      correctAnswer: res.correctAnswer as 'A' | 'B' | 'C',
      selectedAnswer: choice
    };

    setSubmissionResult(result);

    if (res.isCorrect) {
      toast.success('Resposta correcta! 🎉');
    } else {
      const correctText =
        res.correctAnswer === 'A'
          ? question!.optionA
          : res.correctAnswer === 'B'
            ? question!.optionB
            : question!.optionC;
      toast.error(`Resposta incorrecta. La correcta era: ${correctText}`);
    }

    setTimeout(() => {
      closeDialog();
      router.push('/mocador-de-farcells');
    }, 3000);
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
      <Question
        question={question}
        onSubmitAnswer={onSubmitAnswer}
        submissionResult={submissionResult}
      />
    </Modal>
  );
};
