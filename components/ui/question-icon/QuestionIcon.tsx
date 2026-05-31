import { QuestionSvg, QuestionSvgProps } from './QuestionSvg';

type Props = QuestionSvgProps & {
  points?: string;
  label?: string;
  isFullPage?: boolean;
};
export const QuestionIcon = (props: Props) => {
  const { points, label, isFullPage = false, ...rest } = props;
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        padding: '10px'
      }}
    >
      <QuestionSvg {...rest} />
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
