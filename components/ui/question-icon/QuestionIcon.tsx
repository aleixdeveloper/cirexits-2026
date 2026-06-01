import { CheckSvg } from './CheckSvg';
import { QuestionSvg, QuestionSvgProps } from './QuestionSvg';
import { WrongSvg } from './WrongSvg';

type Props = QuestionSvgProps & {
  points?: string;
  label?: string;
  isFullPage?: boolean;
  isCorrect?: null | boolean;
};
export const QuestionIcon = (props: Props) => {
  const { points, label, isFullPage = false, isCorrect, ...rest } = props;
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        padding: '10px'
      }}
    >
      <QuestionSvg isCorrect={isCorrect} {...rest} />
      {isCorrect !== null && isCorrect !== undefined && (
        <div className="absolute bottom-0 right-0">
          {isCorrect ? (
            <CheckSvg width="32px" height="32px" />
          ) : (
            <WrongSvg width="32px" height="32px" />
          )}
        </div>
      )}

      {points && (
        <div
          style={{
            position: 'absolute',
            top: 2,
            left: -5,

            fontSize: isFullPage ? '2rem' : '11px',
            fontWeight: isFullPage ? 'bold' : '400'
          }}
          className="-rotate-12"
        >
          {points}
        </div>
      )}

      {label && (
        <div
          style={{
            position: 'absolute',
            top: '90%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)'
          }}
          className="font-medium text-center text-xs px-1 py-0.5 bg-white border border-black rounded"
        >
          {label}
        </div>
      )}
    </div>
  );
};
