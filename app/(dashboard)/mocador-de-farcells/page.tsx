import { CherryIconWrap } from '@/components/ui/icons/CherryIconWrap';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { getAnsweredQuestions } from '@/lib/question';
import { getColorByIndex, getPastelColor } from '@/lib/colors';
import { getPiecesFoundByUser } from '@/lib/pieces/getPieceById';
import { cn, getRandomNumber } from '@/lib/utils';
import { backgroundColorVariants } from '@/lib/variants';
import { QUESTION_SCORE } from 'app/constants';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { QuestionIcon } from '@/components/ui/question-icon/QuestionIcon';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { formatDate, getTimeAndDate } from '@/lib/date';

const CAPTCHA_WIDTH = 80;
const CAPTCHA_HEIGHT = 80;

export default async function MocadorDeFarcellsPage(props: {}) {
  const session = await getCurrentUser();
  if (!session) {
    redirect('/auth/login');
  }
  if (session.isAdmin) {
    redirect('/admin');
  }

  const piecesFoundByUser = await getPiecesFoundByUser(session?.id);
  const questionAnsweredByUser = await getAnsweredQuestions(session?.id);
  const correctAnswers = questionAnsweredByUser.filter(
    (item) => item.isCorrect
  ).length;

  const totalPoints =
    piecesFoundByUser.length + correctAnswers * QUESTION_SCORE;

  return (
    <div className="flex h-full flex-col gap-4 px-1">
      <div className="flex flex-col rounded-lg border-2 bg-card/85 p-4 shadow-[0_10px_0_hsl(var(--foreground)/0.06)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 pb-4">
          <h2>Mocador de fer farcells</h2>
          <div className="ml-auto flex flex-wrap items-center gap-2 text-sm font-extrabold">
            <p>{piecesFoundByUser.length} cirèxits</p>+
            <p>{correctAnswers} encerts</p>=
            <div className="rounded-md border-2 border-foreground bg-highlight px-3 py-1 font-extrabold text-accent-foreground shadow-[0_3px_0_hsl(var(--foreground)/0.2)]">
              {totalPoints} {totalPoints === 1 ? 'punt' : ' punts'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 pt-3">
          <h3>Cirèxits</h3>
          <p>({piecesFoundByUser.length})</p>
        </div>
        <p>Aquí trobarás totes les cirèxits que has collit!</p>
      </div>
      {piecesFoundByUser.length === 0 ? (
        <div className="h-full rounded-lg border-2 bg-card/55 p-3">
          <p>No n'has collit cap encara.</p>
        </div>
      ) : (
        <div className="h-full rounded-lg border-2 bg-card/55 p-3">
          <div className="flex flex-wrap items-start justify-center gap-2">
            {piecesFoundByUser.map((item, index) => {
              const backgroundColorVariant = getRandomNumber(
                0,
                backgroundColorVariants.length - 1
              );
              let points;
              if (backgroundColorVariant === 0) {
                points = '1 punt';
              } else {
                points = `${backgroundColorVariant + 1} punts`;
              }
              return (
                <Popover key={item.pieceId}>
                  <PopoverTrigger asChild>
                    <CherryIconWrap
                      key={index}
                      backgroundColor={getPastelColor(item.hue)}
                    />
                  </PopoverTrigger>
                  <PopoverContent align="center">
                    <span>Trobada {getTimeAndDate(item.foundAt)}</span>
                  </PopoverContent>
                </Popover>
              );
            })}
          </div>
        </div>
      )}
      <div className="flex flex-col rounded-lg border-2 bg-card/85 p-4 shadow-[0_10px_0_hsl(var(--foreground)/0.06)]">
        <div className="flex items-center gap-3 pt-2">
          <h3>Encerts</h3>
          <p>({correctAnswers})</p>
        </div>
        <p>I totes les preguntes que has respost!</p>
      </div>
      {questionAnsweredByUser.length === 0 ? (
        <div className="h-full rounded-lg border-2 bg-card/55 p-3">
          <p>No n'has respost cap encara.</p>
        </div>
      ) : (
        <>
          <div className="h-full rounded-lg border-2 bg-card/55 p-3">
            <div className="flex flex-wrap items-start justify-center gap-x-2 gap-y-3">
              {questionAnsweredByUser.map((item, index) => {
                const answerText =
                  item.selectedOption === 'A'
                    ? item.optionA
                    : item.selectedOption === 'B'
                      ? item.optionB
                      : item.selectedOption === 'C'
                        ? item.optionC
                        : '';
                return (
                  <div
                    key={index}
                    style={{ width: CAPTCHA_WIDTH, height: CAPTCHA_HEIGHT }}
                  >
                    <Popover>
                      <PopoverTrigger asChild>
                        <QuestionIcon
                          backgroundColor={getColorByIndex(
                            180,
                            index,
                            item.isCorrect
                              ? {
                                  saturation: '75%',
                                  lightness: '70%'
                                }
                              : {
                                  saturation: '0%',
                                  lightness: '70%'
                                }
                          )}
                          points={
                            item.isCorrect
                              ? `+${QUESTION_SCORE} punt${QUESTION_SCORE === 1 ? '' : 's'}`
                              : undefined
                          }
                          isCorrect={item.isCorrect}
                        />
                      </PopoverTrigger>
                      <PopoverContent align="center">
                        <span className="text-xs">
                          {item.question}{' '}
                          {item?.selectedOption ? (
                            <span
                              className={cn(
                                'px-1 rounded-sm',
                                item.isCorrect ? 'bg-green-200' : 'bg-red-200'
                              )}
                            >
                              {answerText}
                            </span>
                          ) : (
                            ''
                          )}
                        </span>
                      </PopoverContent>
                    </Popover>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
