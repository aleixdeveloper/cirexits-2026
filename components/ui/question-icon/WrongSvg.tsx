import React from 'react';
import { LayoutSvg } from './LayoutSvg';

export const WrongSvg = ({
  backgroundColor = '#1C274C',
  width = '100%',
  height = '100%'
}: {
  backgroundColor?: string;
  width?: string;
  height?: string;
}) => {
  return (
    <LayoutSvg width={width} height={height}>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={backgroundColor}
        strokeWidth="1.5"
      />
      <path
        d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
        stroke={backgroundColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </LayoutSvg>
  );
};
