'use client';

import { CherryProps } from './CherrySvg';

export const commonDefaultProps: Pick<
  CherryProps,
  'shape' | 'trackColor' | 'trackWidth' | 'cherryColorReflected'
> = {
  shape: 'square',
  trackColor: '#FFF',
  trackWidth: '73.728',
  cherryColorReflected: '#FFF'
};
