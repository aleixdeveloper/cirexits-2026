'use client';

import React, { PropsWithChildren } from 'react';
import { svgViewbox, svgWrapperConstants } from './constants';
import { CherryProps } from './CherrySvg';

type Props = Required<Pick<CherryProps, 'shape'>>;
export const SvgWrapper = ({ shape, children }: PropsWithChildren<Props>) => {
  return (
    <svg
      viewBox={svgViewbox[shape]}
      //style={{ transform: 'rotateY(10deg)' }}
      {...svgWrapperConstants}
      width={'100%'}
      height={'100%'}
    >
      {children}
    </svg>
  );
};
