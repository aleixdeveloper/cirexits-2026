import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { CherryIconWrap } from '@/components/ui/icons/CherryIconWrap';
import { getColorByIndex, getPastelColor } from '@/lib/colors';
import { getPiecesFoundByUser } from '@/lib/pieces/getPieceById';
import { calculateScore } from '@/lib/score';
import { getUserInfo } from '@/lib/users/getUserInfo';
import { getRandomNumber } from '@/lib/utils';
import { backgroundColorVariants } from '@/lib/variants';
import { QUESTION_SCORE } from 'app/constants';

export default async function UserDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserInfo(id);
  const piecesFoundByUser = await getPiecesFoundByUser(id);
  //const captchaFoundByUser = await getSolvedCaptchas(Number(id));
  /* const solvedCaptcha = captchaFoundByUser.map((item) => item.captcha);

  const totalPoints = calculateScore({
    pieces: piecesFoundByUser.length,
    captcha: solvedCaptcha.length
  }); */

  return (
    <div className="max-w-md m-auto">
      <Card>
        <CardHeader>
          <CardTitle>Participant</CardTitle>
          <CardDescription className="text-xl">{user.name}</CardDescription>
        </CardHeader>
        {/*  <CardContent className="flex flex-col gap-4 items-center">
          <div className="flex ml-auto items-center justify-center gap-2 font-bold">
            <p>{piecesFoundByUser.length} cirèxits</p>+
            <p>{solvedCaptcha.length} captches</p>=
            <div className="border-2 border-black rounded-xs font-bold px-2 py-1 bg-highlight">
              {totalPoints} {totalPoints === 1 ? 'punt' : ' punts'}
            </div>
          </div>

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
                <CherryIconWrap
                  key={index}
                  backgroundColor={getPastelColor(item.hue)}
                  width="60px"
                  height="60px"
                />
              );
            })}
          </div>

          <div className="flex items-start justify-center gap-x-2 gap-y-3 flex-wrap">
            {solvedCaptcha.map((item, index) => {
              return (
                <div key={index} style={{ width: 80, height: 80 }}>
                  <CaptchaIcon
                    backgroundColor={getColorByIndex(13, index)}
                    points={`+${CAPTCHA_SCORE} punts`}
                    label={captchaMap[item as CAPTCHA_CATEGORY]?.short}
                  />
                </div>
              );
            })}
          </div>
        </CardContent> */}
      </Card>
    </div>
  );
}
