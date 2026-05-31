import React from 'react';
import { LayoutSvg } from './LayoutSvg';

export const CheckSvg = ({
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
        d="M8.5 12.5L10.5 14.5L15.5 9.5"
        stroke={backgroundColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </LayoutSvg>
  );
};
