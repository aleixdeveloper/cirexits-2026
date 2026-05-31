'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Modal } from '../ui/modal';
import { useDialog } from '../ui/modal/useDialog';
import { QuestionType } from 'services/questionService';

const hueMap = [190, 310, 250];
const bg_saturation = '75%';
const bg_lightness = '85%';
const text_saturation = '55%';
const text_lightness = '45%';

export type SubmissionResult = {
  isCorrect: boolean;
  correctAnswer: 'A' | 'B' | 'C';
  selectedAnswer: 'A' | 'B' | 'C';
};

export const Question = ({
  question,
  onSubmitAnswer,
  submissionResult
}: {
  question: QuestionType;
  onSubmitAnswer: (choice: 'A' | 'B' | 'C') => void;
  submissionResult?: SubmissionResult | null;
}) => {
  const { open: imageModalIsOpen, openDialog, closeDialog } = useDialog();
  const [selected, setSelected] = useState<'A' | 'B' | 'C' | null>(null);

  const { question: text, optionA, optionB, optionC, imageUrl } = question;
  return (
    <>
      <div className="mx-auto w-full max-w-2xl">
        <div
          style={{ minHeight: 'calc(100dvh - 100px)' }}
          className="flex flex-col justify-between gap-4 rounded-lg border-2 bg-card/85 p-4 text-center shadow-[0_10px_0_hsl(var(--foreground)/0.06)]"
        >
          <QuestionText text={text} />
          {imageUrl && (
            <Button
              variant="success"
              className="mx-auto flex justify-center text-lg"
              onClick={() => openDialog()}
            >
              Veure imatge
            </Button>
          )}
          <div className="flex flex-col gap-4">
            <OptionsContainer>
              {[optionA, optionB, optionC].map((option, index) => {
                const hue = hueMap[index];
                const choice = String.fromCharCode(65 + index) as
                  | 'A'
                  | 'B'
                  | 'C';
                return (
                  <div
                    key={option}
                    style={
                      submissionResult
                        ? choice === submissionResult.correctAnswer
                          ? {
                              backgroundColor: 'hsl(var(--success) / 0.2)',
                              border: '2px solid hsl(var(--success))'
                            }
                          : choice === submissionResult.selectedAnswer &&
                              !submissionResult.isCorrect
                            ? {
                                backgroundColor:
                                  'hsl(var(--destructive) / 0.2)',
                                border: '2px solid hsl(var(--destructive))'
                              }
                            : {}
                        : selected === choice
                          ? {
                              backgroundColor: `hsl(${hue},${bg_saturation},${bg_lightness})`
                            }
                          : {}
                    }
                    className={cn(
                      'flex cursor-pointer items-center justify-center gap-3 rounded-lg border-2 border-transparent bg-card/70 p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-accent/50'
                    )}
                    onClick={() => {
                      if (submissionResult) return;
                      setSelected(choice);
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: `hsl(${hue},${text_saturation},${text_lightness})`
                      }}
                      className={cn(
                        'flex aspect-square w-10 items-center justify-center rounded-full text-center text-lg font-extrabold text-primary-foreground shadow-[0_3px_0_hsl(var(--foreground)/0.16)]'
                      )}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span
                      className={cn(selected === option ? 'font-bold' : '')}
                      style={{
                        fontSize: `clamp(16px, ${-0.45 * option.length + 40.45}px, 40px)`
                      }}
                    >
                      {option}
                    </span>
                  </div>
                );
              })}
            </OptionsContainer>
            <Button
              disabled={!selected || !!submissionResult}
              className="text-xl"
              onClick={() => {
                if (!selected || submissionResult) return;
                onSubmitAnswer(selected);
              }}
            >
              {submissionResult ? 'Resposta enviada' : 'Enviar'}
            </Button>
          </div>
        </div>
        <div>
          <Modal
            title=""
            open={imageModalIsOpen}
            onClose={closeDialog}
            withCloseButton
          >
            <div className="flex h-full items-center justify-center">
              <img src={`/question-images/${imageUrl}`} alt="Question 1" />
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export const QuestionText = ({ text }: { text: string }) => {
  return (
    <div
      className="text-balance font-extrabold"
      style={{
        fontSize: `clamp(20px, ${-0.088 * text.length + 42}px, 40px)`,
        lineHeight: 1.4
      }}
    >
      {text}?
    </div>
  );
};

export const ImageContainer = () => {
  return (
    <div className="flex flex-wrap gap-6 justify-center border-2 border-green-400"></div>
  );
};

export const OptionsContainer = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-3" style={{ lineHeight: 1.3 }}>
      {children}
    </div>
  );
};
