import { QUESTION_SCORE, PIECE_SCORE } from 'app/constants';

type CalculateScoreProps = {
  pieces?: number;
  question?: number;
};
export const calculateScore = ({
  pieces = 0,
  question = 0
}: CalculateScoreProps) => {
  return Number(pieces) * PIECE_SCORE + Number(question) * QUESTION_SCORE;
};
