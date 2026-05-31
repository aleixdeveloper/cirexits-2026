import React, { PropsWithChildren } from 'react';

export type LayoutSvgProps = {
  width?: string;
  height?: string;
};

export const LayoutSvg = (props: PropsWithChildren<LayoutSvgProps>) => {
  const { width = '100%', height = '100%', children } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
};
