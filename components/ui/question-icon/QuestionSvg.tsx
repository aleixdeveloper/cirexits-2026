export type QuestionSvgProps = {
  backgroundColor: string;
  width?: string;
  height?: string;
};

export const QuestionSvg = (props: Partial<QuestionSvgProps>) => {
  const { width = '100%', height = '100%', backgroundColor } = props;

  return (
    <svg
      fill={backgroundColor}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      id="check-mark-circle-2"
      data-name="Flat Line"
      xmlns="http://www.w3.org/2000/svg"
      className="icon flat-line"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />

      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        <polyline
          id="primary"
          points="21 5 12 14 8 10"
          style={{
            fill: 'none',
            stroke: backgroundColor,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 2
          }}
        />

        <path
          id="primary-2"
          data-name="primary"
          d="M20.94,11A8.26,8.26,0,0,1,21,12a9,9,0,1,1-9-9,8.83,8.83,0,0,1,4,1"
          style={{
            fill: 'none',
            stroke: backgroundColor,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 2
          }}
        />
      </g>
    </svg>
  );
};
