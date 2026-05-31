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
      <div className="absolute bottom-2 right-2">
        {/* <svg width="24px" height="24px" viewBox="0 -3 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>checkmark</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-518.000000, -1039.000000)" fill="#000000">
            <path d="M548.783,1040.2 C547.188,1038.57 544.603,1038.57 543.008,1040.2 L528.569,1054.92 L524.96,1051.24 C523.365,1049.62 520.779,1049.62 519.185,1051.24 C517.59,1052.87 517.59,1055.51 519.185,1057.13 L525.682,1063.76 C527.277,1065.39 529.862,1065.39 531.457,1063.76 L548.783,1046.09 C550.378,1044.46 550.378,1041.82 548.783,1040.2" id="checkmark" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg> */}
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 25 25"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>cross</title>
          <desc>Created with Sketch Beta.</desc>
          <defs></defs>
          <g
            id="Page-1"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <g
              id="Icon-Set-Filled"
              transform="translate(-469.000000, -1041.000000)"
              fill="#000000"
            >
              <path
                d="M487.148,1053.48 L492.813,1047.82 C494.376,1046.26 494.376,1043.72 492.813,1042.16 C491.248,1040.59 488.712,1040.59 487.148,1042.16 L481.484,1047.82 L475.82,1042.16 C474.257,1040.59 471.721,1040.59 470.156,1042.16 C468.593,1043.72 468.593,1046.26 470.156,1047.82 L475.82,1053.48 L470.156,1059.15 C468.593,1060.71 468.593,1063.25 470.156,1064.81 C471.721,1066.38 474.257,1066.38 475.82,1064.81 L481.484,1059.15 L487.148,1064.81 C488.712,1066.38 491.248,1066.38 492.813,1064.81 C494.376,1063.25 494.376,1060.71 492.813,1059.15 L487.148,1053.48"
                id="cross"
              ></path>
            </g>
          </g>
        </svg>
      </div>
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
