import { CherryProps } from './CherrySvg';
import { containers, stroke } from './containers';

export const Background = ({
  backgroundColor,
  shape,
  //onClick,
  trackColor,
  trackWidth,
  border
}: Pick<
  CherryProps,
  'backgroundColor' | 'shape' | 'trackColor' | 'trackWidth' | 'border'
>) => {
  const containerFn = containers[shape || 'circle'];
  const container = containerFn(backgroundColor, border);

  return (
    <>
      <g
        id="SVGRepo_bgCarrier"
        strokeWidth="0"
        transform="translate(0,0), scale(1)"
      >
        {container}
        <rect
          fill="transparent"
          x="-102.4"
          y="-102.4"
          width="1228.80"
          height="1228.80"
          rx="184.32"
          strokeWidth="0"
          //  onClick={onClick}
        />
      </g>
      {stroke(trackColor, trackWidth)}
    </>
  );
};
