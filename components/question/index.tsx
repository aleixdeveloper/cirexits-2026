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
      <div>
        <div
          style={{ minHeight: 'calc(100dvh - 100px)' }}
          className="flex flex-col justify-between gap-2 text-center"
        >
          <QuestionText text={text} />
          {imageUrl && (
            <Button
              variant="success"
              className="text-lg flex justify-center mx-auto"
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
                              backgroundColor: '#bbf7d0',
                              border: '2px solid #16a34a'
                            }
                          : choice === submissionResult.selectedAnswer &&
                              !submissionResult.isCorrect
                            ? {
                                backgroundColor: '#fecaca',
                                border: '2px solid #dc2626'
                              }
                            : {}
                        : selected === choice
                          ? {
                              backgroundColor: `hsl(${hue},${bg_saturation},${bg_lightness})`
                            }
                          : {}
                    }
                    className={cn(
                      'flex gap-2 justify-center items-center rounded-md p-2'
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
                        'flex text-lg aspect-square w-10 text-center justify-center items-center font-bold rounded-full text-primary-foreground'
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
      className="font-bold"
      style={{
        fontSize: `clamp(20px, ${-0.14 * text.length + 53.8}px, 50px)`,
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
    <div className="flex flex-col gap-4" style={{ lineHeight: 1.3 }}>
      {children}
    </div>
  );
};
