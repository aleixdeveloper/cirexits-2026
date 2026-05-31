import { QUESTION_SCORE, PIECE_SCORE } from 'app/constants';

type CalculateScoreProps = {
  pieces?: number;
  captcha?: number;
};
export const calculateScore = ({
  pieces = 0,
  captcha = 0
}: CalculateScoreProps) => {
  return Number(pieces) * PIECE_SCORE + Number(captcha) * QUESTION_SCORE;
};
