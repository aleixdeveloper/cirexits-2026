/* import { QuestionIcon } from '@/components/ui/question-icon/QuestionIcon';
import {
  CAPTCHA_CATEGORY,
  questionMap
} from '@/components/ui/question-icon/questionLabels'; */
import { CherryIconWrap } from '@/components/ui/icons/CherryIconWrap';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { getSolvedQuestions } from '@/lib/question';
import { getColorByIndex, getPastelColor } from '@/lib/colors';
import { getPiecesFoundByUser } from '@/lib/pieces/getPieceById';
import { getRandomNumber } from '@/lib/utils';
import { backgroundColorVariants } from '@/lib/variants';
import { QUESTION_SCORE } from 'app/constants';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { QuestionIcon } from '@/components/ui/question-icon/QuestionIcon';

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
  const questionFoundByUser = await getSolvedQuestions(session?.id);
  const solvedQuestion = questionFoundByUser.map((item) => item.questionId);

  return (
    <div className="flex flex-col gap-4 px-1 h-full ">
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-4 justify-between items-center pb-4 border-b border-slate-500">
          <h2>Mocador de fer farcells</h2>
          <div className="flex ml-auto items-center gap-2 font-bold">
            <p>{piecesFoundByUser.length} cirèxits</p>+
            <p>{solvedQuestion.length} preguntes</p>=
            {/*  <div className="border-2 border-black rounded-xs font-bold px-2 py-1 bg-highlight">
              {totalPoints} {totalPoints === 1 ? 'punt' : ' punts'}
            </div> */}
          </div>
        </div>
        <div className="flex pt-2 gap-3 items-center">
          <h3>Cirèxits</h3>
          <p>({piecesFoundByUser.length})</p>
        </div>
        <p>Aquí trobarás totes les cirèxits que has collit!</p>
      </div>
      <div className="h-full ">
        <div className="flex items-start justify-center gap-1 flex-wrap">
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
              <Link href={`/cirexit/${item.pieceId}`} key={index}>
                <CherryIconWrap
                  key={index}
                  backgroundColor={getPastelColor(item.hue)}
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex pt-2 gap-3 items-center">
          <h3>Preguntes</h3>
          <p>({solvedQuestion.length})</p>
        </div>
        <p>I tots les preguntes que has respost correctament!</p>
      </div>
      <div className="h-full">
        <div className="flex items-start justify-center gap-x-1 gap-y-2 flex-wrap">
          {solvedQuestion.map((item, index) => {
            return (
              <Link href={`/question/${item}`} key={index}>
                <div
                  key={index}
                  style={{ width: CAPTCHA_WIDTH, height: CAPTCHA_HEIGHT }}
                >
                  <QuestionIcon
                    backgroundColor={getColorByIndex(13, index)}
                    points={`+${QUESTION_SCORE} punts`}
                    //label={questionMap[item as CAPTCHA_CATEGORY]?.short}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
