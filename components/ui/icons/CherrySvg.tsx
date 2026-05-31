import { Background } from './Background';
import { defaultProps } from './defaultProps';
import { CherryIcon } from './Icon';
import { SvgWrapper } from './svg';

export type CherryProps = {
  backgroundColor: string;
  cherryColorLight: string;
  cherryColorDark: string;
  cherryColorReflected: string;
  cherryColorStem: string;
  cherryColorLeaf: string;
  shape: 'square' | 'circle' | 'hexagon' | 'random';
  trackColor: string;
  trackWidth: string;
  points?: string;
  width?: string;
  height?: string;
  border?: boolean;
  isFullPage?: boolean;
};

export const CherrySvg = (props: Partial<CherryProps>) => {
  const {
    backgroundColor = defaultProps.backgroundColor,
    cherryColorLight = defaultProps.cherryColorLight,
    cherryColorDark = defaultProps.cherryColorDark,
    cherryColorStem = defaultProps.cherryColorStem,
    cherryColorLeaf = defaultProps.cherryColorLeaf,
    cherryColorReflected = defaultProps.cherryColorReflected,
    shape = defaultProps.shape,
    trackColor = defaultProps.trackColor,
    trackWidth = defaultProps.trackWidth,
    points = '',
    width = '100%',
    height = '100%',
    border,
    isFullPage = false
  } = props;

  return (
    <div style={{ position: 'relative', width, height }}>
      <SvgWrapper shape={shape}>
        <Background
          backgroundColor={backgroundColor}
          shape={shape}
          trackColor={trackColor}
          trackWidth={trackWidth}
          border={border}
        />

        <CherryIcon
          cherryColorLight={cherryColorLight}
          cherryColorDark={cherryColorDark}
          cherryColorReflected={cherryColorReflected}
          cherryColorStem={cherryColorStem}
          cherryColorLeaf={cherryColorLeaf}
          shape={shape}
        />
      </SvgWrapper>
      {points && (
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '25%',
            fontSize: isFullPage ? '2rem' : '14px',
            fontWeight: isFullPage ? 'bold' : '400'
          }}
          className="overflow-x-visible whitespace-nowrap font-medium -rotate-12 -translate-x-1/2 -translate-y-1/2"
        >
          {points}
        </div>
      )}
    </div>
  );
};
